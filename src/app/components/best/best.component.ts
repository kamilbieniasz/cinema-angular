import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-best',
  templateUrl: './best.component.html',
  styleUrls: ['./best.component.scss']
})
export class BestComponent implements OnInit {

  images = [
    'https://ftmp.helios.pl/Get/file/mvpstr/4145/1419949354',
    'https://ftmp.helios.pl/Get/file/mvpstr/18573/1593790191',
    'https://ftmp.helios.pl/Get/file/mvpstr/19109/1596783601'
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
