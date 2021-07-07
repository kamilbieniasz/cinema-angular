import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @ViewChild('navbar') navbar: ElementRef;
  @ViewChild('hamburgerBtn') hamburgerBtn: ElementRef;

  hideAndShowMenu(): void{
    this.navbar.nativeElement.classList.toggle('showMenu');
    this.hamburgerBtn.nativeElement.classList.toggle('hamburgerBtnActive');
  }

  hideMenu(): void{
    // const navbar = document.querySelector('.navbar');
    // const hamburgerBtn = document.querySelector('.hamburgerBtn');
    this.navbar.nativeElement.classList.remove('showMenu');
    this.hamburgerBtn.nativeElement.classList.remove('hamburgerBtnActive');
  }
}
