import { Time } from "./general";

export interface TrafficInfoListResponse {
  trafficInfos: Array<TrafficInfoListTrafficInfo>;
  trafficInfoCategories?: Array<TrafficInfoCategory>;
  trafficInfoCategoryGroups?: Array<TrafficInfoCategoryGroup>;
}

export interface TrafficInfoListTrafficInfo {
  refTrafficInfoCategoryId: number;
  name: string;
  priority: string;
  owner: string;
  title: string;
  description: string;
  time?: Time;
  relatedLines?: Array<string>;
  relatedStops?: Array<number>;
  attributes?: TrafficInfoAttributes;
}

export interface TrafficInfoAttributes {
  reason: string;
  station: string;
  location: string;
  towards: string;
  status: string;
  relatedLines?: Array<string>;
  relatedStops?: Array<number>;
}

export interface TrafficInfoCategory {
  id: number;
  refTrafficInfoCategoryGroupId: number;
  name: string;
  trafficInfoNameList: string;
  title: string;
}

export interface TrafficInfoCategoryGroup {
  id: number;
  name: string;
}
