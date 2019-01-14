## Description

REST-API based on Nest.

##  Examples

```bash
The sample application supports REST operations for 2 sample APIs:  StockResearch and Watchlist.  For Watchlist, the application supports all CRUD operations using 'dummy' data and service.

StockResearch:
The StockResearch service provides quarterly and annual financials for given stock.  The access quarterly financials, access the url http://localhost:3000/financials/<stock_symbol>.  And for annualized data, include query param 'annual=true'.  The resonse will be JSON data.

WatchList:
The WatchList service provides CRUD operations for managing stock watchlist.  On startup, the application will build sample watchlists based on randomized data points.

To read, GET, all the watchlist, access the URL http://localhost:3000/watchlist.  For a specific watchlist in the list, passing in numeric param.  ie.  http://localhost:3000/watchlist/1

The application also supports the ability to create new watchlist and update stocks in an existing one.

To create a new watchlist, use the POST method and submit JSON payload to the end-point http://localhost:3000/watchlist.  Similary, to update an existing watchlist, use the PUT method and sumit JSON payload to the endpoint http://localhost:3000/watchlist/<watchlist_id>

Sample JSON Payload:  
{
   "name": "My new watchlist",
   "notes": "Special notes.",
   "stockIds": [10, 20, 30]
}

Lastly to delete a watchlist in the watchlist, use the DELETE method to the same end-point, http://localhost:3000/watchlist/<watchlist_id>.  To delete a specific stock, include querty parameter, stockId.


$ npm install
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
