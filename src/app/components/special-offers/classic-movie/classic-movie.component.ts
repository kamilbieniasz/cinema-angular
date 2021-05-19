import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-classic-movie',
  templateUrl: './classic-movie.component.html',
  styleUrls: ['./classic-movie.component.scss'],
  host: {
    id: 'classic-movies',
    class: 'special-offer-section'
  }
})
export class ClassicMovieComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
