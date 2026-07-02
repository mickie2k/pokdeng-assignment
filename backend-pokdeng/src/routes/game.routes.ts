import { Router } from "express";
import { GameController } from "../controllers/game.controller";

const router = Router();
const gameController = new GameController();

router.get("/start", (req, res) => gameController.start(req, res));

router.get("/action", (req, res) => gameController.action(req, res));

export default router;
