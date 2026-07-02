import { GameService } from "../services/game.service";
import type { Request, Response } from "express";
import { ErrorCode } from "../enums";

export class GameController {
    private gameService: GameService;

    constructor() {
        this.gameService = new GameService();
    }

    start(req: Request, res: Response) {
        const { initialBalance } = req.body;
        try {
            const game = this.gameService.start(initialBalance);
            const response = {
                game_id: game.id,
                state: game.state,
                balance: game.balance,
                bet: game.bet,
                player_hand: game.player.hand,
                dealer_hand: game.dealer.hand,
                player_score: game.player.score,
                dealer_score: game.dealer.score,
                winner: game.winner,
            };
            res.json(response);
        } catch (error) {
            res.status(400).json({ error: (error as Error).message });
        }
    }

    action(req: Request<{ id: string }>, res: Response) {
        const { id } = req.params;
        const { action, amount } = req.body;
        try {
            const game = this.gameService.action(id, action, amount);
            const response = {
                game_id: game.id,
                state: game.state,
                balance: game.balance,
                bet: game.bet,
                player_hand: game.player.hand,
                dealer_hand: game.state === "ROUND_END" ? game.dealer.hand : [],
                player_score: game.player.score,
                dealer_score:
                    game.state === "ROUND_END" ? game.dealer.score : 0,
                winner: game.winner,
            };
            res.json(response);
        } catch (error) {
            if (error instanceof Error) {
                if (error.message === ErrorCode.ERR_SESSION_NOT_FOUND) {
                    res.status(404).json({ error: error.message });
                } else {
                    res.status(400).json({ error: error.message });
                }
            }
        }
    }
}
