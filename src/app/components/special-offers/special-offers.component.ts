import { Component, OnInit } from '@angular/core';
import { ThrowStmt } from '@angular/compiler';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-special-offers',
  templateUrl: './special-offers.component.html',
  styleUrls: ['./special-offers.component.scss']
})
export class SpecialOffersComponent implements OnInit {

  forSchool = false;
  forCompanies = false;
  cheapWednesdays = false;
  horrorsNight = false;
  classic = false;

  constructor(private viewprotScroller: ViewportScroller) { }

  ngOnInit(): void {
  }

  changeFlagStatus(num: number): void{
    this.clearFlag();
    switch(num){
      case 0:
        this.forSchool = true;
        break;
      case 1:
        this.forCompanies = true;
        break;
      case 2:
        this.cheapWednesdays = true;
        break;
      case 3:
        this.horrorsNight = true;
        break;
      case 4:
        this.classic = true;
        break;
      default:
        console.log("incorrect value");
        break;
    }
  }
  clearFlag(): void{
    this.forSchool = false;
    this.forCompanies = false;
    this.cheapWednesdays = false;
    this.horrorsNight = false;
    this.classic = false;
  }

  scorllToElement(elementId: string): void{
    this.viewprotScroller.scrollToAnchor(elementId);
  }

  changeNavBar(): void{
    const navbar = document.querySelector('main > .navbar');
    if(scrollY > 117){
      navbar.classList.remove('normalNavBar');
      navbar.classList.add('navbarOnScroll');
    }
    else if(scrollY <117){
      navbar.classList.remove('navbarOnScroll')
      navbar.classList.add('normalNavBar');
    }
  }
}

