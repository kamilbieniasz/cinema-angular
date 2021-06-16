import { ServiceService } from './../../../services/service.service';
import { Hour } from './../../../interface/movieInterface';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Movie, Date } from '../../../interface/movieInterface';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
  host: {
    class: 'contentWrapper',
  },
})
export class MovieDetailsComponent implements OnInit {
  @ViewChild('trailerModal') trailerModal: ElementRef;

  movie: Movie;
  date: Date;
  hoursForCurrentDay = [];
  currentDay: globalThis.Date;
  selectedHour: any;
  private id: string;
  errorMessage: string;

  constructor(private service: ServiceService, private route: ActivatedRoute) {}

  async ngOnInit(): Promise<void> {
    this.currentDay = new Date(Date.parse(localStorage.getItem('currentDay')));
    this.id = this.route.snapshot.paramMap.get('id');
    localStorage.setItem('currentMovieId', this.id);
    await this.service.getMovieById(this.id).toPromise().then( response => {this.movie = response}, err => {this.errorMessage = err });
    this.selectedDay()
    this.hoursValidation();
  }

  sendData(time: Hour): void {
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

  showTrailer(): void {
    this.stopTrailer();
    this.trailerModal.nativeElement.classList.toggle('showTrailer');
  }

  closeTrailer(): void {
    this.stopTrailer();
    this.trailerModal.nativeElement.classList.remove('showTrailer');
  }

  stopTrailer(): void{
    const currentURL = this.trailerModal.nativeElement.children[0].getAttribute('src');
    this.trailerModal.nativeElement.children[0].setAttribute('src', currentURL + '?enablejsapi=1');
  }
}
