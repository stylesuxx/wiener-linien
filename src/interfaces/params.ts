type BooleanNumber = 0 | 1;

export interface MonitorParams {
  diva?: number | Array<number>;
  activateTrafficInfo?: string | Array<string>;
  aArea?: BooleanNumber;
}

export interface NewsListParams {
  /** Line names you want to see news for */
  relatedLine?: string | Array<string>;
  /** station ID(s) for which you want to see news */
  relatedStop?: number | Array<number>;
  /**
   * Name of the news category. Will display everything if invalid category.
   * Only seems to be working for some categories. An "unknown" name will yield
   * all results.
   */
  name?: string | Array<string>;
}

export interface TrafficInfoListParams {
  /** Line names you want to see traffic info for */
  relatedLine?: string | Array<string>;
  /** station ID(s) for which you want to see info for */
  relatedStop?: number | Array<number>;
  /** Name of the traffic info category.  */
  name?: string | Array<string>;
}
