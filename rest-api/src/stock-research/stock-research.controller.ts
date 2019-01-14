import { HttpStatus, Controller, Res, Get, Param, Query, UsePipes, Logger } from '@nestjs/common';
import { StockResearchService } from './stock-research.service';
import {QueryValidationPipe } from '../util/query-validation.pipe' ;
import { SymbolValidationPipe } from '../util/symbol-validation.pipe' ;
import { ErrorUtil } from '../util/error';

/**
 * Controller for /financials requests
 */
@Controller('financials')
export class StockResearchController {

  private readonly logger = new Logger(StockResearchController.name);

  /**
   * DI of service provider.
   * @param service
   */
  constructor(private readonly service: StockResearchService) { }

  /**
   * Returns Financials payload after data validation.
   * @param symbol stock symbol
   * @param annual annualized or quarterly.  Default is quarterly
   */
  @Get(':symbol')
  @UsePipes(new SymbolValidationPipe(), new QueryValidationPipe())
  getFinancials(
    @Param('symbol') symbol: string,
    @Query('annual') annual: boolean = false,
    @Res() response) {

    /**
     * Service resturns RXJS Observable<Financials> object.
     */
    this.service.getFinancials(symbol, annual)
      .subscribe(result => {
        response.status(HttpStatus.OK).send(result);
      }, error => {
        const errorResp = ErrorUtil.errorResponseObject(error.response);
        response.status(errorResp.statusCode).send(ErrorUtil.errorResponseObject(error.response));
      });

  }
}
