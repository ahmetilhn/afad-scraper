import cheerio from "cheerio";

/****
 *
 * @param {string} html  = returned html from afad.gov.tr
 *
 *
 */

class AfadScraper {
  fetchAfad = async () => {
    try {
      const res = await fetch(
        "https://deprem.afad.gov.tr/last-earthquakes.html",
        {
          method: "GET",
        }
      );
      return res.text();
    } catch (error) {
      throw new Error(error);
    }
  };

  parseRegion = (region) => {
    let [district, city] = region?.split("("); // -> istanbul)
    city = city?.split(")")[0]; // -> istanbul
    if (!city) {
      city = district;
      district = "-";
    }
    return {
      City: city,
      District: district,
    };
  };

  parseHTML = (html) => {
    const $ = cheerio.load(html);
    let data = []; // <Array
    $("tbody")
      .find("tr")
      .map((i, el) => {
        const [
          CreatedDate,
          Latitude,
          Longitude,
          Depth,
          Type,
          Magnitude,
          Region,
          ID,
        ] = $(el).find("td");
        data.push({
          ID: $(ID).text(), // string
          Date: $(CreatedDate).text().replaceAll("-", "/"), // Date | string
          Latitude: Number($(Latitude).text()), // Float
          Longitude: Number($(Longitude).text()), // Float
          Depth: Number($(Depth).text()), // Float
          Magnitude: Number($(Magnitude).text()), // Float
          Region: this.parseRegion($(Region).text()), // Object {City: İstanbul, District: Kadıköy}
          Type: $(Type).text(), // string
        });
      });
    return data;
  };

  getEarthquakes = async () => {
    const html = await this.fetchAfad();
    return this.parseHTML(html);
  };
}

export default AfadScraper;
