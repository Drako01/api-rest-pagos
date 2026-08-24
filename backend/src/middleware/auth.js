import jwt from 'jsonwebtoken';
import config from '../config/config.js';

export const requireAuth = (req, res, next) => {
  const authorization = req.headers.authorization || '';
  const [scheme, token] = authorization.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({
      error: {
        code: 'AUTH_REQUIRED',
        message: 'Se requiere un token Bearer válido.'
      }
    });
  }

  try {
    const payload = jwt.verify(token, config.jwt.privateKey);
    req.user = payload;
    return next();
  } catch {
    return res.status(401).json({
      error: {
        code: 'INVALID_TOKEN',
        message: 'El token es inválido o expiró.'
      }
    });
  }
};
