import "dotenv/config";
import express from "express";
import cors from "cors";

import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./auth/authRoutes.js";
import protectedRoutes from "./routes/protectedRoutes.js";
import gameRoutes from "./routes/gameRoutes.js";

const app = express();

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

app.use(express.json());

app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/protected", protectedRoutes);
app.use("/api/games", gameRoutes);

app.get("/", (req, res) => {
    res.json({ message: "PokeJourney API (English)" });
});

const PORT = process.env.PORT ?? 4000;
app.listen(PORT, () => {
    console.log(`🔥 Server running on http://localhost:${PORT}`);
});