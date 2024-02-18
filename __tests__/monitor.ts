import RealtimeData from "../src/RealtimeData";
import { ParameterInvalidError } from "../src/errors";
import {
  MonitorResponseMonitor,
  MonitorResponseLine,
  MonitorResponseLineDeparture,
} from "../src/interfaces/monitor";

describe("WienerLinien monitor", () => {
  afterEach(async () => {
    const wait = 15000;

    await new Promise((resolve) => setTimeout(resolve, wait));
  }, 30000);

  it("should throw error when stationId is missing", async () => {
    const client = new RealtimeData();

    // @ts-expect-error: Argument of type 'null' is not assignable to parameter of type 'number'.
    await expect(client.getMonitor(null)).rejects.toThrow(
      ParameterInvalidError,
    );
  });

  it("should get monitor data", async () => {
    const client = new RealtimeData();

    const data = await client.getMonitor(147);

    expect(Array.isArray(data.monitors)).toBeTruthy();
    expect(data.monitors.length > 0).toBeTruthy();

    const monitor = data.monitors[0] as MonitorResponseMonitor;
    expect(typeof monitor.locationStop).toBe("object");

    const locationStop = monitor.locationStop;
    expect(typeof locationStop.type).toBe("string");
    expect(typeof locationStop.geometry).toBe("object");

    const geometry = locationStop.geometry;
    expect(typeof geometry.type).toBe("string");
    expect(Array.isArray(geometry.coordinates)).toBeTruthy();

    const properties = locationStop.properties;
    expect(typeof properties.name).toBe("string");
    expect(typeof properties.title).toBe("string");
    expect(typeof properties.municipality).toBe("string");
    expect(typeof properties.municipalityId).toBe("number");
    expect(typeof properties.type).toBe("string");
    expect(typeof properties.coordName).toBe("string");
    expect(typeof properties.gate).toBe("string");
    expect(typeof properties.attributes).toBe("object");

    const attributes = properties.attributes;
    expect(typeof attributes.rbl).toBe("number");

    const lines = monitor.lines;
    expect(Array.isArray(lines)).toBeTruthy();

    if (lines) {
      const line = lines[0] as MonitorResponseLine;
      expect(typeof line.name).toBe("string");
      expect(typeof line.towards).toBe("string");
      expect(typeof line.direction).toBe("string");
      expect(typeof line.platform).toBe("string");
      expect(typeof line.richtungsId).toBe("string");
      expect(typeof line.barrierFree).toBe("boolean");
      expect(typeof line.realtimeSupported).toBe("boolean");
      expect(typeof line.trafficjam).toBe("boolean");
      expect(typeof line.type).toBe("string");
      expect(typeof line.lineId).toBe("number");
      expect(typeof line.departures).toBe("object");

      const departures = line.departures;
      expect(Array.isArray(departures.departure)).toBeTruthy();

      if (departures.departure) {
        const departure = departures
          .departure[0] as MonitorResponseLineDeparture;
        expect(typeof departure).toBe("object");
        expect(typeof departure.departureTime).toBe("object");

        const departureTime = departure.departureTime;
        expect(typeof departureTime.timePlanned).toBe("string");
        expect(typeof departureTime.timeReal).toBe("string");
        expect(typeof departureTime.countdown).toBe("number");
      }
    }
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
