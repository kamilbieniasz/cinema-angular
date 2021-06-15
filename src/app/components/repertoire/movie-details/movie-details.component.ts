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

  movie: Observable<Movie>;
  hours: Date;
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
    this.movie = this.service.getMovieById(this.id);
    this.service
      .getMovieById(this.id)
      .subscribe({ error: (err: string) => (this.errorMessage = err) });
    await this.selectedDay();
    this.hoursValidation();
  }

  sendData(time: Hour): void {
    localStorage.setItem('selectedTime', time.hour);
  }

  async selectedDay(): Promise<any> {
    await this.movie.toPromise().then((data) => {
      data.date.forEach((res) => {
        if (res.day === this.currentDay.getDay()) {
          this.hours = res;
        }
      });
    });
  }

  hoursValidation(): void {
    const currentDate = new Date();
    let afterSplitArray = [];
    let hour;
    let minute: number;
    if (
      this.currentDay.getDate() === currentDate.getDate() &&
      this.currentDay.getMonth() === currentDate.getMonth()
    ) {
      this.hours.hours.forEach((res) => {
        afterSplitArray = res.hour.split(':');
        afterSplitArray.forEach((value, key) => {
          if (key % 2 === 0) {
            hour = value;
            console.log(typeof value);
          } else {
            minute = value;
          }
        });
        hour = parseInt(hour, 10);
        if (
          hour > currentDate.getHours() ||
          (hour === currentDate.getHours() && minute > currentDate.getMinutes())
        ) {
          this.hoursForCurrentDay.push(res);
        }
      });
    } else {
      this.hours.hours.forEach((res) => {
        this.hoursForCurrentDay.push(res);
      });
    }
  }

  showTrailer(): void {
    this.trailerModal.nativeElement.classList.toggle('showTrailer');
  }

  closeTrailer(): void {
    const currentURL =
      this.trailerModal.nativeElement.children[0].getAttribute('src');
    this.trailerModal.nativeElement.children[0].setAttribute(
      'src',
      currentURL + '?enablejsapi=1'
    );
    this.trailerModal.nativeElement.classList.remove('showTrailer');
  }
}
