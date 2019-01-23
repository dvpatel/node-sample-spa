import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Financials } from './financial.model' ;

/**
 * Stock service
 */
@Injectable()
export class StockResearchService {

    /**
     * Http service DI
     * @param http
     */
    constructor(private http: HttpClient) { }

    /**
     * Quarterly financials
     * @param symbols
     */
    getQuarterlyFinancials(symbols: string[]): Observable<Financials[]> {
        return this.http.get<Financials[]>(environment.stockResearchServiceURL + 'quarterly?symbols=' + symbols.join(','));
    }

    /**
     * Get annual financials
     * @param symbols
     */
    getAnnualFinancials(symbols: string[]): Observable<Financials[]> {
        return this.http.get<Financials[]>(environment.stockResearchServiceURL + 'annual?symbols=' + symbols.join(','));
    }
}
