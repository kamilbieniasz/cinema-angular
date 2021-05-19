import { ClassicMovieComponent } from './components/special-offers/classic-movie/classic-movie.component';
import { HorrorNightComponent } from './components/special-offers/horror-night/horror-night.component';
import { CheapWednesdayComponent } from './components/special-offers/cheap-wednesday/cheap-wednesday.component';
import { ForCompanyComponent } from './components/special-offers/for-company/for-company.component';
import { ForSchoolComponent } from './components/special-offers/for-school/for-school.component';
import { ContactComponent } from './components/contact/contact.component';
import { OrderTicketComponent } from './components/repertoire/movie-details/order-ticket/order-ticket.component';
import { MovieDetailsComponent } from './components/repertoire/movie-details/movie-details.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RepertoireComponent } from './components/repertoire/repertoire.component';
import { PriceListComponent } from './components/price-list/price-list.component';
import { SpecialOffersComponent } from './components/special-offers/special-offers.component';
import { BestComponent } from './components/best/best.component';

const routes: Routes = [
    {path: '', redirectTo: '/best', pathMatch: 'full'},
    {path: 'best', component: BestComponent},
    {path: 'repertoire', component: RepertoireComponent},
    {path: 'movies/:id', component: MovieDetailsComponent},
    {path: 'orders', component: OrderTicketComponent},
    {path: 'price-list', component: PriceListComponent},
    {path: 'special-offers', component: SpecialOffersComponent, children: [
        {path: 'for-school', component: ForSchoolComponent},
        {path: 'for-company', component: ForCompanyComponent},
        {path: 'cheap-wednesday', component: CheapWednesdayComponent},
        {path: 'horrors-night', component: HorrorNightComponent},
        {path: 'classic-movies', component: ClassicMovieComponent},
    ]},
    {path: 'contact', component: ContactComponent}
]

@NgModule({
    imports: [RouterModule.forRoot(routes, {anchorScrolling: 'enabled'})],
    exports: [RouterModule],
})

export class AppRoutingModule {}
