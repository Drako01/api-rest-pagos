import express from 'express';
import { getCurrentUser, loginUser, signUpUser } from '../controllers/session.controller.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.post('/login', loginUser);
router.post('/signup', signUpUser);
router.get('/me', requireAuth, getCurrentUser);

export default router;
