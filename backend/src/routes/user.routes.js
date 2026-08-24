import express from 'express';
import UserController from '../controllers/UserController.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', requireAuth, UserController.getAllUsers);

export default router;
