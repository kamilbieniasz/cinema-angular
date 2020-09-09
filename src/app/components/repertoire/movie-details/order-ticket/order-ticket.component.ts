import { MovieDetailsService } from './../../../../services/movie-details.service';
import { Movie, Hour } from './../../../../interface/movieInterface';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-order-ticket',
  templateUrl: './order-ticket.component.html',
  styleUrls: ['./order-ticket.component.scss']
})
export class OrderTicketComponent implements OnInit {

  movie: Movie;
  time: Hour;
  status = false;

  constructor(private movieDetailsService: MovieDetailsService) { }

  ngOnInit(): void {
    this.movie = this.movieDetailsService.currentMovie;
    this.time = this.movieDetailsService.time;
    console.log(this.time.places);
  }

  changeStatus(){
    this.status = !this.status;
  }

}
