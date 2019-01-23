import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Stock } from '../watchlist-service/stock.model';

/**
 * Enable peer-to-peer communications
 */
@Injectable()
export class SimpleMessengerService {

    // Observable string sources
    private symbolSubject = new Subject<string>();
    private cleanFinancialsSubject = new Subject();

    // Observable string streams
    stockSelected$ = this.symbolSubject.asObservable();
    clearFinancials$ = this.cleanFinancialsSubject.asObservable();

    /**
     * Notify of stock symbol change
     * @param symbol
     */
    symbolChanged(symbol: string) {
        this.symbolSubject.next(symbol);
    }

    /**
     * Notify to clear financials
     */
    clearFinancials() {
        this.cleanFinancialsSubject.next();
    }
}
