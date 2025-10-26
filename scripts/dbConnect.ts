import { Pool } from 'pg';
import * as Dotenv from 'dotenv';

Dotenv.config();
const pgPassword = process.env.PG_PASSWORD;
const pgUser = process.env.PG_USER;

const pool = new Pool({
  user: pgUser,
  host: 'localhost',
  database: 'job_results',
  password: pgPassword,
  port: 5432,
});

// Log connection info
console.log('Connecting to:', {
  user: pgUser,
  host: 'localhost',
  database: 'job_results',
  port: 5432,
});

// Test if the table exists
try {
  const test = await pool.query('SELECT * FROM public.job_posts');
  console.log('Table exists, sample row:', test.rows);
} catch (err) {
  console.error('Table check failed:', err);
}

// --- Close PostgreSQL connection ---
await pool.end();
