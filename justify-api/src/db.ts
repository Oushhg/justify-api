// src/db.ts (Configuration de la base de données)
import { Pool } from 'pg';

const pool = new Pool({
  user: 'votre-utilisateur',
  host: 'localhost',
  database: 'votre-base-de-donnees',
  password: 'votre-mot-de-passe',
  port: 5432, // Port par défaut de PostgreSQL
});

export default pool;
