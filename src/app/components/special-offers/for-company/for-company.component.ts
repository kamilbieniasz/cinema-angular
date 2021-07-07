import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-for-company',
  templateUrl: './for-company.component.html',
  styleUrls: ['./for-company.component.scss'],
  host: {
    id: 'for-company',
    class: 'special-offer-section'
  }
})
export class ForCompanyComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
