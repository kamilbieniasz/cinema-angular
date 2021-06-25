import { MovieService } from '../../../../services/movie.service';
import {
  Movie,
  Hour,
  Date,
  Place,
} from './../../../../interface/movieInterface';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-order-ticket',
  templateUrl: './order-ticket.component.html',
  styleUrls: ['./order-ticket.component.scss'],
  host: {
    class: 'contentWrapper',
  },
})
export class OrderTicketComponent implements OnInit {
  movie: Movie;
  time: Hour;
  hours: Date;
  itemNumber: number;
  currentDay;
  private movieID: string;
  errorMessage


  constructor(
    private service: MovieService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    this.movieID = localStorage.getItem('currentMovieId');
    await this.service.getMovieById(this.movieID).toPromise().then( response => {this.movie = response}, err => {this.errorMessage = err }); 
    console.log(this.movie);
  }
}
