import { Movie } from './../interface/movieInterface';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MovieDetailsService {

  currentMovie: Movie;

  constructor() { }

  setCurrentMovie(movie: Movie): void{
    this.currentMovie = movie;
  }
}
