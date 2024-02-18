![Tests](https://github.com/stylesuxx/wiener-linien/actions/workflows/test.yaml/badge.svg)

# Wiener Linien API

Wiener Linien provide a couple of different APIs du to the Open Data initiative of Vienna.

The goal of this library is to wrap all of those APIs in an easy to use way. Currently the following APIs are supported:

- [x] [Realtime departure data](https://www.wienerlinien.at/ogd_realtime/doku/ogd/wienerlinien-echtzeitdaten-dokumentation.pdf)
- [ ] Routing

Access keys are not required, but their fair use policy states to keep requests at least 15 seconds apart. You will have to handle this, it is not done by the API Wrapper.

## Installation

Install with the packagemanager of your choice, package is available on [npm](https://www.npmjs.com/package/wiener-linien-api).

```
yarn add wiener-linien-api
```

## Usage

All available API endpoints are being wrapped by this library.

### Realtime Data

This API relies on the knowledge of the `stopId` or multiple stop IDs for that matter or the `DIVA`.

Querying data by `DIVA` is the prefered method since it will return data for all stops withing this `DIVA`.

> For example: Praterstern has 17 `stopIds` related to it which can all be queryied by just one `DIVA`.

The most convenient way I could find is this [CSV file](https://www.wienerlinien.at/ogd_realtime/doku/ogd/wienerlinien-ogd-haltepunkte.csv) containing stops with their stopId and DIVA numbers.

#### getMonitor(diva, params)

Get live departure data for one or more stations

**Parameters:**

- diva `number | Array<number>` - DIVA(s) you are interested id
- params `object` - Optional additional parameters to filter the results

```typescript
{
  activateTrafficInfo?: string | Array<string>;
  aArea?: BooleanNumber;
}
```

**Examples:**

```javascript
import { RealtimeData } from "wiener-linien-api";

const client = new RealtimeData();

let monitor = client.getMonintor(60201095);
monitor = client.getMonintor([60201040, 60201095]);
```

#### getMonitorByStopId(stopId, params)

Get live departure data for one or more stations

**Parameters:**

- stationId `number | Array<number>` - stationID(s) you are interested id
- params `object` - Optional additional parameters to filter the results

```typescript
{
  activateTrafficInfo?: string | Array<string>;
  aArea?: BooleanNumber;
}
```

**Examples:**

```javascript
import { RealtimeData } from "wiener-linien-api";

const client = new RealtimeData();

let monitor = client.getMonintorByStopId(1095);
monitor = client.getMonintorByStopId([1095, 1096]);
```

#### getNewsList(params)

Get a list of news

**Parameters:**

- params `object` - Optional additional parameters to filter the results

```typescript
{
  relatedLine?: string | Array<string>,
  relatedStop?: number | Array<number>,
  name?: string | Array<string>,
}
```

**Examples:**

```javascript
import { RealtimeData } from "wiener-linien-api";

const client = new RealtimeData();

const list = client.getNewsList();
```

#### getNews(name)

Show news by their name

**Parameters:**

- name `string | Array<string>` - The name of the news you are interested in

**Examples:**

```javascript
import { RealtimeData } from "wiener-linien-api";

const client = new RealtimeData();

let list = client.getNews("news_1");
list = client.getNews(["news_1", "news_2"]);
```

#### getTrafficInfoList(params)

Get a list of traffic info items

**Parameters:**

- params `object` - Optional additional parameters to filter the results

```typescript
{
  relatedLine?: string | Array<string>,
  relatedStop?: number | Array<number>,
  name?: string | Array<string>,
}
```

**Examples:**

```javascript
import { RealtimeData } from "wiener-linien-api";

const client = new RealtimeData();

let list = client.getTrafficInfoList();
list = client.getTrafficInfoList({
  relatedLine: ["U1", "U3"],
});
```

#### getTrafficInfo(name)

Show traffic info items by their name

**Parameters:**

-name `string | Array<string>` - The name of the traffic info you are interested in

**Examples:**

```javascript
import { RealtimeData } from "wiener-linien-api";

const client = new RealtimeData();

let result = client.getTrafficInfo("name_1");
result = client.getTrafficInfo(["name_1", "name_2"]);
```

## Interfaces

There are interfaces for all the related data. I put them together from the [official documentation](https://www.wienerlinien.at/ogd_realtime/doku/ogd/wienerlinien-echtzeitdaten-dokumentation.pdf) and the actual data being returned.

Not everything the API is returning, is actually documented, so the interfaces might not be 100% up to date. I would not rely on the undocumented fields as they might disappear anytime.

Please feel free to share your experiences and commit PRs where you see fit, especially for those undocumented cases.

## Testing

Tests are in place, there are timeouts between each tests to comply with the APIs fair use policy, so they take some time to finish running.

Tests are a bit naive and we are only testing for valid responses, not checking against any interface since the actually returned data obviously changed during the course of the day.

> With API wrappers I am personally not a fan to test against mocks, since obviously they would pass any time.

Resources:

- https://www.data.gv.at/katalog/dataset/wiener-linien-echtzeitdaten-via-datendrehscheibe-wien
- https://till.mabe.at/rbl/
