import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { SafePipeModule } from 'safe-pipe';

import { AppComponent } from './app.component';
import { RepertoireComponent } from './components/repertoire/repertoire.component';
import { PriceListComponent } from './components/price-list/price-list.component';
import { SpecialOffersComponent } from './components/special-offers/special-offers.component';
import { BestComponent } from './components/best/best.component';
import { MovieDetailsComponent } from './components/repertoire/movie-details/movie-details.component';
import { OrderTicketComponent } from './components/repertoire/movie-details/order-ticket/order-ticket.component';
import { ContactComponent } from './components/contact/contact.component';
import { NavbarComponent } from './components/partial/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    RepertoireComponent,
    PriceListComponent,
    SpecialOffersComponent,
    BestComponent,
    MovieDetailsComponent,
    OrderTicketComponent,
    ContactComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    SafePipeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
