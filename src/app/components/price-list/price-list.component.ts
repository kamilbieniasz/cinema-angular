import { PricesService } from './../../services/prices.service';
import { MovieService } from '../../services/movie.service';
import { Component, OnInit } from '@angular/core';
import { Price } from 'src/app/interface/priceListInterface';

@Component({
  selector: 'app-price-list',
  templateUrl: './price-list.component.html',
  styleUrls: ['./price-list.component.scss'],
  host: {
    class: 'contentWrapper'
  }
})
export class PriceListComponent implements OnInit {
  priceList: Price[] = [];
  errorMessage: string;

  constructor(private service: PricesService) {}

  ngOnInit(): void {
    this.service.getPriceList().subscribe(
      (data) => {
        this.priceList = data;
      },
      (err: string) => (this.errorMessage = err)
    );
  }
}
