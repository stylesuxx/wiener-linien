![Tests](https://github.com/stylesuxx/wiener-linien/actions/workflows/test.yml/badge.svg)

# Wiener Linien API

Wiener Linien provide a couple of different APIs du to the Open Data initiative of Vienna.

The goal of this library is to wrap all of those APIs in an easy to use way. Currently the following APIs are supported:

- [x] [Realtime departure data](https://www.wienerlinien.at/ogd_realtime/doku/ogd/wienerlinien-echtzeitdaten-dokumentation.pdf)
- [ ] Routing

Access keys are not required, but their fair use policy states to keep requests at least 15 seconds apart. You will have to handle this, it is not done by the API Wrapper.

## Usage

All available API endpoints are being wrapped by this library.

### Realtime Data

This API relies on the knowledge of the `stopId` or multiple stop IDs for that matter.

The most convenient way I could find is this [text file](http://www.wienerlinien.at/ogd_realtime/doku/ogd/gtfs/stops.txt) containing stops and geodata for their entries. What we are interested in, is the 4 digit number from the first column:

```
"at:49:1095:0:11","Reumannplatz U","48.1746757017068","16.3775991720935","0100"
```

In this example `1095` is the stationId for **Reumannplatz**.

#### getMonitor(stationId, params)

Get live departure data for one or more stations

**Parameters:**

- stationId `number | Array<number>` - stationID(s) you are interested id
- params `object` - Additional parameters to filter the results
```
{

}
```

**Examples:**

```javascript
const client = new WienerLinien();
const single = client.monitor(1095);
const multiple = client.monitor([1095, 1096]);
```

#### getNewsList(params)

Get a list of news

**Parameters:**

**Examples:**

```javascript
const client = new WienerLinien();
const list = client.getNewsList();
```

#### getNews(name)

Show news by their name

**Parameters:**

-name `string | Array<string>` - The name of the news you are interested in

**Examples:**

```javascript
const client = new WienerLinien();
const single = client.getNews("news_1");
const multiple = client.getNews(["news_1", "news_2"]);
```

#### getTrafficInfoList(params)

Get a list of traffic info items

**Parameters:**

**Examples:**

```javascript
const client = new WienerLinien();
const list = client.getTrafficInfoList();
```

#### getTrafficInfo(name)

Show traffic info items by their name

**Parameters:**

-name `string | Array<string>` - The name of the traffic info you are interested in

**Examples:**

```javascript
const client = new WienerLinien();
const single = client.getTrafficInfo("name_1");
const multiple = client.getTrafficInfo(["name_1", "name_2"]);
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
