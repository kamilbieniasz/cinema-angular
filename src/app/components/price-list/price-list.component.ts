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

  isLoading = true;

  constructor(private service: MovieService) {}

  ngOnInit(): void {
    this.service.getPriceList().subscribe(
      (data) => {
        console.log(data)
        this.priceList = data;
        this.isLoading = false;
      },
      (err: string) => (this.errorMessage = err)
    );
  }
}
