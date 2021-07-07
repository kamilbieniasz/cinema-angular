import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-for-school',
  templateUrl: './for-school.component.html',
  styleUrls: ['./for-school.component.scss'],
  host: {
    id: 'for-school',
    class: 'special-offer-section'
  }
})
export class ForSchoolComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
