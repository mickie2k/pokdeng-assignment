import { Router } from "express";
import { GameController } from "../controllers/game.controller";

const router = Router();
const gameController = new GameController();

router.post("/start", (req, res) => gameController.start(req, res));

router.post("/:id/action", (req, res) => gameController.action(req, res));

export default router;
