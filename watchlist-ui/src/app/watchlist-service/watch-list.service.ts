import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { WatchLists } from './watch-lists.model';
import { WatchList } from './watch-list.model';

@Injectable()
export class WatchListService {

    constructor(private http: HttpClient) { }

    getWatchLists(): Observable<WatchLists> {
        return this.http.get<WatchLists>(environment.watchListServiceURL);
    }

    getWatchListById(watchListId: number): Observable<WatchList> {
        return this.http.get<WatchList>(environment.watchListServiceURL + watchListId);
    }

    deleteWatchListById(watchListId: number): Observable<any> {
        //  http://localhost:3000/watchlist/<watchlist_id>
        return this.http.delete<string>(environment.watchListServiceURL + watchListId) ;

    }

    deleteStockById(watchListId: number, stockId: number): Observable<any> {
        //  http://localhost:3000/watchlist/<watchlist_id>
        return this.http.delete<string>(environment.watchListServiceURL + watchListId + '?stockId=' + stockId) ;

    }
}
