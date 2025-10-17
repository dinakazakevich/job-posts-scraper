import * as Dotenv from "dotenv";
import process from "process";
import { getJson } from "serpapi";

Dotenv.config();
const apiKey = process.env.API_KEY;

const positionTitles: string[] = ['"QA Engineer"', '"Quality Engineer"', '"Automation Engineer"'];

const positionTitlesQuery: string = '(' + positionTitles.join(' OR ') + ')';

const toolsMentioned: string[] = ['"Playwright"', '"Cypress"'];

const toolsMentionedQuery: string = '(' + toolsMentioned.join(' OR ') + ')';

const includeSites: string[] = ['jobs.lever.co', 'recruitee.com', 'workable.com', 'greenhouse.io', 'jobvite.com', 'bamboohr.com', 'ashbyhq.com', 'applytojob.com', 'comeet.com', 'pinpointhq.com', 'trakstar.com', 'breezy.hr', 'trinethire.com', 'linkedin.com'];

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
