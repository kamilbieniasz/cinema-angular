import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { SafePipeModule } from 'safe-pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { RepertoireComponent } from './components/repertoire/repertoire.component';
import { PriceListComponent } from './components/price-list/price-list.component';
import { SpecialOffersComponent } from './components/special-offers/special-offers.component';
import { BestComponent } from './components/best/best.component';
import { MovieDetailsComponent } from './components/repertoire/movie-details/movie-details.component';
import { OrderTicketComponent } from './components/repertoire/movie-details/order-ticket/order-ticket.component';
import { ContactComponent } from './components/contact/contact.component';
import { NavbarComponent } from './components/partial/navbar/navbar.component';
import { FooterComponent } from './components/partial/footer/footer.component';
import { ForSchoolComponent } from './components/special-offers/for-school/for-school.component';
import { ForCompanyComponent } from './components/special-offers/for-company/for-company.component';
import { CheapWednesdayComponent } from './components/special-offers/cheap-wednesday/cheap-wednesday.component';
import { HorrorNightComponent } from './components/special-offers/horror-night/horror-night.component';
import { ClassicMovieComponent } from './components/special-offers/classic-movie/classic-movie.component';
import { LoadingPageComponent } from './components/loading-page/loading-page.component';
import { ConfirmOrderModalComponent } from './modals/confirm-order-modal/confirm-order-modal.component';
import { DateFormatPipe } from './pipes/date-format.pipe';
import { TrailerComponent } from './modals/trailer/trailer.component';

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
    FooterComponent,
    ForSchoolComponent,
    ForCompanyComponent,
    CheapWednesdayComponent,
    HorrorNightComponent,
    ClassicMovieComponent,
    LoadingPageComponent,
    ConfirmOrderModalComponent,
    DateFormatPipe,
    TrailerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    SafePipeModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
