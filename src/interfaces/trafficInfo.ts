import {
  TrafficInfoListTrafficInfo,
  TrafficInfoCategoryGroup,
  TrafficInfoCategory,
} from "./trafficInfoList";

export interface TrafficInfoResponse {
  trafficInfos: Array<TrafficInfoListTrafficInfo>;
  trafficInfoCategories?: Array<TrafficInfoCategory>;
  trafficInfoCategoryGroups?: Array<TrafficInfoCategoryGroup>;
}
