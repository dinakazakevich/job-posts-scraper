import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Helper to make queries easily
export const query = (text: string, params?: any[]) => pool.query(text, params);

export default pool;
