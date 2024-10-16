// src/controllers/tokenController.ts
import { Request, Response } from 'express';
import tokenService from '../services/tokenService';

export function generateToken(req: Request, res: Response) {
  const { email } = req.body;

  if (!email || typeof email !== 'string') {
    return res.status(400).json({ message: 'Email requis et doit être une chaîne de caractères.' });
  }

  const token = tokenService.generateToken(email);
  res.json({ token });
}
