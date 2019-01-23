import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { WatchLists } from './watch-lists.model';
import { WatchList } from './watch-list.model';

/**
 * Watchlist service
 */
@Injectable()
export class WatchListService {

    constructor(private http: HttpClient) { }

    /**
     * Get (fake) customer's watchlist
     */
    getWatchLists(): Observable<WatchLists> {
        return this.http.get<WatchLists>(environment.watchListServiceURL);
    }

    /**
     * Get watchlist by id
     * @param watchListId
     */
    getWatchListById(watchListId: number): Observable<WatchList> {
        return this.http.get<WatchList>(environment.watchListServiceURL + watchListId);
    }

    /**
     * Delete watchlist
     * @param watchListId
     */
    deleteWatchListById(watchListId: number): Observable<any> {
        return this.http.delete<string>(environment.watchListServiceURL + watchListId) ;

    }

    /**
     * Delete stock for given watchlist
     * @param watchListId
     * @param stockId
     */
    deleteStockById(watchListId: number, stockId: number): Observable<any> {
        return this.http.delete<string>(environment.watchListServiceURL + watchListId + '?stockId=' + stockId) ;

    }
}
