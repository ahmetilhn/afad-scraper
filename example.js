import AfadScraper from "./scraper.js";

const scraper = new AfadScraper();

const res = await scraper.getEarthquakes();
console.log(res);
