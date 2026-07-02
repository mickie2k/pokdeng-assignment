import { Router } from "express";
import GameRoutes from "./game.routes";

const router = Router();

router.get("/", (req, res) => {
    res.send("Welcome to the Pokdeng API!");
});

router.use("/game", GameRoutes);

export default router;
