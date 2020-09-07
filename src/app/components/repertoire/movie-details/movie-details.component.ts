import { MovieDetailsService } from './../../../services/movie-details.service';
import { Component, OnInit, Input } from '@angular/core';
import { Movie } from '../../../interface/movieInterface';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {

  movie: Movie;

  constructor(private movieDetailsService: MovieDetailsService) { }

  ngOnInit(): void {
    this.movie = this.movieDetailsService.currentMovie;
  }

}
