import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from '../models/UserModel.js';
import config from '../config/config.js';
import logger from '../config/logger.js';
import { validateCredentials } from '../utils/validation.js';

const publicUser = (user) => ({
  id: user.id,
  email: user.email,
  createdAt: user.createdAt
});

const issueToken = (user) => jwt.sign(
  { userId: user.id, email: user.email },
  config.jwt.privateKey,
  { expiresIn: config.jwt.expiresIn }
);

export const loginUser = async (req, res, next) => {
  try {
    const validation = validateCredentials(req.body);
    if (!validation.valid) {
      return res.status(422).json({
        error: { code: 'VALIDATION_ERROR', message: 'Revisá los datos ingresados.', fields: validation.errors }
      });
    }

    const user = await UserModel.getUserByEmail(validation.value.email, { includePassword: true });
    const passwordMatches = user && await bcrypt.compare(validation.value.password, user.password);

    if (!passwordMatches) {
      return res.status(401).json({
        error: { code: 'INVALID_CREDENTIALS', message: 'Email o contraseña incorrectos.' }
      });
    }

    return res.json({ token: issueToken(user), user: publicUser(user) });
  } catch (error) {
    logger.error(`login_failed request_id=${req.requestId} ${error.message}`);
    return next(error);
  }
};

export const signUpUser = async (req, res, next) => {
  try {
    const validation = validateCredentials(req.body, { strongPassword: true });
    if (!validation.valid) {
      return res.status(422).json({
        error: { code: 'VALIDATION_ERROR', message: 'Revisá los datos ingresados.', fields: validation.errors }
      });
    }

    const existingUser = await UserModel.getUserByEmail(validation.value.email);
    if (existingUser) {
      return res.status(409).json({
        error: { code: 'EMAIL_ALREADY_EXISTS', message: 'Ya existe una cuenta con ese email.' }
      });
    }

    const hashedPassword = await bcrypt.hash(validation.value.password, 12);
    const user = await UserModel.createUser({
      email: validation.value.email,
      password: hashedPassword
    });

    return res.status(201).json({ token: issueToken(user), user: publicUser(user) });
  } catch (error) {
    logger.error(`signup_failed request_id=${req.requestId} ${error.message}`);
    return next(error);
  }
};

export const getCurrentUser = async (req, res, next) => {
  try {
    const user = await UserModel.getUserById(req.user.userId);
    if (!user) {
      return res.status(404).json({ error: { code: 'USER_NOT_FOUND', message: 'Usuario no encontrado.' } });
    }
    return res.json({ user: publicUser(user) });
  } catch (error) {
    return next(error);
  }
};
