import RealtimeData from "../src/RealtimeData";

describe("WienerLinien news", () => {
  afterEach(async () => {
    const wait = 15000;

    await new Promise((resolve) => setTimeout(resolve, wait));
  }, 30000);

  it("should handle fetching none existant traffic info", async () => {
    const client = new RealtimeData();

    const trafficInfo = await client.getTrafficInfo("INVALID");

    expect(typeof trafficInfo).toBe("object");
    expect(Array.isArray(trafficInfo.trafficInfos)).toBeTruthy();
  });

  it("should handle fetching single traffic info", async () => {
    const client = new RealtimeData();

    const trafficInfo = await client.getTrafficInfo("ivu_1776_463");

    expect(typeof trafficInfo).toBe("object");
    expect(Array.isArray(trafficInfo.trafficInfos)).toBeTruthy();
  });

  it("should handle fetching multiple traffic infos", async () => {
    const client = new RealtimeData();

    const trafficInfo = await client.getTrafficInfo([
      "ivu_1776_463",
      "ftazS_1032383",
    ]);

    expect(typeof trafficInfo).toBe("object");
    expect(Array.isArray(trafficInfo.trafficInfos)).toBeTruthy();
  });
});
