import { Injectable, HttpService, Logger } from '@nestjs/common';

import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { ConfigService } from '../config/config.service';
import { Financials } from './financial.model';

/**
 * Stock research service.
 */
@Injectable()
export class StockResearchService {

  private readonly logger = new Logger(StockResearchService.name);

  private static readonly SERVICE_PROVIDER_KEY: string = 'SERVICE_PROVIDER_URL';
  private providerUrl: string;

  /**
   * Init service with external dependencies
   * @param config Configuration object
   * @param http HttpUtil
   */
  constructor(private config: ConfigService, private http: HttpService) {
    this.providerUrl = this.config.get(StockResearchService.SERVICE_PROVIDER_KEY);
  }

  /**
   * Get financials for given stock.
   * @param stockSymbol Stock symbol
   * @param annual Set to true for annualized financials.  Default is quarterly
   * @returns RxJS Observable compatible response object
   */
  getFinancials(stockSymbol: string, annual: boolean = false): Observable<Financials> {
    return this.http.get<Financials>(this.buildProviderUrl(stockSymbol, annual))
      .pipe(
        map(response => response.data),
        tap(response => this.logger.log('Received financials for:  ' + response.symbol)),
      );
  }

  /**
   * Build provider url given stock and period
   * @param stockSymbol Stock symbol
   * @param annual Quarterly or Annual.  Default quarterly
   */
  private buildProviderUrl(stockSymbol: string, annual: boolean = false): string {

    //  $1/financials?period=annual
    let parameterizedUrl = this.providerUrl + '/' + stockSymbol + '/financials';
    if (annual) {
      parameterizedUrl = parameterizedUrl + '?period=annual';
    }

    return parameterizedUrl;
  }

}
