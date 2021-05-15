import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  hideAndShowMenu(): void{
    const navbar = document.querySelector('.navbar');
    const hamburgerBtn = document.querySelector('.hamburgerBtn');
    navbar.classList.toggle('showMenu');
    hamburgerBtn.classList.toggle('hamburgerBtnActive');
  }

  hideMenu(): void{
    const navbar = document.querySelector('.navbar');
    const hamburgerBtn = document.querySelector('.hamburgerBtn');
    navbar.classList.remove('showMenu');
    hamburgerBtn.classList.remove('hamburgerBtnActive');
  }
}
