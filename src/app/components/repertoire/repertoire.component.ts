import { Movie } from './../../interface/movieInterface';
import { MovieDetailsService } from './../../services/movie-details.service';
import { ServiceService } from './../../services/service.service';
import { Component, OnInit } from '@angular/core';
import { preserveWhitespacesDefault } from '@angular/compiler';

@Component({
  selector: 'app-repertoire',
  templateUrl: './repertoire.component.html',
  styleUrls: ['./repertoire.component.scss'],
})
export class RepertoireComponent implements OnInit {
  dayNumber: number;
  currentDay = new Date().getDay();
  movies: Movie[] = [];
  currentMovie: Movie[] = [];
  date: Date[] = [];
  dayName: string[] = ['Nd', 'Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'So'];
  monthName: string[] = ['Sty', 'Lut', 'Mar', 'Kwi', 'Maj', 'Cze', 'Lip', 'Sie', 'Wrz', 'Paź', 'Lis', 'Gru'];
  selectedItemId = 0;

  constructor(private service: ServiceService, private movieDetailsService: MovieDetailsService) {}

  async ngOnInit() {
    // this.service.getJson().subscribe(data => {
    //   this.movies = data.films;
    // });
    // this.service.getJson().then((result)=> {
    //   this.movies = result.films;
    // });
    this.movies = await this.service.getJson();
    this.day();
    //console.log(this.movies);
    this.sortMovie();
    this.getDay(this.currentDay);
    //console.log(this.sortMovie());
    this.date.forEach( (date) =>{
      console.log(date.getDay());
    });
  }

  day(): void {
    for (let i = 0; i < 7; i++) {
      const nextDay = new Date();
      nextDay.setDate(nextDay.getDate() + i);
      this.date.push(nextDay);
    }
  }

  selectedItem(index): void{
    this.selectedItemId = index;
  }
  
  getDay(day): void{
    this.currentDay = day;
  }

  sendMovie(currentMovie): void{
    console.log(currentMovie);
    this.movieDetailsService.setCurrentMovie(currentMovie);
  }

  sortMovie(): void{
    console.log("aktualny dzien"+this.currentDay);
    console.log(this.date[this.currentDay].getDay());
    console.log(this.selectedItemId);
    this.currentMovie = [];
    // console.log(this.movies[3].date[0].day);
    // console.log(this.date[0].getDay());
    // if(this.movies[2].date[0].day === this.date[0].getDay()){
    //   return this.movies[2];
    // }else{
    //   console.log("false");
    // };
    this.movies.forEach( (movie) => {
      console.log("title: " + movie.title + " day 1: " + movie.date[0].day + " day 2: " + movie.date[1].day);
      if(movie.date[0].day === this.date[this.selectedItemId].getDay() || movie.date[1].day === this.date[this.selectedItemId].getDay()){
        this.currentMovie.push(movie);
      }
      else{
        return false;
      }
    })

    console.log(this.currentMovie);
  }

  changeCurrentDay(): void{
    this.movieDetailsService.curentDay = this.date[this.selectedItemId];
  }


}
