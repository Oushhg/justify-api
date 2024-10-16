import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import crypto from 'crypto';

export const app = express();
app.use(bodyParser.text());
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

// Stocker les tokens et le nombre de mots utilisés par token
export const tokens: { [key: string]: { wordsUsed: number, createdAt: Date } } = {};

// Fonction pour justifier un texte
export function justifyText(text: string): string {
    const words = text.split(/\s+/);
    let lines: string[] = [];
    let currentLine: string[] = [];

    words.forEach(word => {
        if (currentLine.join(' ').length + word.length + 1 <= 80) {
            currentLine.push(word);
        } else {
            lines.push(currentLine.join(' '));
            currentLine = [word];
        }
    });
    if (currentLine.length) lines.push(currentLine.join(' '));

    // Justifier chaque ligne sauf la dernière
    return lines.map((line, index) => {
        if (index === lines.length - 1) return line; // Ne justifie pas la dernière ligne
        const spacesToAdd = 80 - line.length;
        const wordsInLine = line.split(' ');
        if (wordsInLine.length === 1) return line; // Si une seule longueur de mot

        let spaceIndex = 0;
        while (spacesToAdd > 0) {
            wordsInLine[spaceIndex] += ' ';
            spaceIndex = (spaceIndex + 1) % (wordsInLine.length - 1);
        }

        return wordsInLine.join(' ');
    }).join('\n');
}

// Endpoint pour générer un token
app.post('/api/token', (req: Request, res: Response) => {
    const email = req.body.email;
    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }
    
    const token = crypto.randomBytes(16).toString('hex');
    tokens[token] = { wordsUsed: 0, createdAt: new Date() };
    
    res.json({ token });
});

export const RATE_LIMIT = 80000;

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
