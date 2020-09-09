import { Hour } from './../../../interface/movieInterface';
import { MovieDetailsService } from './../../../services/movie-details.service';
import { Component, OnInit, Input } from '@angular/core';
import { Movie, Date } from '../../../interface/movieInterface';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {

  movie: Movie;
  hours: Date;
  currentDay;
  selectedHour;

  constructor(private movieDetailsService: MovieDetailsService) { }

  ngOnInit(): void {
    this.movie = this.movieDetailsService.currentMovie;
    this.currentDay = this.movieDetailsService.curentDay;
    console.log(this.currentDay.getDay());
    this.selectedDay();
    this.hours.hours.forEach( (hour) => {
      console.log(hour.hour);
    });
  }

  sendData(time: Hour): void{
    this.movieDetailsService.time = time;
  }

  selectedDay(): void{
    this.movie.date.forEach( (date) =>{
      if(date.day === this.currentDay.getDay()){
        this.hours = date;
      }
    })
  }
  sendPlace(): void{
    this.movieDetailsService.place = this.hours.hours
  }

}
