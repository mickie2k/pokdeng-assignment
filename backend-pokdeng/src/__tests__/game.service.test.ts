import { ErrorCode } from "../enums";
import { GameService } from "../services/game.service";
import { GameState } from "../enums";

jest.mock("uuid", () => ({
    v4: () => "mocked-uuid",
}));

describe("GameService", () => {
    let gameService: GameService;

    beforeEach(() => {
        gameService = new GameService();
    });

    describe("start", () => {
        it("should return game", () => {
            const initialBalance = 100;
            const game = gameService.start(initialBalance);
            expect(game).toHaveProperty("id");
            expect(game).toHaveProperty("state", GameState.WAITING_FOR_CUT);
            expect(game).toHaveProperty("balance", initialBalance);
            expect(game).toHaveProperty("player");
            expect(game).toHaveProperty("dealer");
            expect(game).toHaveProperty("winner", null);
            expect(game).toHaveProperty("deck");
            expect(game).toHaveProperty("bet", 0);
        });

        it("should throw error for invalid initial balance", () => {
            const initialBalance = 0;
            expect(() => gameService.start(initialBalance)).toThrow(
                ErrorCode.ERR_INVALID_AMOUNT,
            );
        });
    });

    describe("action", () => {
        describe("cut", () => {
            it("should return gameState to WAITING_FOR_BET", () => {
                const initialBalance = 100;
                const game = gameService.start(initialBalance);
                const updatedGame = gameService.action(game.id, "cut", 10);
                expect(updatedGame.state).toBe(GameState.WAITING_FOR_BET);
            });

            it("should throw error for invalid amount", () => {
                const initialBalance = 100;
                const game = gameService.start(initialBalance);
                expect(() => gameService.action(game.id, "cut", -1)).toThrow(
                    ErrorCode.ERR_INVALID_AMOUNT,
                );
            });
        });

        describe("bet", () => {
            it("should return gameState to WAITING_FOR_DECISION or ROUND_END", () => {
                const initialBalance = 100;
                const game = gameService.start(initialBalance);
                gameService.action(game.id, "cut", 10);
                const updatedGame = gameService.action(game.id, "bet", 10);
                if (updatedGame.winner) {
                    expect(updatedGame.state).toBe(GameState.ROUND_END);
                } else {
                    expect(updatedGame.state).toBe(
                        GameState.WAITING_FOR_DECISION,
                    );
                }
            });

            it("should throw error for invalid amount", () => {
                const initialBalance = 100;
                const game = gameService.start(initialBalance);
                gameService.action(game.id, "cut", 10);
                expect(() => gameService.action(game.id, "bet", -1)).toThrow(
                    ErrorCode.ERR_INVALID_AMOUNT,
                );
            });
        });

        describe("draw", () => {
            it("should return gameState to END", () => {
                const initialBalance = 100;
                const game = gameService.start(initialBalance);
                gameService.action(game.id, "cut", 10);
                let updatedGame = gameService.action(game.id, "bet", 50);
                if (game.state === GameState.WAITING_FOR_DECISION) {
                    updatedGame = gameService.action(game.id, "draw");
                }
                expect(updatedGame.state).toBe(GameState.ROUND_END);
            });
        });

        describe("stay", () => {
            it("should return gameState to END", () => {
                const initialBalance = 100;
                const game = gameService.start(initialBalance);
                gameService.action(game.id, "cut", 10);
                let updatedGame = gameService.action(game.id, "bet", 50);
                if (game.state === GameState.WAITING_FOR_DECISION) {
                    updatedGame = gameService.action(game.id, "draw");
                }
                expect(updatedGame.state).toBe(GameState.ROUND_END);
            });
        });

        describe("next_round", () => {
            it("should return gameState to WAITING_FOR_CUT", () => {
                const initialBalance = 100;
                const game = gameService.start(initialBalance);
                gameService.action(game.id, "cut", 10);
                gameService.action(game.id, "bet", 50);
                if (game.state === GameState.WAITING_FOR_DECISION) {
                    gameService.action(game.id, "draw");
                }
                const updatedGame = gameService.action(game.id, "next_round");
                expect(updatedGame.state).toBe(GameState.WAITING_FOR_CUT);
                expect(updatedGame.bet).toBe(0);
                expect(updatedGame.player.hand.length).toBe(0);
                expect(updatedGame.dealer.hand.length).toBe(0);
                expect(updatedGame.player.score).toBe(0);
                expect(updatedGame.dealer.score).toBe(0);
            });
        });
    });

    describe("full gameplay", () => {
        it("should play a full game", () => {
            const initialBalance = 100;
            const game = gameService.start(initialBalance);
            gameService.action(game.id, "cut", 10);
            let updatedGame = gameService.action(game.id, "bet", 50);
            if (updatedGame.state === GameState.WAITING_FOR_DECISION) {
                updatedGame = gameService.action(updatedGame.id, "draw");
            }
            expect(updatedGame.state).toBe(GameState.ROUND_END);
            expect(updatedGame.winner).toBeDefined();
        });
    });
});
