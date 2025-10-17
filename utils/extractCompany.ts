export function extractCompany(link: string): string | null {
  if (!link) return null;

  const patterns: Record<string, RegExp> = {
    'jobs.lever.co': /jobs\.lever\.co\/([^/]+)/, // path after jobs.lever.co/
    'recruitee.com': /https?:\/\/([^.]+)\.recruitee\.com/, // subdomain
    'jobs.workable.com': /jobs\.workable\.com(?:\/[^/]+)?\/view\/[^/]+\/.+?-at-([^/?]+).*/,
    'apply.workable.com': /apply\.workable\.com\/([^/]+)/, // path after apply.workable.com/
    'greenhouse.io': /greenhouse\.io\/([^/]+)/, // path after greenhouse.io/
    'jobvite.com': /jobs\.jobvite\.com\/([^/]+)\/job\//, // company in path segment
    'bamboohr.com': /https?:\/\/([^.]+)\.bamboohr\.com/, // subdomain
    'ashbyhq.com': /jobs\.ashbyhq\.com\/([^/]+)\//, // company in path segment
    'applytojob.com': /https?:\/\/([^.]+)\.applytojob\.com/, // subdomain
    'comeet.com': /comeet\.com\/jobs\/([^/]+)\//, // company in path segment
    'pinpointhq.com': /https?:\/\/([^.]+)\.pinpointhq\.com/, // subdomain
    'trakstar.com': /https?:\/\/([^.]+)\.hire\.trakstar\.com/, // subdomain before .hire.trakstar.com
    'breezy.hr': /https?:\/\/([^.]+)\.breezy\.hr/, // subdomain
    'trinethire.com': /trinethire\.com\/companies\/(?:\d+-)?([^/]+)\//, // company in path, omit id
  };

  for (const [domain, regex] of Object.entries(patterns)) {
    if (link.includes(domain)) {
      const match = link.match(regex);
      if (match) return match[1] ?? null;
    }
  }

  return null;
}

// TODO(dina): migrate to another dedicated test file 
// console.log('lever:', extractCompany('https://jobs.lever.co/Mediafly/8154f624-5de5-42af-b4b0-9ad048eb0c47'))
// console.log('========')
// console.log('recruitee:', extractCompany('https://tether.recruitee.com/o/senior-qa-engineer-remote-dubai'))
// console.log('========')
// console.log('workable:', extractCompany('https://apply.workable.com/mpsolutions/j/F9828CCDF5/'))
// console.log('========')
// console.log('greenhouse:', extractCompany('https://boards.greenhouse.io/melio/jobs/7495523003'))
// console.log('========')
// console.log('jobvite:', extractCompany('https://jobs.jobvite.com/metaphaseconsulting/job/otimyfwp'))
// console.log('========')
// console.log('bamboohr:', extractCompany('https://flashfood.bamboohr.com/careers/265'))
// console.log('========')
// console.log('ashbyhq:', extractCompany('https://jobs.ashbyhq.com/southgeeks/10861def-9abe-46fc-961f-3ac82da8d11e'))
// console.log('========')
// console.log('applytojob:', extractCompany('https://snapsheet.applytojob.com/apply/9y0v7ggjln/qa-engineer'))
// console.log('========')
// console.log('comeet:', extractCompany('https://www.comeet.com/jobs/crossriver/C7.00F/senior-automation-engineer/59.85F'))
// console.log('========')
// console.log('pinpointhq:', extractCompany('https://alcumus.pinpointhq.com/postings/9f94cee1-d62d-46ca-828e-b800d6e6bd9b'))
// console.log('========')
// console.log('trakstar:', extractCompany('https://commsignia.hire.trakstar.com/jobs/fk0q8rs/'))
// console.log('========')
// console.log('trinethire:', extractCompany('https://app.trinethire.com/companies/7658-edovo/jobs/80591-quality-assurance-analyst'))
// console.log('========')
