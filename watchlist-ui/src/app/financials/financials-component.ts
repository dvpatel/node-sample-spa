import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

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

    private currentSymbol: string;
    private isAnnual: boolean;

    private cachedData: Map<boolean, Map<string, Array<Financial>>> = new Map<boolean, Map<string, Array<Financial>>>();

    /**
     * DI services
     * @param simpleMessenger
     * @param stockResearchService
     */
    constructor(private simpleMessenger: SimpleMessengerService, private stockResearchService: StockResearchService) {
        this.initLableMapper();
        this.setupStockListener();
        this.setupResetListener();
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
                this.currentSymbol = symbol;
                this.getRowElements(symbol, this.isAnnual)
                    .subscribe(results => this.dataSource.data = results);
            });
    }

    /**
     * Handle clear event
     */
    private setupResetListener(): void {
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
            this.isAnnual = event.checked;

            this.getRowElements(this.currentSymbol, event.checked)
                .subscribe(results => this.dataSource.data = results);
        }
    }

    /**
     * Simple cache manager that NEVER expires. ;
     * @param symbol
     * @param isAnnual
     */
    private getRowElements(symbol: string, isAnnual: boolean = false): Observable<Array<RowElements>> {

        const cachedAnnuals = this.cachedData.get(isAnnual);
        if (!cachedAnnuals) {
            this.cachedData.set(isAnnual, new Map<string, Array<Financial>>());
        }

        const cachedElements = this.cachedData.get(isAnnual).get(symbol);
        if (!cachedElements) {
            return this.loadFinancials(symbol, isAnnual)
                .pipe(
                    map((financials: Financials[]) => {
                        this.cachedData.get(isAnnual).set(symbol, financials[0].financials);
                        return this.transformData(this.cachedData.get(isAnnual).get(symbol));
                    })
                );
        } else {
            return of(this.transformData(cachedElements));
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
        out.push(fin[0][key] / 1000);
        out.push(fin[1][key] / 1000);
        out.push(fin[2][key] / 1000);
        out.push(fin[3][key] / 1000);

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
