// src/app.ts
import express from 'express';
import bodyParser from 'body-parser';
import { generateToken } from './controllers/tokenController';
import { justify } from './controllers/justifyController';
import { authenticateToken } from './middlewares/authMiddleware';
import { rateLimiter } from './middlewares/rateLimitMiddleware';

const app = express();

// Middleware pour parser le JSON
app.use(bodyParser.json());

// Endpoint pour générer un token
app.post('/api/token', generateToken);

// Middleware pour parser le texte en format text/plain pour /api/justify
app.use('/api/justify', bodyParser.text({ type: 'text/plain' }));

// Endpoint pour justifier le texte avec authentification et rate limiting
app.post('/api/justify', authenticateToken, rateLimiter, justify);

// Route par défaut
app.get('/', (req, res) => {
  res.send('API de Justification de Texte');
});

export default app;
