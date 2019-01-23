import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { MatSelectionListChange, MatSelectionList } from '@angular/material';

import { Stock } from '../watchlist-service/stock.model';
import { WatchListService } from '../watchlist-service/watch-list.service';
import { WatchLists } from '../watchlist-service/watch-lists.model';
import { WatchList } from '../watchlist-service/watch-list.model';

import { SimpleMessengerService } from '../common/simple-messenger.service';
import { StockResearchService } from '../stockresearch-service/stock-research.service';

/**
 * Handle for watchlists.
 */
@Component({
    selector: 'app-watchlists',
    templateUrl: 'watchlists.component.html',
    styleUrls: ['watchlists.component.css'],
})
export class WatchListsComponent implements OnInit {

    @ViewChild('watchListSelect') watchListSelect;
    @ViewChild('stockSelect') stockSelect;

    watchLists: Array<WatchList>;
    stocks: Array<Stock>;

    deleteWatchListsDisabled: boolean;
    deleteStockDisabled: boolean;

    private currentStockSymbol: string;
    private currentWatchListIndex: number;

    /**
     * DI with dependent service
     * @param simpleMessenger simple bus like service for inter-component communication
     * @param watchListService watch list service
     */
    constructor(
        private simpleMessenger: SimpleMessengerService,
        private watchListService: WatchListService) {
    }

    /**
     * Setup on init.
     */
    ngOnInit(): void {

        //  Disable multi-select
        this.watchListSelect.selectedOptions._multiple = false;
        this.stockSelect.selectedOptions._multiple = false;

        this.watchListService.getWatchLists()
            .subscribe((watchLists: WatchLists) => {
                this.watchLists = watchLists.list;
            }, error => {
                alert('ERROR:  ' + JSON.stringify(error));
            });
    }

    /**
     * Watch list select handler logic
     * @param event
     */
    onWatchListSelect(event: MatSelectionListChange) {

        //  Clear previously saved financials ;
        this.simpleMessenger.clearFinancials();

        //  on select true.
        if (event.option.selected) {

            //  delete buttons activation logic; disable stock button;
            this.deleteWatchListsDisabled = false;
            this.deleteStockDisabled = true;

            //  Save state
            const selectedWatchListId = event.option.value;

            this.currentWatchListIndex =
                this.watchLists.findIndex((watchList: WatchList) => watchList.watchListId === selectedWatchListId);

            if (this.watchLists[this.currentWatchListIndex].stocks) {
                this.stocks = this.watchLists[this.currentWatchListIndex].stocks;
            }

        } else {

            //  on un-select.

            //  delete buttons de-activation logic; disable both
            this.deleteWatchListsDisabled = true;
            this.deleteStockDisabled = true;

            //  Unselect stock ;
            if (this.stockSelect.selectedOptions.selected.length > 0) {
                this.stockSelect.selectedOptions.selected[0].selected = false;
            }
        }
    }

    /**
     * Stock select logic.
     * @param event
     */
    onStockSelected(event: MatSelectionListChange) {

        //  Process only if watch list  and stock is selected.
        if (!this.deleteWatchListsDisabled) {
            if (event.option.selected) {

                //  Enable stock button ;
                this.deleteStockDisabled = false;

                this.currentStockSymbol = event.option.value;
                this.simpleMessenger.symbolChanged(this.currentStockSymbol);
            } else {
                this.deleteStockDisabled = true;
            }
        } else {
            //  Do not allow stock selection if watchlist is not selected.
            this.stockSelect.selectedOptions.selected[0].selected = false ;
        }

    }

    /**
     * Delete selected watchlist.
     */
    deleteWatchList() {
        this.watchListService.deleteWatchListById(this.watchLists[this.currentWatchListIndex].watchListId)
            .subscribe(response => {
                if (response.status === 200) {

                    //  Update UI on successful delete.
                    this.watchLists.splice(this.currentWatchListIndex, 1);

                    if (this.watchLists.length > 0) {
                        this.watchListSelect.selectedOptions.selected[0].selected = true ;

                        this.stocks = this.watchLists[0].stocks;
                        this.currentWatchListIndex = 0;

                        this.deleteWatchListsDisabled = false;
                        this.deleteStockDisabled = true;


                    } else {
                        this.watchLists = null;
                        this.stocks = null;
                        this.deleteWatchListsDisabled = true;
                        this.deleteStockDisabled = true;
                    }

                }
            }, error => {
                console.error('Error:  ' + error);
            });
    }

    /**
     * Delete selected stock.
     */
    deleteStock() {
        const stockIndx = this.watchLists[this.currentWatchListIndex].stocks
            .findIndex((stock: Stock) => stock.symbol === this.currentStockSymbol);

        if (stockIndx !== -1) {
            this.watchListService.deleteStockById(
                this.watchLists[this.currentWatchListIndex].watchListId, this.stocks[stockIndx].stockId)
                .subscribe(response => {
                    this.stocks.splice(stockIndx, 1);
                    this.deleteStockDisabled = true;

                    this.simpleMessenger.clearFinancials();
                });
        }
    }

}
