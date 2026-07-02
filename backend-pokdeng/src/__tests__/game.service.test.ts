import { ErrorCode } from "../enums";
import { GameService } from "../services/game.service";

jest.mock("uuid", () => ({
    v4: () => "mocked-uuid",
}));

describe("GameService", () => {
    describe("start", () => {
        it("should return game", () => {
            const gameService = new GameService();
            const initialBalance = 100;
            const game = gameService.start(initialBalance);
            expect(game).toHaveProperty("id");
            expect(game).toHaveProperty("state", "WAITING_FOR_CUT");
            expect(game).toHaveProperty("balance", initialBalance);
            expect(game).toHaveProperty("player");
            expect(game).toHaveProperty("dealer");
            expect(game).toHaveProperty("winner", null);
            expect(game).toHaveProperty("deck");
            expect(game).toHaveProperty("bet", 0);
        });

        it("should throw error for invalid initial balance", () => {
            const gameService = new GameService();
            const initialBalance = 0;
            expect(() => gameService.start(initialBalance)).toThrow(
                ErrorCode.ERR_INVALID_AMOUNT,
            );
        });
    });
});
