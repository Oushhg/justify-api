// src/middlewares/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import tokenService from '../services/tokenService';

export interface AuthenticatedRequest extends Request {
  tokenData?: any;
}

export function authenticateToken(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Expecting format "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: 'Token manquant' });
  }

  const tokenData = tokenService.validateToken(token);
  if (!tokenData) {
    return res.status(403).json({ message: 'Token invalide' });
  }

  req.tokenData = tokenData;
  next();
}
