import { MovieService } from '../../../services/movie.service';
import { Hour } from './../../../interface/movieInterface';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Movie, Date } from '../../../interface/movieInterface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
  host: {
    class: 'contentWrapper',
  },
})
export class MovieDetailsComponent implements OnInit {
  movie: Movie;
  date: Date;
  hoursForCurrentDay = [];
  currentDay: globalThis.Date;
  private id: string;
  errorMessage: string;
  trailer = false;

  constructor(private service: MovieService, private route: ActivatedRoute) {}

  async ngOnInit(): Promise<void> {
    this.currentDay = new Date(Date.parse(localStorage.getItem('currentDay')));
    this.id = this.route.snapshot.paramMap.get('id');
    localStorage.setItem('currentMovieId', this.id);
    await this.service.getMovieById(this.id).toPromise().then( response => {this.movie = response}, err => {this.errorMessage = err });
    this.selectedDay()
    this.hoursValidation();
  }

  saveData(time: Hour): void {
    localStorage.setItem('selectedTime', time.hour);
  }

  selectedDay(): void {
    this.movie.date.forEach((date) => {
      if(date.day === this.currentDay.getDay()) {
        this.date = date;
      }
    })
  }

  hoursValidation(): void {
    const currentDate = new Date();
    if (this.currentDay.getDate() === currentDate.getDate() && this.currentDay.getMonth() === currentDate.getMonth()) {
      this.date.hours.forEach((hour) => {
        const splitHour = hour.hour.split(":");
        const currentHour = new Date().setHours(parseInt(splitHour[0]), parseInt(splitHour[1]), 0);
        if(new Date(currentHour).getTime() - 30 * 60000 > this.currentDay.getTime()){
          this.hoursForCurrentDay.push(hour)
        }
      });
    } else {
      this.date.hours.forEach((hour) => {
        this.hoursForCurrentDay.push(hour);
      });
    }
  }

  openTrailer(): void {
    this.trailer = true;
  }

  closeTrailer(): void {
    this.trailer = false;
  }
}
