import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host: {
    class: 'contentWrapper'
  }
})
export class ContactComponent implements OnInit {


  constructor() { }

  ngOnInit(): void {
  }

}
