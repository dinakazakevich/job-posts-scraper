import * as Dotenv from 'dotenv';
import { Pool } from 'pg';
import { extractCompany } from '../utils/extractCompany.ts';

Dotenv.config();
const pgPassword = process.env.PG_PASSWORD;
const pgUser = process.env.PG_USER;

async function saveResults(allResults: any[], pool: Pool) {
  let insertedCount = 0; // Initialize a counter for successfully inserted records
  for (const r of allResults) {
    const company = r.company ?? extractCompany(r.link);
    try {
      const result = await pool.query( // Store the result of the query
        `INSERT INTO job_posts 
          (title, link, snippet, position, company, location, source, archived)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        ON CONFLICT (link) DO NOTHING`,
        [
          r.title || null,
          r.link || null,
          r.snippet || null,
          r.position || null,
          company || null,
          r.location || null,
          r.source || null,
          r.archived || false,
        ],
      );
      if (result.rowCount === 1) { // Check if a row was actually inserted
        insertedCount++;
      }
    } catch (err) {
      console.error('Error inserting:', err);
    }
  }
  console.log(`Successfully inserted ${insertedCount} new results into the database.`); // Use the new counter
}

export async function saveToDb(allResults: any[]) {
  const pool = new Pool({
    user: pgUser,
    host: 'localhost',
    database: 'job_results',
    password: pgPassword,
    port: 5432,
  });

  // Call the insert function
  await saveResults(allResults, pool);

  // --- Close PostgreSQL connection ---
  await pool.end();
}
