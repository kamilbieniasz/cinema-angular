import { ServiceService } from './../../../../services/service.service';
import { MovieDetailsService } from './../../../../services/movie-details.service';
import { Movie, Hour, Date, Place } from './../../../../interface/movieInterface';
import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';
import { Price } from 'src/app/interface/priceListInterface';


@Component({
  selector: 'app-order-ticket',
  templateUrl: './order-ticket.component.html',
  styleUrls: ['./order-ticket.component.scss']
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
  private places: Array<Place> =[];
  private takenPlaces: Place[];
  private takenPlaces2: Array<Place> = [];
  private selectedPlaces: Array<Place> = [];
  private MovieID: number;
  private dateCurrentMovie: Date[];
  private normalTicketPrice;
  private price;


  constructor(private movieDetailsService: MovieDetailsService, private service: ServiceService, private router: Router) { }

 ngOnInit(): void {
    // this.movie = this.movieDetailsService.currentMovie;
    // console.log(this.hours);

    const id = localStorage.getItem('currentMovieId');
    this.movie = this.service.getMovieById(id);
    this.currentDay = new Date( Date.parse(localStorage.getItem('currentDay')));
    console.log(this.currentDay.getDay());
    this.temp();
    this.movie.subscribe(movie => {
      this.places = movie.date[this.dateIndex].hours[this.timeIndex].places;
      this.takenPlaces2 = movie.date[this.dateIndex].hours[this.timeIndex].places;
      this.MovieID = movie.id;
      this.dateCurrentMovie = movie.date;
    });
    this.places.forEach(date=>{
      if(date.free === false){
        this.takenPlaces.push(date);
      }
    })
    this.offTakenPlace();
    console.log(this.currentDay);
    console.log("test: " + this.selectedTime);
    const interval = setInterval(() => {
      if(document.querySelectorAll('app-order-ticket > main > .Container > .gridContainer > ul > .place') !== null){
        this.offTakenPlace();
        clearInterval(interval);
      }
    }, 1000);

    this.service.getPriceList().subscribe(data =>{
      console.log(data);
      this.normalTicketPrice = data.normalTicket;
    });
    // this.time = this.movieDetailsService.time;
    // this.hours = this.movieDetailsService.hours;
    // console.log("time" + this.time);
    // console.log("hours" + this.hours);
  }

  selectedItem(item: number): void{
    this.itemNumber = item;
    console.log(this.places[item]);
    if(this.places[item].free){
        this.selectedPlaces.push(this.places[item]);
    }else{
      const index = this.selectedPlaces.indexOf(this.places[item]);
      this.selectedPlaces.splice(index, 1);
    }
    this.places[item].free = !this.places[item].free;
    console.log(this.selectedPlaces);
    this.priceCalculation();
  }

  temp(): void{
    this.movie.subscribe(data => {
      data.date.forEach( (value, key) => {
        if(value.day === this.currentDay.getDay()){
          this.dateIndex = key;
        }
      });
      data.date[this.dateIndex].hours.forEach((value, key) => {
        if(value.hour === this.selectedTime){
          this.timeIndex = key;
        }
      })
    });
  }

  offTakenPlace(): void{
    
      const liArr = document.querySelectorAll('app-order-ticket > main > .Container > .gridContainer > ul > .place');
      console.log(liArr);
      this.takenPlaces2.forEach((value, key) => {
        if(value.free === false){
          liArr[key].classList.add('taken-before');
        }
      });

    
    
    
    
  }

  patchItem(): void{
    // const temp: Place[] = [{number: this.itemNumber+1, free: false}];
    // const temp2: Hour[] = [{hour: '9:00', places: temp}];
    // const temp3: Date[] = [{day:1, hours: temp2}];
    this.dateCurrentMovie[this.dateIndex].hours[this.timeIndex].places = this.places;
    //const temp: Date[] = [{day: this.currentDay.getDay(), hours: [{hour: this.selectedTime, places: this.places}]}];
    const movie: Partial<Movie> = {
      id: this.MovieID,
      date: this.dateCurrentMovie
    }
    //console.log(temp);
    this.service.patchMovie(movie).subscribe();
    this.router.navigateByUrl('/best');
    //console.log(temp2);
  }

  priceCalculation(): void{

    this.price = this.normalTicketPrice * this.selectedPlaces.length;
  }



}
