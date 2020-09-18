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
  movies: Movie[] = [];
  currentMovies: Movie[] = [];
  date: Date[] = [];
  dayName: string[] = ['Nd', 'Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'So'];
  monthName: string[] = ['Sty', 'Lut', 'Mar', 'Kwi', 'Maj', 'Cze', 'Lip', 'Sie', 'Wrz', 'Paź', 'Lis', 'Gru'];
  selectedItemId = 0;
  currentDay;

  constructor(private service: ServiceService, private movieDetailsService: MovieDetailsService) {}

  async ngOnInit() {
    // this.service.getJson().subscribe(data => {
    //   this.movies = data.films;
    // });
    // this.service.getJson().then((result)=> {
    //   this.movies = result.films;
    // });
    this.movies = await this.service.getMovies();
    this.day();
    //console.log(this.movies);
    this.getDay(this.currentDay);
    this.sortMovieForList();
    //this.sortMovieForSelect();
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
    console.log(this.date[0].getDay())
  }

  selectedItem(index): void{
    console.log(index);
    this.selectedItemId = index;
  }
  
  getDay(day): void{
    this.currentDay = day;
    console.log(day);
    console.log(this.currentDay);

  }

  sendMovie(currentMovie): void{
    console.log(currentMovie);
    this.movieDetailsService.setCurrentMovie(currentMovie);
  }

  sortMovieForList(): void{
    console.log("aktualny dzien"+this.currentDay);
    console.log(this.selectedItemId);
    this.currentMovies = [];
    this.movies.forEach( (movie) => {
      console.log("title: " + movie.title + " day 1: " + movie.date[0].day + " day 2: " + movie.date[1].day);
      if(movie.date[0].day === this.date[this.selectedItemId].getDay() || movie.date[1].day === this.date[this.selectedItemId].getDay()){
        this.currentMovies.push(movie);
      }
      else{
        return false;
      }
    })

    this.changeCurrentDay(this.selectedItemId);
    console.log(this.currentMovies);
  }

  sortMovieForSelect({value}): void{
    // console.log("aktualny dzien"+this.currentDay);
    // console.log(value);
    // console.log("date: " + date);
    const tab = value.split(',');
    console.log(tab);
    const id = tab[0];
    const date = new Date(Date.parse(tab[1]));
    console.log(date.getDay());
    this.getDay( date.getDay());
    console.log(this.currentDay);
    
    // console.log(id);
    this.currentMovies = [];
    console.log(this.date[id].getDay());
    this.movies.forEach( (movie) => {
      console.log("title: " + movie.title + " day 1: " + movie.date[0].day + " day 2: " + movie.date[1].day);
      if(movie.date[0].day === this.date[id].getDay() || movie.date[1].day === this.date[id].getDay()){
        this.currentMovies.push(movie);
        console.log(this.currentMovies);
      }
      else{
        return false;
      }
    })

    this.changeCurrentDay(id);

  }

  changeCurrentDay(index): void{
    this.service.currentDay = this.date[index];
    localStorage.setItem('currentDay', this.date[index].toString());
  }


}
