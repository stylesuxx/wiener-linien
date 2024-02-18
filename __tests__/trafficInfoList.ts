import WienerLinien from "../src";

describe("WienerLinien newsList", () => {
  afterEach(async () => {
    const wait = 15000;

    await new Promise((resolve) => setTimeout(resolve, wait));
  }, 30000);

  it("should get a complete traffic info list", async () => {
    const client = new WienerLinien();

    const trafficInfoList = await client.getTrafficInfoList();

    expect(typeof trafficInfoList).toEqual("object");
    expect(Array.isArray(trafficInfoList.trafficInfos)).toBeTruthy();
  });

  it("should handle traffic info list for invalid line", async () => {
    const client = new WienerLinien();

    const trafficInfoList = await client.getTrafficInfoList({
      relatedLine: "666",
    });

    expect(typeof trafficInfoList).toEqual("object");
    expect(Array.isArray(trafficInfoList.trafficInfos)).toBeTruthy();
    expect(trafficInfoList.trafficInfos.length).toEqual(0);
  });

  it("should get a traffic info list for a single line", async () => {
    const client = new WienerLinien();

    const trafficInfoList = await client.getTrafficInfoList({
      relatedLine: "U1",
    });

    expect(typeof trafficInfoList).toEqual("object");
    expect(Array.isArray(trafficInfoList.trafficInfos)).toBeTruthy();
  });

  it("should get a traffic info list for multiple lines", async () => {
    const client = new WienerLinien();

    const trafficInfoList = await client.getTrafficInfoList({
      relatedLine: ["U1", "U3"],
    });

    expect(typeof trafficInfoList).toEqual("object");
    expect(Array.isArray(trafficInfoList.trafficInfos)).toBeTruthy();
  });

  it("should handle traffic info list for a single related stop", async () => {
    const client = new WienerLinien();

    const trafficInfoList = await client.getTrafficInfoList({
      relatedStop: 4900,
    });

    expect(typeof trafficInfoList).toBe("object");
    expect(Array.isArray(trafficInfoList.trafficInfos)).toBeTruthy();
  });

  it("should handle traffic info list for multiple related stops", async () => {
    const client = new WienerLinien();

    const trafficInfoList = await client.getTrafficInfoList({
      relatedStop: [4900, 4184],
    });

    expect(typeof trafficInfoList).toBe("object");
    expect(Array.isArray(trafficInfoList.trafficInfos)).toBeTruthy();
  });

  it("should handle traffic info list for a specific category", async () => {
    const client = new WienerLinien();

    const trafficInfoList = await client.getTrafficInfoList({
      name: "aufzugsinfo",
    });

    expect(typeof trafficInfoList).toBe("object");
    expect(Array.isArray(trafficInfoList.trafficInfos)).toBeTruthy();
  });

  it("should handle traffic info list for multiple categories", async () => {
    const client = new WienerLinien();

    const trafficInfoList = await client.getTrafficInfoList({
      name: ["aufzugsinfo", "stoerungkurz"],
    });

    expect(typeof trafficInfoList).toBe("object");
    expect(Array.isArray(trafficInfoList.trafficInfos)).toBeTruthy();
  });

  it("should handle traffic info list for a combination of line and category", async () => {
    const client = new WienerLinien();

    const trafficInfoList = await client.getTrafficInfoList({
      relatedLine: "U1",
      name: "aufzugsinfo",
    });

    expect(typeof trafficInfoList).toBe("object");
    expect(Array.isArray(trafficInfoList.trafficInfos)).toBeTruthy();
  });

  it("should handle traffic info list for a combination of lines and categories", async () => {
    const client = new WienerLinien();

    const trafficInfoList = await client.getTrafficInfoList({
      relatedLine: ["U1", "U3", "U4"],
      name: ["aufzugsinfo", "stoerungkurz"],
    });

    expect(typeof trafficInfoList).toBe("object");
    expect(Array.isArray(trafficInfoList.trafficInfos)).toBeTruthy();
  });
});
