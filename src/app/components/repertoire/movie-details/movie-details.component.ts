import { ServiceService } from './../../../services/service.service';
import { Hour } from './../../../interface/movieInterface';
import { MovieDetailsService } from './../../../services/movie-details.service';
import { Component, OnInit, Input } from '@angular/core';
import { Movie, Date } from '../../../interface/movieInterface';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ThrowStmt } from '@angular/compiler';
import { NoopAnimationPlayer } from '@angular/animations';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent implements OnInit {
  movie: Observable<Movie>;
  hours: Date;
  hoursForCurrentDay = [];
  currentDay;
  selectedHour;

  constructor(
    private movieDetailsService: MovieDetailsService,
    private service: ServiceService,
    private route: ActivatedRoute
  ) {}

  async ngOnInit(): Promise<void> {
    //this.movie = this.movieDetailsService.currentMovie;
    this.currentDay = new Date(Date.parse(localStorage.getItem('currentDay')));
    console.log(this.currentDay);
    // this.hours.hours.forEach( (hour) => {
    //   console.log(hour.hour);
    // });
    const id = this.route.snapshot.paramMap.get('id');
    localStorage.setItem('currentMovieId', id);
    this.movie = this.service.getMovieById(id);
    this.movie.subscribe((data) => console.log(data.date[0].hours[0].hour));
    await this.selectedDay();
    console.log(this.hours);
    this.hoursValidation();
  }

  sendData(time: Hour): void {
    //this.movieDetailsService.time = time;
    localStorage.setItem('selectedTime', time.hour);
  }

  async selectedDay(): Promise<any>{
    console.log(this.currentDay);
    console.log(this.currentDay.getDay());
    await this.movie.toPromise().then(data =>{
      data.date.forEach(res => {
        if(res.day === this.currentDay.getDay()){
          this.hours = res;
        }
      });
    });
  }

  hoursValidation(): void{
    const currentDate = new Date();
    let afterSplitArray = [];
    let hour;
    let minute;
    if(this.currentDay.getDate() === currentDate.getDate() && this.currentDay.getMonth() === currentDate.getMonth()){
        this.hours.hours.forEach(res =>{
          afterSplitArray = res.hour.split(':');
          afterSplitArray.forEach((value,key) =>{
            if(key%2===0){
              hour = value;
              console.log("hour" + hour);
            }
            else{
              minute = value;
              console.log("minute" + minute);
            }
          })
          hour = parseInt(hour, 10);
          if(hour > currentDate.getHours() || hour === currentDate.getHours() && minute > currentDate.getMinutes()){
            this.hoursForCurrentDay.push(res);
          }
        })
    }
    else{
      this.hours.hours.forEach(res =>{
        this.hoursForCurrentDay.push(res);
      })
    }

  }

  sendPlace(): void {
    this.movieDetailsService.place = this.hours.hours;
  }

  showTrailer(): void{
    const trailer = document.querySelector('app-movie-details>.movieDetailsContainer>.trailerScreen');
    trailer.classList.toggle('showTrailer');
  }

  closeTrailer(): void{
    const trailer = document.querySelector('app-movie-details>.movieDetailsContainer>.trailerScreen');
    const iframe = document.querySelector('app-movie-details>.movieDetailsContainer>.trailerScreen>iframe');
    const currentURL = iframe.getAttribute('src');
    iframe.setAttribute('src', currentURL + '?enablejsapi=1');
    trailer.classList.remove('showTrailer');
  }
}
