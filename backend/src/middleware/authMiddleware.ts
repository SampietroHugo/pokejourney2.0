import express from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET ?? "supersecret_dev_only";

export const authMiddleware = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    const authHeader = req.headers.authorization;

    if (!authHeader)
        return res.status(401).json({ error: "Authorization token missing." });

    const token = authHeader.split(" ")[1];

    if (!token)
        return res.status(401).json({ error: "Invalid authorization header." });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        (req as any).user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ error: "Invalid or expired token." });
    }
};
