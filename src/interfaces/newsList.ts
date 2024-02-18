import { Time } from "./general";

export interface NewsListResponse {
  pois: Array<NewsListPoi>;
  poiCategoryGroups?: Array<NewsListPoiCategoryGroup>;
  poiCategories?: Array<NewsListPoiCategory>;
}

export interface NewsListPoi {
  refPoiCategoryId: number;
  name: string;
  title: string;
  description: string;
  subtitle?: string;
  relatedLines?: Array<string>;
  relatedStops?: Array<number>;
  attributes?: NewsListPoiAttributes;
  time: Time;
}

export interface NewsListPoiAttributes {
  status?: string;
  station?: string;
  location?: string;
  relatedLines?: Array<string>;
  relatedStops?: Array<number>;
  towards?: string;
  ausVon?: string;
  ausBis?: string;
  rbls?: Array<number>;
  /** Not documented */
  reason?: string;
}

export interface NewsListPoiCategoryGroup {
  id: number;
  name: string;
  /** Not documented */
  title: string;
}

export interface NewsListPoiCategory {
  id: number;
  name: string;
  title: string;
  refPoiCategoryGroupId: number;
  /** Not documented */
  trafficInfoNameList: string;
}
