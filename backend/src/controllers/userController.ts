import express from "express";
import { prisma } from "../prisma/client.js";

export const getUsers = async (req: express.Request, res: express.Response) => {
    try {
        const users = await prisma.user.findMany();
        return res.json(users);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
