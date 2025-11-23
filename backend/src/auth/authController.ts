import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../prisma/client.js";

const JWT_SECRET = process.env.JWT_SECRET ?? "supersecret_dev_only";

export const register = async (req: express.Request, res: express.Response) => {
    const { name, email, password } = req.body as {
        name?: string;
        email?: string;
        password?: string;
    };

    if (!name || !email || !password) {
        return res.status(400).json({
            error: "Name, email and password are required."
        });
    }

    try {
        const userExists = await prisma.user.findUnique({
            where: { email }
        });

        if (userExists) {
            return res.status(400).json({
                error: "Email already in use."
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: { name, email, password: hashedPassword },
            select: { id: true, name: true, email: true, createdAt: true }
        });

        return res.status(201).json({
            message: "User created",
            user: newUser
        });
    } catch (error) {
        console.error("Register error:", error);
        return res.status(500).json({
            error: "Error creating user"
        });
    }
};

export const login = async (req: express.Request, res: express.Response) => {
    const { email, password } = req.body as {
        email?: string;
        password?: string;
    };

    if (!email || !password) {
        return res.status(400).json({
            error: "Email and password are required."
        });
    }

    try {
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            return res.status(400).json({
                error: "Invalid email or password."
            });
        }

        const valid = await bcrypt.compare(password, user.password);

        if (!valid) {
            return res.status(400).json({
                error: "Invalid email or password."
            });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            JWT_SECRET,
            { expiresIn: "1h" }
        );

        return res.json({
            message: "Login successful",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({
            error: "Error logging in"
        });
    }
};
