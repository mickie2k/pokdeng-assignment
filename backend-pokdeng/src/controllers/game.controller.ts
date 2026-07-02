import { GameService } from "../services/game.service";
import type { Request, Response } from "express";

export class GameController {
    start(req: Request, res: Response) {
        res.json({ message: "Game started!" });
    }

    action(req: Request, res: Response) {
        res.json({ message: "Game action!" });
    }
}
