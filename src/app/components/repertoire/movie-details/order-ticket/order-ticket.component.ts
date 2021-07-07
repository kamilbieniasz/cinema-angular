import { MovieService } from '../../../../services/movie.service';
import { Movie } from './../../../../interface/movieInterface';
import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';

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
  price: number;
  selectedDate;
  selectedTime;
  private movieID: string;
  errorMessage: string;
  places = [];
  selectedPlaces = [];
  modal = false;

  constructor(
    private service: MovieService,
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
        place.nativeElement.status === "true" ? place.nativeElement.classList.add('free') : place.nativeElement.classList.add('taken');
      });
    })
  }

  getPlaces() {
    const date = {
      date: this.selectedDate,
      time: this.selectedTime
    };

    this.service.getPlaces(this.movieID, date).subscribe(response => {
      this.places = response;
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

  // bookPlace(): void {
    // const date = {
    //   id: this.movieID,
    //   date: this.selectedDate,
    //   time: this.selectedTime,
    //   places: this.selectedPlaces
    // }

    // this.service.bookPlaces(date).subscribe();

    // this.ngOnInit();
    // this.selectedPlaces = [];

  //   this.openModal();
  // }

  openModal(): void{
    this.modal = true;
  }

  closeModal(): void{
    this.modal = false;
  }
}
