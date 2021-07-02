import { MovieService } from '../../../../services/movie.service';
import {
  Movie,
  Hour,
  Date,
  Place,
} from './../../../../interface/movieInterface';
import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
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
  @ViewChildren('place') placesNode:QueryList<ElementRef>

  movie: Movie;
  time: Hour;
  hours: Date;
  itemNumber: number;
  price: number;
  selectedDate;
  selectedTime;
  private movieID: string;
  errorMessage
  places = [];
  selectedPlaces = [];


  constructor(
    private service: MovieService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    this.movieID = localStorage.getItem('currentMovieId');
    await this.service.getMovieById(this.movieID).toPromise().then( response => {this.movie = response}, err => {this.errorMessage = err });

    this.selectedDate = new Date(localStorage.getItem('currentDay'));
    this.selectedTime = localStorage.getItem('selectedTime');
    this.getPlaces();

  }

  async ngAfterViewInit(): Promise<void> {
    this.placesNode.changes.subscribe(places => {
      places.map(place => {
        console.log(place.nativeElement.status)
        place.nativeElement.status === "true" ? place.nativeElement.classList.add('free') : place.nativeElement.classList.add('taken');
      });
    })
  }

  getPlaces() {
    const date = {
      // date: this.selectedDate.getFullYear() + "-" + this.selectedDate.getMonth() + "-" + this.selectedDate.getDate(),
      date: "2021-07-02",
      time: this.selectedTime
    };

    console.log(date)

    this.service.getPlaces(this.movieID, date).subscribe(response => {
      this.places = response;
      console.log(this.places)
    });
  }

  choosePlace(selectedPlace: number) {
    this.placesNode.forEach(place => {
      if(place.nativeElement.number == selectedPlace + 1){
        place.nativeElement.classList.toggle('selected');
        if(this.selectedPlaces.indexOf(place.nativeElement.number) === -1){
          this.selectedPlaces.push(place.nativeElement.number);
        } else {
          this.selectedPlaces.splice(this.selectedPlaces.indexOf(place.nativeElement.number), 1);
        }
      }
    });

    this.calculatePrice();
  }

  calculatePrice(): void {
    this.price = this.selectedPlaces.length * 35;
  }

  bookPlace(): void {
    const formattedDate = this.selectedDate.getFullYear() + "-" + this.selectedDate.getMonth() + "-" + this.selectedDate.getDate();

    const date = {
      id: this.movieID,
      date: "2021-06-03",
      time: this.selectedTime,
      places: this.selectedPlaces
    }

    console.log(date);
    this.service.bookPlace(date).subscribe(response => {
      console.log(response);
    });
  }
}
