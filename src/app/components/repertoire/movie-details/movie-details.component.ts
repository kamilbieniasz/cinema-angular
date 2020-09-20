import { ServiceService } from './../../../services/service.service';
import { Hour } from './../../../interface/movieInterface';
import { MovieDetailsService } from './../../../services/movie-details.service';
import { Component, OnInit, Input } from '@angular/core';
import { Movie, Date } from '../../../interface/movieInterface';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {

  movie: Observable<Movie>;
  hours: Date;
  currentDay;
  selectedHour;

  constructor(private movieDetailsService: MovieDetailsService, private service: ServiceService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    //this.movie = this.movieDetailsService.currentMovie;
    this.currentDay = new Date(Date.parse(localStorage.getItem('currentDay')));
    console.log(this.currentDay);
    // this.hours.hours.forEach( (hour) => {
    //   console.log(hour.hour);
    // });
    const id = this.route.snapshot.paramMap.get('id');
    localStorage.setItem('currentMovieId', id);
    this.movie = this.service.getMovieById(id);
    this.movie.subscribe(data => console.log(data.date[0].hours[0].hour));
    this.selectedDay();
  }

  sendData(time: Hour): void{
    //this.movieDetailsService.time = time;
    localStorage.setItem('selectedTime', time.hour);
  }

  selectedDay(): void{
    console.log(this.currentDay.getDay());
    const currentData = new Date();
    this.movie.subscribe(data => data.date.forEach( data =>{
      console.log(data.day);
      if(data.day === this.currentDay.getDay()){
        this.hours = data;
        console.log(data);
      }
    }))
    this.movieDetailsService.hours = this.hours;
  }

  sendPlace(): void{
    this.movieDetailsService.place = this.hours.hours;
  }

}
