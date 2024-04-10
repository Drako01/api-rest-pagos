import express from 'express';
import UserController from '../controllers/UserController.js';
import { requireAuth } from '../controllers/session.controller.js';

const router = express.Router();

router.get('/users/', requireAuth, UserController.getAllUsers);
router.post('/users/', requireAuth, UserController.createUser);
router.get('/users/:email', requireAuth, UserController.getUserByEmail);


export default router;
