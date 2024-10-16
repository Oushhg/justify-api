// src/controllers/justifyController.ts
import { Response } from 'express';
import { AuthenticatedRequest } from '../middlewares/authMiddleware';
import { justifyText } from '../services/justificationService';

export function justify(req: AuthenticatedRequest, res: Response) {
  const text: string = req.body;

  if (!text || typeof text !== 'string') {
    return res.status(400).send('Le corps de la requête doit contenir du texte en format text/plain.');
  }

  const justified = justifyText(text, 80);
  res.type('text/plain').send(justified);
}
