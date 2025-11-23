import { Router } from 'express';
import { getGameSave, updateTrainer, createGameSave } from '../controllers/gameController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/:slug', authenticateToken, getGameSave);
router.put('/:slug/trainer', authenticateToken, updateTrainer);
router.post('/:slug', authenticateToken, createGameSave);

export default router;