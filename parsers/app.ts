import * as Dotenv from "dotenv";
import process from "process";
import { config, getJson } from "serpapi";

Dotenv.config();
const apiKey = process.env.API_KEY;

const searchTerms: string[] = ['"QA Engineer"', '"remote"'];

const positionTitles: string[] = ['"QA Engineer"', '"Quality Engineer"', '"Automation Engineer"'];

const positionTitlesQuery: string = '(' + positionTitles.join(' OR ') + ')';

const toolsMentioned: string[] = ['"Playwright"', '"Cypress"'];

const toolsMentionedQuery: string = '(' + toolsMentioned.join(' OR ') + ')';

const includeSites: string[] = ['jobs.lever.co', 'recruitee.com', 'workable.com', 'greenhouse.io', 'jobvite.com', 'bamboohr.com', 'ashbyhq.com', 'applytojob.com', 'comeet.com', 'pinpointhq.com', 'trakstar.com', 'breezy.hr', 'trinethire.com'];

const includeSitesQuery: string = '(' + includeSites.map(site => `site:${site}`).join(' OR ') + ')';

const q: string = searchTerms.join(' AND ') + ' ' + includeSites.map(site => `site:${site}`).join(' OR ');

const finalQuery = [positionTitlesQuery, toolsMentionedQuery, includeSitesQuery ].join(' ');
// const finalQuery = [positionTitlesQuery, includeSitesQuery ].join(' ');

console.log('finalQuery:', finalQuery);
console.log('q:', q)



const params = {
  engine: "google",
  q: finalQuery,
  as_qdr: "m1",
  as_eq: "India, Philippines, Bengaluru, Hyderabad",
  api_key: apiKey,
  start: 20,
};

// Show result as JSON (async/await)
const response1 = await getJson(params);
console.log(response1["organic_results"]);

// Show result as JSON (callback)
getJson(params, (json) => console.log(json["organic_results"]));

// // Use global config
// config.api_key = apiKey;
// const response2 = await getJson({ engine: "google", q: "Coffee" });
// console.log(response2["organic_results"]);