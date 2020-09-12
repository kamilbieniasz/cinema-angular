import { OrderTicketComponent } from './components/repertoire/movie-details/order-ticket/order-ticket.component';
import { MovieDetailsComponent } from './components/repertoire/movie-details/movie-details.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RepertoireComponent } from './components/repertoire/repertoire.component';
import { PriceListComponent } from './components/price-list/price-list.component';
import { SpecialOffersComponent } from './components/special-offers/special-offers.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { BestComponent } from './components/best/best.component';

const routes: Routes = [
    {path: '', redirectTo: '/best', pathMatch: 'full'},
    {path: 'best', component: BestComponent},
    {path: 'repertoire', component: RepertoireComponent},
    {path: 'movie/:id', component: MovieDetailsComponent},
    {path: 'orders', component: OrderTicketComponent},
    {path: 'price-list', component: PriceListComponent},
    {path: 'special-offers', component: SpecialOffersComponent},
    {path: 'about-us', component: AboutUsComponent}
]

@NgModule({
    imports: [RouterModule.forRoot(routes, {anchorScrolling: 'enabled'})],
    exports: [RouterModule],
})

export class AppRoutingModule {}