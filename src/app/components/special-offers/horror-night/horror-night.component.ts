import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-horror-night',
  templateUrl: './horror-night.component.html',
  styleUrls: ['./horror-night.component.scss'],
  host: {
    id: 'horrors-night',
    class: 'special-offer-section'
  }
})
export class HorrorNightComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
