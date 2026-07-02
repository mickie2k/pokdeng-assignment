import { Router } from "express";

const router = Router();

router.get("/start", (req, res) => {
    res.send("Game started!");
});

router.get("/action", (req, res) => {
    res.send("Game Action!");
});

export default router;
