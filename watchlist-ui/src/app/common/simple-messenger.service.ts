import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

/**
 * Enable peer-to-peer communications between UI components
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
