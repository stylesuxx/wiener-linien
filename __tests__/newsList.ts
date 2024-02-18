import { RealtimeData } from "../src/index";

import { NewsListPoi } from "../src/interfaces/newsList";

describe("WienerLinien newsList", () => {
  afterEach(async () => {
    const wait = 15000;

    await new Promise((resolve) => setTimeout(resolve, wait));
  }, 30000);

  it("should get a complete news list", async () => {
    const client = new RealtimeData();

    const newsList = await client.getNewsList();

    expect(typeof newsList).toBe("object");

    const poiCategories = newsList.poiCategories;
    expect(Array.isArray(poiCategories)).toBeTruthy();

    /*
    const poiCategory = poiCategories[0] as NewsListResponsePoiCategory;
    expect(typeof poiCategory.id).toBe("number");
    expect(typeof poiCategory.refPoiCategoryGroupId).toBe("number");
    expect(typeof poiCategory.name).toBe("string");
    expect(typeof poiCategory.trafficInfoNameList).toBe("string");
    expect(typeof poiCategory.title).toBe("string");

    expect(Array.isArray(newsList.poiCategoryGroups)).toBeTruthy();

    const poiCategoryGroup = newsList.poiCategoryGroups[0] as NewsListResponsePoiCategoryGroup;
    expect(typeof poiCategoryGroup.id).toBe("number");
    expect(typeof poiCategoryGroup.name).toBe("string");
    expect(typeof poiCategoryGroup.title).toBe("string");
    */

    expect(Array.isArray(newsList.pois)).toBeTruthy();
    const poi = newsList.pois[0] as NewsListPoi;

    expect(typeof poi.refPoiCategoryId).toBe("number");
    expect(typeof poi.name).toBe("string");
    expect(typeof poi.title).toBe("string");
    expect(typeof poi.description).toBe("string");

    /*
    expect(Array.isArray(poi.relatedLines)).toBeTruthy();
    expect(typeof poi.relatedLines[0]).toBe("string");

    expect(Array.isArray(poi.relatedStops)).toBeTruthy();
    expect(typeof poi.relatedStops[0]).toBe("number");
    */

    expect(typeof poi.time).toBe("object");
    expect(typeof poi.time.start).toBe("string");
    expect(typeof poi.time.end).toBe("string");

    expect(typeof poi.attributes).toBe("object");

    /*
    const attributes = poi.attributes;
    expect(typeof attributes.ausVon).toBe("string");
    expect(typeof attributes.ausBis).toBe("string");
    expect(typeof attributes.reason).toBe("string");
    expect(typeof attributes.station).toBe("string");
    expect(typeof attributes.location).toBe("string");
    expect(typeof attributes.towards).toBe("string");
    expect(typeof attributes.status).toBe("string");

    expect(Array.isArray(attributes.relatedLines)).toBeTruthy();
    expect(typeof attributes.relatedLines[0]).toBe("string");

    expect(Array.isArray(attributes.rbls)).toBeTruthy();
    expect(typeof attributes.rbls[0]).toBe("number");
    */
  });

  it("should get a news list for U1", async () => {
    const client = new RealtimeData();

    const newsList = await client.getNewsList({
      relatedLine: "U1",
    });

    expect(typeof newsList).toBe("object");
    expect(Array.isArray(newsList.pois)).toBeTruthy();
  });

  it("should get a news list for U1 and U4", async () => {
    const client = new RealtimeData();

    const newsList = await client.getNewsList({
      relatedLine: ["U1", "U4"],
    });

    expect(typeof newsList).toBe("object");
    expect(Array.isArray(newsList.pois)).toBeTruthy();
  });

  it("should handle news list for non existant line", async () => {
    const client = new RealtimeData();

    const newsList = await client.getNewsList({
      relatedLine: "666",
    });

    expect(typeof newsList).toBe("object");
    expect(Array.isArray(newsList.pois)).toBeTruthy();
    expect(newsList.pois.length).toEqual(0);
  });

  it("should handle news list for a single related stop", async () => {
    const client = new RealtimeData();

    const newsList = await client.getNewsList({
      relatedStop: 4401,
    });

    expect(typeof newsList).toBe("object");
    expect(Array.isArray(newsList.pois)).toBeTruthy();
    expect(newsList.pois.length).toEqual(0);
  });

  it("should handle news list for multiple related stops", async () => {
    const client = new RealtimeData();

    const newsList = await client.getNewsList({
      relatedStop: [4106, 4112],
    });

    expect(typeof newsList).toBe("object");
    expect(Array.isArray(newsList.pois)).toBeTruthy();
  });

  it("should handle news list for a specific category", async () => {
    const client = new RealtimeData();

    const newsList = await client.getNewsList({
      name: "aufzugsservice",
    });

    expect(typeof newsList).toBe("object");
    expect(Array.isArray(newsList.pois)).toBeTruthy();
  });

  it("should handle news list for multiple categories", async () => {
    const client = new RealtimeData();

    const newsList = await client.getNewsList({
      name: ["aufzugsservice", "Umleitungen"],
    });

    expect(typeof newsList).toBe("object");
    expect(Array.isArray(newsList.pois)).toBeTruthy();
  });

  it("should handle news list a combination of line and category", async () => {
    const client = new RealtimeData();

    const newsList = await client.getNewsList({
      relatedLine: ["U1", "U4"],
      name: "aufzugsservice",
    });

    expect(typeof newsList).toBe("object");
    expect(Array.isArray(newsList.pois)).toBeTruthy();
  });
});
