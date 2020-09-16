import { Movie, Hour } from './../interface/movieInterface';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MovieDetailsService {

  currentMovie: Movie;
  time: Hour;
  place;
  curentDay;
  hours

  constructor() { }

  setCurrentMovie(movie: Movie): void{
    this.currentMovie = movie;
  }
}
