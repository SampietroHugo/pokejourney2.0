import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/profile", authMiddleware, (req, res) => {
    return res.json({
        message: "Access granted.",
        user: (req as any).user,
    });
});

export default router;
