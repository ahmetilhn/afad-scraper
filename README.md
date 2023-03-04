# afad-scraper

Scraper for last earthquakes from afad.gov.tr

## Usage

```js
import AfadScraper from "afad-scaper";

const scraper = new AfadScraper();

const getEarthquakes = async () => {
  const res = await scraper.getEarthquakes();
  console.log(res); // Result on line: 17
};
```

### Response

```json
[
  {
    "ID": "558177",
    "Date": "2023/03/04 16:37:08",
    "Latitude": 37.128,
    "Longitude": 36.572,
    "Depth": 14.76,
    "Magnitude": 2,
    "Region": { "City": "Osmaniye", "District": "Hasanbeyli " },
    "Type": "ML"
  },
  {
    "ID": "558175",
    "Date": "2023/03/04 16:33:42",
    "Latitude": 36.067,
    "Longitude": 35.987,
    "Depth": 5.55,
    "Magnitude": 2.7,
    "Region": { "City": "Hatay", "District": "Samandağ " },
    "Type": "ML"
  }
]
```

### Interface

```ts
interface EarthquakeInterface {
  ID: string;
  Date: Date;
  Latitude: number; // Float
  Longitude: number; // Float
  Depth: number; // Float
  Magnitude: number; // Float
  Region: { City: string; District: string };
  Type: string;
}
```
