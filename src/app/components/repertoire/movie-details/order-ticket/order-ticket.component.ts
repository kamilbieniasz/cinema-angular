import { MovieService } from '../../../../services/movie.service';
import {
  Movie,
  Hour,
  Date,
  Place,
} from './../../../../interface/movieInterface';
import { AfterViewInit, Component, OnInit, QueryList, ViewChildren } from '@angular/core';
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

export class OrderTicketComponent implements OnInit, AfterViewInit {
  @ViewChildren('place') placesNode:QueryList<any>

  movie: Movie;
  time: Hour;
  hours: Date;
  itemNumber: number;
  currentDay;
  private movieID: string;
  errorMessage
  places;


  constructor(
    private service: MovieService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    this.movieID = localStorage.getItem('currentMovieId');
    await this.service.getMovieById(this.movieID).toPromise().then( response => {this.movie = response}, err => {this.errorMessage = err }); 
    // console.log(this.movie);

    this.getPlaces();
    // console.log(this.placesNode);

    // this.placesNode.toArray().forEach(place => {
    //   console.log(place);
    // })
  }

  async ngAfterViewInit(): Promise<void> {
    this.placesNode.changes.subscribe(places => {
      places.map(place => {
        console.log(place.nativeElement.status)
        place.nativeElement.status === "true" ? place.nativeElement.classList.add('free') : place.nativeElement.classList.add('taken');
      });
    })
    
    // this.placesNode.toArray().forEach(place => {
    //   console.log(place);
    // })
  }

  getPlaces() {
    const date = {
      date: "2021-06-18",
      time: "21:00"
    };
    this.service.getPlaces(this.movieID, date).subscribe(response => {
      this.places = response;
    });
  }
}
