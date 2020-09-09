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
      this.priceList = data.price;
      console.log(data.price.normalTicket);
    });
    //this.setPriceList();
    console.log(this.priceList);
  }

  setPriceList(): void{
    this.service.getPriceList().subscribe( (data) => {
      this.priceList = data.price[0];
      console.log(data.price[0].normalTicket);
    });
    console.log("Price list: " +this.priceList);
  }

}
