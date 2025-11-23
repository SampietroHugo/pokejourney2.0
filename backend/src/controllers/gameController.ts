import type { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface AuthRequest extends Request {
    user?: { id: number };
}

export const getGameSave = async (req: Request, res: Response) => {
    const { slug } = req.params as { slug: string };
    const userId = (req as AuthRequest).user?.id;

    if (!userId) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }

    try {
        const gameSave = await prisma.gameSave.findFirst({
            where: {
                slug: slug,
                userId: userId
            },
            include: {
                trainer: true,
                team: {
                    orderBy: { position: 'asc' }
                },
                moments: true
            }
        });

        if (!gameSave) {
            res.status(404).json({ message: 'Game save not found for this user.' });
            return;
        }

        res.json(gameSave);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching game.' });
    }
};

export const updateTrainer = async (req: Request, res: Response) => {
    const { slug } = req.params as { slug: string };
    const data = req.body;
    const userId = (req as AuthRequest).user?.id;

    if (!userId) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }

    try {
        const game = await prisma.gameSave.findFirst({
            where: {
                slug: slug,
                userId: userId
            }
        });

        if (!game) {
            res.status(404).json({ message: 'Game not found or not yours' });
            return;
        }

        const updatedTrainer = await prisma.trainer.update({
            where: { gameSaveId: game.id },
            data: data,
        });

        res.json(updatedTrainer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating trainer' });
    }
};

export const createGameSave = async (req: Request, res: Response) => {
  const { slug } = req.params as { slug: string };
  const userId = (req as any).user?.id;

  if (!userId) {
     res.status(401).json({ message: 'Unauthorized' });
     return;
  }

  try {
    const existingSave = await prisma.gameSave.findFirst({
        where: { userId: userId, slug: slug },
        include: { trainer: true, team: true }
    });

    if (existingSave) {
        res.json(existingSave);
        return;
    }

    const newSave = await prisma.gameSave.create({
      data: {
        slug: slug,
        title: "Pokémon Leaf Green", 
        gameLogoSrc: "/img/logos/leaf-green.png",
        userId: userId,
        trainer: {
          create: {
            inGameId: "None",
            name: "New Trainer",
            startDate: "--/--/----", 
            
            pokedexStatus: "---/---",
            nationaldexStatus: "----/----",
            finished: "None",
            imageSrc: "/img/trainers/bug-catcher.png",
            imageAlt: "Trainer"
          }
        },
        team: { create: [] },
        moments: { create: [] }
      },
      include: { trainer: true, team: true }
    });

    res.json(newSave);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating game.' });
  }
};