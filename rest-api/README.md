## Introduction

```bash
REST services based on Nest.

This application was written not only to demonstrate how to write REST APIs 
but also to demonstrate how to structure the application code for modularity, 
separation of responsibilities (data validation, configuration authentication, service 
injection, etc.), incremental updates, testability, and ease of support and
maintenance.  Testability is a TODO.

Also, the Nest framework was selected because it exibits common development 
and structural paradigms as AngularJS.  For full-stack developers who are coding 
both the front-end and the back-end, the common coding and structural paradigms 
would help accelerate the learning curve.  Furthermore, since both the client and
server is based on TypeScript, there is the option of reusing some of the data 
models, ie. the objects that represents Watchlist and Financials, between the front-end 
and back-end.  To demonstrate complete independence between front-end and back-end, 
this sample application does not do this.

```

## Description

```bash
This sample application was written to demonstrate REST CRUD operations 
for 2 sample services:  StockResearch and Watchlist.  The StockResearch 
API is a read only service developed to retrieve quarterly and annual 
financials.  The read only operation basically demonstrates 
REST GET requests that are safe and idempotent.

The second service is a WatchList service based on randomly generated data 
consisting of S&P 500 index stocks.  This service demonstrates all the 
CRUD operations for creating, retrieving, updating and deleting a
(fake) customer's wathlist.  The CRUD operations are directly correlated 
to HTTP POST, GET, PUT and DELETE methods.

```

## StockResearch Service (GET)

```bash
StockResearch Service:

The StockResearch service provides quarterly and annual financials for a
specific stock.  To retrieve quarterly financials in JSON format, access the 
URL http://localhost:3000/financials/<stock_symbol>.  To retrieve annualized 
financials, access the same URL with the QueryParam 'annual=true'.

```

## WatchList ( GET, POST, PUT, DELETE aka CRUD )

```bash
WatchList Service:

The WatchList service provides CRUD operations for managing (fake) customer's 
watchlist.  On startup, the application will build 20 sample watchlists based on 
randomized data points made up of S&P index stocks.

To retrieve or GET ALL (fake) customer's watchlists, access URL:  http://localhost:3000/watchlist.

To access specific watchlist, pass in watchlist id as part of the URL parameter.  
ie.  http://localhost:3000/watchlist/1


To create a new watchlist, use the POST method with the relevent 
JSON payload:  http://localhost:3000/wathlist.
Sample JSON Payload:  
{
   "name": "My super duper watchlist",
   "notes": "Special notes.",
   "stockIds": [10, 20, 30]
}

On success, the service will return JSON  reponse with a new watchlist id and 
status code 200.  Any other status code is an error.

Since the WatchList service is based on dummy data, the successful POST request will 
result in a new watchlist object which will be added to an internal watchlist map.  This 
data is not persisted.  On restart a new collection of watchlist will be created with
randomized stocks data.

Similary, to update an existing watchlist, use the PUT method and sumit JSON payload 
to the same end-point with a watchlist id parameter:  http://localhost:3000/watchlist/<watchlist_id>

Lastly to delete a watchlist in the watchlist, use the DELETE method to the same 
end-point with watchlist id as a parameter:  http://localhost:3000/watchlist/<watchlist_id>.  
To delete a specific stock, include query parameter stockId:  http://localhost:3000/watchlist/1?stockId=10

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

## Accessing Service
```bash
Use Chrome for GET operations.  For remaining, use utilities such as curl.
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
