export interface MonitorResponse {
  monitors: Array<MonitorResponseMonitor>;
  trafficInfoCategoryGroups?: Array<MonitorResponseMonitorTrafficInfoCategoryGroup>;
  trafficInfoCategories?: Array<MonitorResponseMonitorTrafficInfoCategories>;
  trafficInfos?: Array<MonitorResponseMonitorTrafficInfo>;
}

export interface MonitorResponseMonitorTrafficInfo {
  refTrafficInfoCategoryId: number;
  name: string;
  priority?: string;
  owner?: string;
  title: string;
  description: string;
  relatedLines?: string;
  relatedStops?: string;
  time: MonitorResponseMonitorTrafficInfoTime;
  attributes?: MonitorResponseMonitorTrafficInfoAttributes;
}

export interface MonitorResponseMonitorTrafficInfoAttributes {
  status?: string;
  station?: string;
  location?: string;
  reason?: string;
  towards?: string;
  relatedLines?: string;
  relatedStops?: string;
}

export interface MonitorResponseMonitorTrafficInfoTime {
  start?: Date;
  end?: Date;
  resume?: Date;
}

export interface MonitorResponseMonitorTrafficInfoCategories {
  id: number;
  refTrafficInfoCategoryGroupId: number;
  name: string;
  trafficInfoNameList: string;
  title: string;
}

export interface MonitorResponseMonitorTrafficInfoCategoryGroup {
  id: number;
  name: string;
}

export interface MonitorResponseMonitor {
  locationStop: MonitorResponseLocationStop;
  lines?: Array<MonitorResponseLine>;
  refTrafficInfoNames?: string;
  // Not documented
  attributes: MonitorResponseMonitorAttributes;
}

// Not documented
export interface MonitorResponseMonitorAttributes {}

export interface MonitorResponseLocationStop {
  type: string;
  geometry: LocationStopGeometry;
  properties: LocationStopProperties;
}

export interface LocationStopGeometry {
  type: string;
  coordinates: Array<Array<number>>;
}

export interface LocationStopProperties {
  name: string;
  title: string;
  municipality: string;
  municipalityId: number;
  type: string;
  coordName: string;
  gate?: string;
  attributes: LocationStopPropertiesAttributes;
}

export interface LocationStopPropertiesAttributes {
  rbl: number;
}

export interface MonitorResponseLine {
  name: string;
  towards: string;
  direction: string;
  platform: string;
  richtungsId: string;
  barrierFree?: boolean;
  realtimeSupported?: boolean;
  trafficjam?: boolean;
  departures: MonitorResponseLineDepartures;
  type: string;
  lineId?: number;
}

export interface MonitorResponseLineDepartures {
  departure?: Array<MonitorResponseLineDeparture>;
}

export interface MonitorResponseLineDeparture {
  departureTime: MonitorResponseLineDepartureTime;
  vehicle?: MonitorResponseLineDepartureVehicle;
}

export interface MonitorResponseLineDepartureTime {
  timePlanned: string;
  timeReal?: string;
  countdown: number;
}

export interface MonitorResponseLineDepartureVehicle {
  name: string;
  towards: string;
  direction: string;
  platform: string;
  richtungsId: string;
  barrierFree: boolean;
  foldingRamp?: boolean;
  realtimeSupported: boolean;
  trafficjam: boolean;
  type: string;
  linienId: number;
  // Not documented
  attributes: MonitorResponseLineDepartureVehicleAttributes;
}

// Not documented
export interface MonitorResponseLineDepartureVehicleAttributes {}
