import { ServiceService } from './../../../../services/service.service';
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
})
export class OrderTicketComponent implements OnInit {
  movie: Observable<Movie>;
  time: Hour;
  hours: Date;
  itemNumber: number;
  currentDay;
  private dateIndex: number;
  private timeIndex: number;
  private selectedTime = localStorage.getItem('selectedTime');
  private places: Array<Place> = [];
  private takenPlaces: Place[];
  private takenPlaces2: Array<Place> = [];
  private selectedPlaces: Array<Place> = [];
  private MovieID: number;
  private dateCurrentMovie: Date[];
  private normalTicketPrice;
  private price;
  private errorMessage: string;

  constructor(
    private service: ServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = localStorage.getItem('currentMovieId');
    this.movie = this.service.getMovieById(id);
    this.currentDay = new Date(Date.parse(localStorage.getItem('currentDay')));
    this.temp();
    this.movie.subscribe(
      (movie) => {
        this.places = movie.date[this.dateIndex].hours[this.timeIndex].places;
        this.takenPlaces2 =
          movie.date[this.dateIndex].hours[this.timeIndex].places;
        this.MovieID = movie.id;
        this.dateCurrentMovie = movie.date;
      },
      (err: string) => (this.errorMessage = err)
    );
    this.places.forEach((date) => {
      if (date.free === false) {
        this.takenPlaces.push(date);
      }
    });
    this.offTakenPlace();
    const interval = setInterval(() => {
      if (
        document.querySelectorAll(
          'app-order-ticket > main > .Container > .gridContainer > ul > .place'
        ) !== null
      ) {
        this.offTakenPlace();
        clearInterval(interval);
      }
    }, 1000);

    this.service.getPriceList().subscribe((data) => {
      this.normalTicketPrice = data.normalTicket;
    },
    (err: string) => (this.errorMessage = err)
    );
  }

  selectedItem(item: number): void {
    this.itemNumber = item;
    if (this.places[item].free) {
      this.selectedPlaces.push(this.places[item]);
    } else {
      const index = this.selectedPlaces.indexOf(this.places[item]);
      this.selectedPlaces.splice(index, 1);
    }
    this.places[item].free = !this.places[item].free;
    this.priceCalculation();
  }

  temp(): void {
    this.movie.subscribe((data) => {
      data.date.forEach((value, key) => {
        if (value.day === this.currentDay.getDay()) {
          this.dateIndex = key;
        }
      });
      data.date[this.dateIndex].hours.forEach((value, key) => {
        if (value.hour === this.selectedTime) {
          this.timeIndex = key;
        }
      });
    },
    (err: string) => (this.errorMessage = err)
    );
  }

  offTakenPlace(): void {
    const liArr = document.querySelectorAll(
      'app-order-ticket > main > .Container > .gridContainer > ul > .place'
    );
    this.takenPlaces2.forEach((value, key) => {
      if (value.free === false) {
        liArr[key].classList.add('taken-before');
      }
    });
  }

  patchItem(): void {
    this.dateCurrentMovie[this.dateIndex].hours[
      this.timeIndex
    ].places = this.places;
    const movie: Partial<Movie> = {
      id: this.MovieID,
      date: this.dateCurrentMovie,
    };
    this.service
      .patchMovie(movie)
      .subscribe({ error: (err: string) => (this.errorMessage = err) });
    this.router.navigateByUrl('/best');
  }

  priceCalculation(): void {
    this.price = this.normalTicketPrice * this.selectedPlaces.length;
  }
}
