import { RealtimeData } from "../src/index";

describe("WienerLinien news", () => {
  afterEach(async () => {
    const wait = 15000;

    await new Promise((resolve) => setTimeout(resolve, wait));
  }, 30000);

  it("should handle fetching single news", async () => {
    const client = new RealtimeData();

    const news = await client.getNews("ftazW_97");

    expect(typeof news).toBe("object");
    expect(Array.isArray(news.pois)).toBeTruthy();
  });

  it("should handle fetching multiple news", async () => {
    const client = new RealtimeData();

    const news = await client.getNews(["ftazW_97", "ftazW_41"]);

    expect(typeof news).toBe("object");
    expect(Array.isArray(news.pois)).toBeTruthy();
  });
});
