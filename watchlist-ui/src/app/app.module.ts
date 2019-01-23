import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModules} from './material.modules';

import { AppComponent } from './app.component';
import { WatchListsComponent } from './watchlists/watchlists.component' ;
import { FinancialsComponent } from './financials/financials-component' ;

import { SimpleMessengerService } from './common/simple-messenger.service' ;
import { WatchListService } from './watchlist-service/watch-list.service' ;
import { StockResearchService } from './stockresearch-service/stock-research.service';

@NgModule({
  declarations: [
    AppComponent,
    WatchListsComponent,
    FinancialsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModules,
    HttpClientModule
  ],
  providers: [WatchListService, SimpleMessengerService, StockResearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
