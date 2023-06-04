/*
 *
 * @param {string} html  = returned html from afad.gov.tr
 *
 *
 */

class AfadScraper {
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

  parseData = (data) => {
    let _parsedData = []; // <Array
    data.map((item) => {
      _parsedData.push({
        ID: item.id.toString(), // string
        Date: item.eventDate.toString().replaceAll("-", "/"), // Date | string
        Latitude: Number(item.latitude.toString()), // Float
        Longitude: Number(item.longitude.toString()), // Float
        Depth: Number(item.depth.toString()), // Float
        Magnitude: Number(item.magnitude.toString()), // Float
        Region: this.parseRegion(item.location.toString()), // Object {City: İstanbul, District: Kadıköy}
        Type: item.magnitudeType.toString(), // string
      });
    });
    return _parsedData;
  };

  getEarthquakes = async () => {
    const res = await fetch(
      "https://deprem.afad.gov.tr/EventData/GetEventsByFilter",
      {
        method: "POST",
        body: JSON.stringify({
          EventSearchFilterList: [
            { FilterType: 9, Value: "2023-06-04T10:00:44.095Z" },
            { FilterType: 8, Value: "2023-05-28T10:00:44.095Z" },
          ],
          Skip: 0,
          Take: 300,
          SortDescriptor: { field: "eventDate", dir: "desc" },
        }),
        headers: {
          Accept: "application/json, text/plain",
          "Content-Type": "application/json;charset=UTF-8",
        },
        mode: "no-cors",
      }
    );
    const json = await res.json();
    return this.parseData(json?.eventList || []);
  };
}
export default AfadScraper;
