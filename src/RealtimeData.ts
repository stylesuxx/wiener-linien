import {
  DatabaseUnreachableError,
  MandatoryParameterMissingError,
  NoDataInDatabaseError,
  ParameterInvalidError,
  RateLimitReachedError,
  StoppointDoesNotExistError,
} from "./errors";

import { MonitorResponse } from "./interfaces/monitor";
import { NewsListResponse } from "./interfaces/newsList";
import { NewsResponse } from "./interfaces/news";
import { TrafficInfoListResponse } from "./interfaces/trafficInfoList";
import { TrafficInfoResponse } from "./interfaces/trafficInfo";

import {
  MonitorParams,
  NewsListParams,
  TrafficInfoListParams,
} from "./interfaces/params";

interface ErrorResponseMessage {
  messageCode: number;
  value: string;
  serverTime: Date;
}

interface ErrorResponse {
  message: ErrorResponseMessage;
}

interface ApiResponse {
  message: ErrorResponseMessage;
  data?:
    | MonitorResponse
    | NewsListResponse
    | NewsResponse
    | TrafficInfoListResponse
    | TrafficInfoResponse;
}

type Response =
  | MonitorResponse
  | NewsListResponse
  | NewsResponse
  | TrafficInfoListResponse
  | TrafficInfoResponse;

type Params = MonitorParams | NewsListParams | TrafficInfoListParams;

class RealtimeData {
  readonly apiURL = "https://www.wienerlinien.at/ogd_realtime/";

  /**
   * The same parameter can be appended multiple times to the query with
   * different values.
   */
  private buildParameterString(params?: Params): string {
    if (!params) {
      return "";
    }

    let parameterString = "";
    const keys: string[] = Object.keys(params);
    if (keys.length > 0) {
      const parameters: string[] = [];

      keys.forEach((key) => {
        const value = params[key as keyof typeof params];
        const values = Array.isArray(value) ? value : [value];

        values.forEach((value: string) => {
          parameters.push(`${key}=${value}`);
        });
      });

      parameterString = `?${parameters.join("&")}`;
    }

    return parameterString;
  }

  private async get(path: string, params?: Params): Promise<Response> {
    const paramsString = this.buildParameterString(params);
    const url = `${this.apiURL}${path}${paramsString}`;

    const response = await fetch(url);
    const result = (await response.json()) as ApiResponse;

    if (!result.data) {
      const { messageCode, value } = (result as ErrorResponse).message;

      switch (messageCode) {
        case 311: {
          throw new DatabaseUnreachableError(value);
        }
        case 312: {
          throw new StoppointDoesNotExistError(value);
        }

        case 316: {
          throw new RateLimitReachedError(value);
        }

        case 320: {
          throw new ParameterInvalidError(value);
        }

        case 321: {
          throw new MandatoryParameterMissingError(value);
        }

        case 322: {
          throw new NoDataInDatabaseError(value);
        }

        default: {
          throw new Error(value);
        }
      }
    }

    return result.data as Response;
  }

  public async getMonitor(
    stopId: number | Array<number>,
    params?: MonitorParams,
  ): Promise<MonitorResponse> {
    const path = "monitor";
    const allParams = {
      stopId,
      ...params,
    };

    return (await this.get(path, allParams)) as MonitorResponse;
  }

  public async getNewsList(params?: NewsListParams): Promise<NewsListResponse> {
    const path = "newsList";

    return (await this.get(path, params)) as NewsListResponse;
  }

  public async getNews(name: string | Array<string>): Promise<NewsResponse> {
    const path = "news";
    const params = { name };

    return (await this.get(path, params)) as NewsResponse;
  }

  public async getTrafficInfoList(
    params?: TrafficInfoListParams,
  ): Promise<TrafficInfoListResponse> {
    const path = "trafficInfoList";

    return (await this.get(path, params)) as TrafficInfoListResponse;
  }

  public async getTrafficInfo(
    name: string | Array<string>,
  ): Promise<TrafficInfoResponse> {
    const path = "trafficInfo";
    const params = { name };

    return (await this.get(path, params)) as TrafficInfoResponse;
  }
}

export default RealtimeData;
