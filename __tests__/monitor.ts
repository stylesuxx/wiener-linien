import { RealtimeData } from "../src/index";
import {
  ParameterInvalidError,
  StoppointDoesNotExistError,
} from "../src/errors";

describe("WienerLinien monitor", () => {
  afterEach(async () => {
    const wait = 15000;

    await new Promise((resolve) => setTimeout(resolve, wait));
  }, 30000);

  it("should throw error when stationId is missing", async () => {
    const client = new RealtimeData();

    // @ts-expect-error: Argument of type 'null' is not assignable to parameter of type 'number'.
    await expect(client.getMonitorByStopId(null)).rejects.toThrow(
      ParameterInvalidError,
    );
  });

  it("should get monitor data by stopId", async () => {
    const client = new RealtimeData();

    // Praterstern
    const data = await client.getMonitorByStopId(309);

    expect(Array.isArray(data.monitors)).toBeTruthy();
  });

  it("should get monitor data for multiple stopIds", async () => {
    const client = new RealtimeData();

    // All Praterstern Stops
    const data = await client.getMonitorByStopId([
      309, 311, 345, 2100, 2659, 2704, 3450, 3886, 4112, 4117, 4260, 4263, 4729,
      4532, 4533, 5707, 5710,
    ]);

    expect(Array.isArray(data.monitors)).toBeTruthy();
  });

  it("should throw error when DIVA does not exist", async () => {
    const client = new RealtimeData();

    await expect(client.getMonitor(309)).rejects.toThrow(
      StoppointDoesNotExistError,
    );
  });

  it("should get monitor data by DIVA", async () => {
    const client = new RealtimeData();

    // Praterstern - this call should yield the same results as the call by
    // stopId when provided all related stopIds
    const data = await client.getMonitor(60201040);

    expect(Array.isArray(data.monitors)).toBeTruthy();
  });

  it("should get monitor data by multiple DIVA", async () => {
    const client = new RealtimeData();

    const data = await client.getMonitor([60201040, 60201095]);

    expect(Array.isArray(data.monitors)).toBeTruthy();
  });

  /*
  // Invalid stationId will not trigger an error, instead the monitors
  // will simply be empty
  it("should throw error when stationId does not exist", async () => {
    const client = new WienerLinien();

    await expect(client.getMonitor(-500))
      .rejects
      .toThrow(MandatoryParameterMissingError);
  });
  */
});
