import * as Dotenv from "dotenv";
import process from "process";
import { getJson } from "serpapi";
import { Pool } from "pg";

Dotenv.config();
const apiKey = process.env.API_KEY;
const pgPassword = process.env.PG_PASSWORD;
const pgUser = process.env.PG_USER;

const positionTitles: string[] = ['"QA Engineer"', '"Quality Engineer"', '"Automation Engineer"'];

const positionTitlesQuery: string = '(' + positionTitles.join(' OR ') + ')';

const toolsMentioned: string[] = ['"Playwright"', '"Cypress"'];

const toolsMentionedQuery: string = '(' + toolsMentioned.join(' OR ') + ')';

const includeSites: string[] = ['jobs.lever.co', 'recruitee.com', 'workable.com', 'greenhouse.io', 'jobvite.com', 'bamboohr.com', 'ashbyhq.com', 'applytojob.com', 'comeet.com', 'pinpointhq.com', 'trakstar.com', 'breezy.hr', 'trinethire.com'];

const includeSitesQuery: string = '(' + includeSites.map(site => `site:${site}`).join(' OR ') + ')';

const finalQuery = [positionTitlesQuery, toolsMentionedQuery, includeSitesQuery ].join(' ');

console.log('finalQuery:', finalQuery);

// Pagination loop
const numPerPage = 10; // Google typically returns 10 results per page
const totalPages = 3;  // Fetch first 3 pages
const allResults: any[] = [];


for (let i = 0; i < totalPages; i++) {
  const params = {
    engine: "google",
    q: finalQuery,
    as_qdr: "d10",
    as_eq: "India, Philippines, Bengaluru, Hyderabad, On-site",
    api_key: apiKey,
    start: i * numPerPage, // 0 for first page, 10 for second, 20 for third
  };


  // Fetch results for this page
  const response = await getJson(params);
  const results = response.organic_results || [];
  allResults.push(...results);
}


// --- Log all results ---
console.log(`Fetched ${allResults.length} results across ${totalPages} pages.`);
allResults.forEach((r, idx) => {
  // console.log(`Result ${{idx + 1}: ${r.title} - ${r.link}}`);
  console.log(`Result ${idx + 1}: ${JSON.stringify(r, null, 2)}`);
});



const pool = new Pool({
  user: pgUser,
  host: "localhost",
  database: "job_results",
  password: pgPassword,
  port: 5432,
});


async function saveResults(allResults: any[]) {
  for (const r of allResults) {
    try {
      await pool.query(
        `INSERT INTO job_posts 
          (title, link, snippet, position, company, location, source)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         ON CONFLICT (link) DO NOTHING`,
        [
          r.title || null,
          r.link || null,
          r.snippet || null,
          r.position || null,
          r.company || null,
          r.location || null,
          r.source || null,
        ]
      );
    } catch (err) {
      console.error("Error inserting:", err);
    }
  }
  console.log(`Inserted ${allResults.length} results into the database.`);
}

// Call the insert function
await saveResults(allResults);

// --- Close PostgreSQL connection ---
await pool.end();
