import express from "express";
import { prisma } from "../prisma/client.js";

const router = express.Router();

router.get("/", async (req: express.Request, res: express.Response) => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, name: true, email: true, createdAt: true },
    });
    return res.json(users);
  } catch (error) {
    console.error("Get users error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
