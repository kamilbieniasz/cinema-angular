import { ServiceService } from './../../services/service.service';
import { Component, OnInit } from '@angular/core';
import { Price } from 'src/app/interface/priceListInterface';

@Component({
  selector: 'app-price-list',
  templateUrl: './price-list.component.html',
  styleUrls: ['./price-list.component.scss']
})
export class PriceListComponent implements OnInit {

  priceList: Price[] = [];

  constructor(private service: ServiceService) { }

  ngOnInit(): void {
    this.service.getPriceList().subscribe( (data) => {
      this.priceList = data;
      console.log(data.normalTicket);
    });
    console.log(this.priceList);
  }

}
