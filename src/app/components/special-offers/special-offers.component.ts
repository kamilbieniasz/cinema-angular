import { LiteralMapEntry } from '@angular/compiler/src/output/output_ast';
import { Component, ElementRef, Host, HostListener, OnInit } from '@angular/core';
import { faAngleDoubleUp } from '@fortawesome/free-solid-svg-icons';

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

  faAngleDoubleUp = faAngleDoubleUp;

  constructor() {}


  ngOnInit(): void {
    const components = document.querySelector('app-special-offers>main')
    const sections = document.querySelectorAll('app-special-offers>main>.special-offer-section');
    console.log(sections)
    const observer = new IntersectionObserver(this.callback, {root: null, threshold: .5})

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

  changeNavBar(): void {
    const navbar = document.querySelector('main > .navbar');
    if (scrollY > 117) {
      navbar.classList.remove('normalNavBar');
      navbar.classList.add('navbarOnScroll');
    } else if (scrollY < 117) {
      navbar.classList.remove('navbarOnScroll');
      navbar.classList.add('normalNavBar');
    }
  }
}
