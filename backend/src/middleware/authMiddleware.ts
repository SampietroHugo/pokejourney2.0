import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET ?? "supersecret_dev_only";

export interface AuthRequest extends Request {
    user?: any;
}

export const authenticateToken = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        res.status(401).json({ error: "Authorization token missing." });
        return;
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        res.status(401).json({ error: "Invalid authorization header." });
        return;
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        (req as AuthRequest).user = decoded;
        next();
    } catch (err) {
        res.status(403).json({ error: "Invalid or expired token." });
        return;
    }
};

export const authMiddleware = authenticateToken;