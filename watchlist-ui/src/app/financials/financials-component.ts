import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { SimpleMessengerService } from '../common/simple-messenger.service';
import { MatTableDataSource, MatCheckboxChange } from '@angular/material';

import { StockResearchService } from '../stockresearch-service/stock-research.service';
import { Financial, Financials } from '../stockresearch-service/financial.model';

import { LabelMappingModel } from './label-mapping.model';

/**
 * Object to represent row elements of Material table.
 */
interface RowElements {
    name: string;
    results: Array<number>;
}

/**
 * Financials Component
 */
@Component({
    selector: 'app-financials-table',
    styleUrls: ['financials-component.css'],
    templateUrl: 'financials-component.html',
})
export class FinancialsComponent {

    displayedColumns: string[] = ['name', 'c1', 'c2', 'c3', 'c4'];
    columnLabels: Array<string> = new Array<string>();
    dataSource: MatTableDataSource<RowElements> = new MatTableDataSource<RowElements>();
    private labelMap: Map<string, string>;

    private currentSymbol: string ;
    private isAnnual: boolean ;

    /**
     * DI services
     * @param simpleMessenger
     * @param stockResearchService
     */
    constructor(private simpleMessenger: SimpleMessengerService, private stockResearchService: StockResearchService) {

        this.initLableMapper();
        this.setupStockListener();
        this.setupResetListenenr();

    }

    /**
     * Label mapping.
     */
    private initLableMapper(): void {
        this.labelMap = LabelMappingModel.getMap();
    }

    /**
     * Listen for and handle symbol changes.
     */
    private setupStockListener(): void {
        //  Handle symbole change event ;
        this.simpleMessenger.stockSelected$
            .subscribe((symbol: string) => {
                this.loadFinancials(symbol, this.isAnnual)
                    .subscribe((financials: Financials[]) => {
                        this.currentSymbol = symbol ;
                        this.dataSource.data = this.transformData(financials[0].financials);
                    });

            });
    }

    /**
     * Handle clear event
     */
    private setupResetListenenr(): void {
        this.simpleMessenger.clearFinancials$
            .subscribe(() => {
                this.dataSource.data = [];
                this.columnLabels = new Array<string>();
            });

    }


    /**
     * Annual Financials ;
     * @param event
     */
    onAnnualSelect(event: MatCheckboxChange) {

        if (this.currentSymbol) {

            let resp:  Observable<Financials[]> ;
            if (event.checked) {
                resp = this.loadFinancials(this.currentSymbol, true);
            } else {
                resp = this.loadFinancials(this.currentSymbol, false) ;
            }

            this.isAnnual = event.checked ;
            resp.subscribe((financials: Financials[]) => {
                this.dataSource.data = this.transformData(financials[0].financials);
            });

        }
    }

    /**
     * Transform Financials data to fit Material Table.
     * @param financials
     */
    private transformData(financials: Financial[]): Array<RowElements> {

        const keys = Object.keys(financials[0]);

        //  Add header labels ;
        this.headerItems(financials, keys.shift());

        //  Populate table
        const results = new Array<RowElements>();
        keys.forEach((key: string) => {
            results.push(this.rowItem(financials, key));
        });

        return results;
    }

    /**
     * table header logic.
     * @param fin
     * @param key
     */
    private headerItems(fin: Financial[], key: string): void {
        this.columnLabels = new Array<string>();
        this.columnLabels.push(fin[0][key]);
        this.columnLabels.push(fin[1][key]);
        this.columnLabels.push(fin[2][key]);
        this.columnLabels.push(fin[3][key]);
    }

    /**
     * Elements for each row ;
     * @param fin
     * @param key
     */
    private rowItem(fin: Financial[], key: string): RowElements {
        const out = new Array<number>();
        out.push(fin[0][key]);
        out.push(fin[1][key]);
        out.push(fin[2][key]);
        out.push(fin[3][key]);

        const output: RowElements = { name: this.labelMap[key], results: out };
        return output;
    }

    /**
     * Load annual or quarterly financials
     * @param symbol
     * @param isAnnual
     */
    private loadFinancials(symbol: string, isAnnual: boolean = false): Observable<Financials[]> {
        const symbolArr = new Array<string>();
        symbolArr.push(symbol);

        if (isAnnual) {
            return this.stockResearchService.getAnnualFinancials(symbolArr);
        } else {
            return this.stockResearchService.getQuarterlyFinancials(symbolArr);
        }
    }

}
