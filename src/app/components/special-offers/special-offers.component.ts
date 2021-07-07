import { LiteralMapEntry } from '@angular/compiler/src/output/output_ast';
import { Component, ElementRef, Host, HostListener, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-special-offers',
  templateUrl: './special-offers.component.html',
  styleUrls: ['./special-offers.component.scss'],
})
export class SpecialOffersComponent implements OnInit {
  forSchool = false;
  forCompanies = false;
  cheapWednesdays = false;
  horrorsNight = false;
  classic = false;

  fromMenu = false;

  constructor() {}


  ngOnInit(): void {
    const root = document.querySelector('app-special-offers > .scrollContainer')
    const sections = document.querySelectorAll('app-special-offers>main>.special-offer-section');
    const observer = new IntersectionObserver(this.callback, {threshold: 1.0})

    sections.forEach(section => {
      observer.observe(section);
    })
  }

  callback(entries, observer){
    entries.forEach(element => {
      if(element.intersectionRatio > 0.5){
        location.hash = element.target.id;
      }
    });
  }
}
