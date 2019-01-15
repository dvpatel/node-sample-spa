## Description

```bash
REST services based on Nest.

This sample application was written to demonstrate REST CRUD operations for 2 sample services:  StockResearch and Watchlist.  The StockResearch API is a readonly service developed to retrieve quarterly and annual financials.  The readonly only operation basically demonstrates REST GET requests that are safe and idempotent.

The second service is a WatchList service based on randomly generated data consisting of all the stocks of the S&P 500 index.  This service demonstrates all the CRUD operations for creating, retrieving, updating and deleting a (fake) customer\'s wathlist.  The CRUD operations are directly correlated to HTTP POST, GET, PUT and DELETE methods.

```

## StockResearch Service (GET)

```bash
StockResearch Service:

The StockResearch service provides quarterly and annual financials for given stock.  To retrieve quarterly financials in JSON format, access the URL http://localhost:3000/financials/<stock_symbol>.  To retrieve annualized financials data, access the same URL with the QueryParam 'annual=true'.

```

## WatchList ( GET, POST, PUT, DELETE aka CRUD )

```bash
WatchList Service:

The WatchList service provides CRUD operations for managing (fake) customer\'s watchlist.  On startup, the application will build 20 sample watchlists based on randomized data points predominantly made of random stocks from the S&P index.

Retrieve or GET ALL (fake) customer\'s watchlists, access URL:  http://localhost:3000/watchlist.

To access specific watchlist, passing in watchlistId as part of the URL parameter.  ie.  http://localhost:3000/watchlist/1


To create a new watchlist, use the POST method with the relevent JSON payload:  http://localhost:3000/wathlist.
Sample JSON Payload:  
{
   "name": "My super duper watchlist",
   "notes": "Special notes.",
   "stockIds": [10, 20, 30]
}

On success, the service will return JSON payload reponse with a new watchlist id and status code 200.  Any other status code is an error.

Since the WatchList service is based on dummy data, the successful POST request will result in a new watchlist object which will be added to an internal watchlist map.

Similary, to update an existing watchlist, use the PUT method and sumit JSON payload to the same endpoint with a watchlist id parameter:  http://localhost:3000/watchlist/<watchlist_id>

Lastly to delete a watchlist in the watchlist, use the DELETE method to the same end-point with watchlist id as a parameter:  http://localhost:3000/watchlist/<watchlist_id>.  To delete a specific stock, include query parameter stockId:  http://localhost:3000/watchlist/1?stockId=10

To get started with Nest install, simple follow the steps below.

```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# incremental rebuild (webpack)
$ npm run webpack
$ npm run start:hmr

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

## Stay in touch

- Author - [Dipesh Patel](https://www.linkedin.com/in/dipeshpatel)

## License

  Nest is [MIT licensed](LICENSE).
