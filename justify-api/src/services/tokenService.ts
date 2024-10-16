// src/services/tokenService.ts
import { v4 as uuidv4 } from 'uuid';

interface TokenData {
  email: string;
  token: string;
  createdAt: Date;
  wordCount: number;
}

class TokenService {
  private tokens: Map<string, TokenData>;

  constructor() {
    this.tokens = new Map();
  }

  generateToken(email: string): string {
    const token = uuidv4();
    const tokenData: TokenData = {
      email,
      token,
      createdAt: new Date(),
      wordCount: 0,
    };
    this.tokens.set(token, tokenData);
    return token;
  }

  validateToken(token: string): TokenData | null {
    const tokenData = this.tokens.get(token);
    if (!tokenData) return null;

    // Reset word count if a new day has started
    const now = new Date();
    const lastReset = new Date(tokenData.createdAt);
    if (
      now.getDate() !== lastReset.getDate() ||
      now.getMonth() !== lastReset.getMonth() ||
      now.getFullYear() !== lastReset.getFullYear()
    ) {
      tokenData.wordCount = 0;
      tokenData.createdAt = now;
      this.tokens.set(token, tokenData);
    }

    return tokenData;
  }

  incrementWordCount(token: string, count: number): void {
    const tokenData = this.tokens.get(token);
    if (tokenData) {
      tokenData.wordCount += count;
      this.tokens.set(token, tokenData);
    }
  }

  getWordCount(token: string): number {
    const tokenData = this.tokens.get(token);
    return tokenData ? tokenData.wordCount : 0;
  }

import pool from './db';

export async function insertToken(userId: number, token: string) {
  const query = `INSERT INTO tokens (user_id, token) VALUES ($1, $2)`;
  await pool.query(query, [userId, token]);
}
// src/tokenService.ts
import pool from './db';
import { app, tokens, RATE_LIMIT, justifyText } from '../types';

export async function verifyToken(token: string) {
  const query = `SELECT u.* FROM users u JOIN tokens t ON u.id = t.user_id WHERE t.token = $1`;
  const result = await pool.query(query, [token]);
  return result.rows.length > 0 ? result.rows[0] : null;
}
}

export default new TokenService();
app.post('/api/justify', (req: Request, res: Response) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token || !tokens[token]) {
        return res.status(401).json({ error: 'Invalid or missing token' });
    }

    const text = req.body;
    if (!text) {
        return res.status(400).json({ error: 'Text is required' });
    }

    const wordCount = text.split(/\s+/).length;

    // Vérifier la limite de mots par token
    if (tokens[token].wordsUsed + wordCount > RATE_LIMIT) {
        return res.status(402).json({ error: 'Word limit exceeded (80,000 words per day)' });
    }

    // Ajouter le nombre de mots utilisés
    tokens[token].wordsUsed += wordCount;

    // Justifier le texte
    const justifiedText = justifyText(text);

    res.send(justifiedText);
});



