// src/middlewares/rateLimitMiddleware.ts
import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from './authMiddleware';
import tokenService from '../services/tokenService';

const MAX_WORDS_PER_DAY = 80000;

export function rateLimiter(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const token = req.tokenData.token;
  const currentWordCount = tokenService.getWordCount(token);

  // Assume that the request body has been parsed and text is available
  const text: string = req.body;
  const wordCount = text.trim().split(/\s+/).length;

  if (currentWordCount + wordCount > MAX_WORDS_PER_DAY) {
    return res.status(402).json({ message: 'Quota de mots dépassée. Veuillez effectuer un paiement.' });
  }

  tokenService.incrementWordCount(token, wordCount);
  next();
}
