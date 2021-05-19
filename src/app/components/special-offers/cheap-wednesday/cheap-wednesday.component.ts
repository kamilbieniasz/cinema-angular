import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cheap-wednesday',
  templateUrl: './cheap-wednesday.component.html',
  styleUrls: ['./cheap-wednesday.component.scss'],
  host: {
    id: 'cheap-wednesday',
    class: 'special-offer-section'
  }
})
export class CheapWednesdayComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
