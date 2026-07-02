import express from "express";
import dotenv from "dotenv";
import gameRoutes from "./routes/game.routes";
import cors from "cors";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use("/game", gameRoutes);

export default app;
