import { Component } from '@angular/core';
import { hasClassName } from '@ng-bootstrap/ng-bootstrap/util/util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cinemaniak';

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
