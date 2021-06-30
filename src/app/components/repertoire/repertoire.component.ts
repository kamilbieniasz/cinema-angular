import { Movie } from './../../interface/movieInterface';
import { MovieService } from '../../services/movie.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-repertoire',
  templateUrl: './repertoire.component.html',
  styleUrls: ['./repertoire.component.scss'],
  host: {
    class: 'contentWrapper'
  },
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
  errorMessage: string;

  isLoading = true;

  constructor(
    private service: MovieService
  ) { }

  ngOnInit(): void {
    this.service.getMovies().subscribe((response) => {
      this.movies = response;
      this.isLoading = false;

      this.day();
      // this.getDay(this.currentDay);
      this.sortMovieForList();

      console.log(this.date);
    });
  }

  // === handle current selected date ===
  selectedItem(index): void {
    this.selectedItemId = index;
  }

  day(): void {
    for (let i = 0; i < 7; i++) {
      const nextDay = new Date();
      nextDay.setDate(nextDay.getDate() + i);
      this.date.push(nextDay);
    }
  }

  // getDay(day): void {
  //   this.currentDay = day;
  // }

  sortMovieForList(): void {
    this.currentMovies = [];
    this.movies.forEach((movie) => {
      movie.date.forEach((date) => {
        if ( date.day === this.date[this.selectedItemId].getDay() ) {
          this.currentMovies.push(movie);
        } else {
          return false;
        }
      });
    });

    this.changeSelectedDay(this.selectedItemId);
  }

  sortMovieForSelect({ value }): void {
    const tab = value.split(',');
    const id = tab[0];
    // const date = new Date(Date.parse(tab[1]));
    // this.getDay(date.getDay());
    this.currentMovies = [];
    this.movies.forEach((movie) => {
      if (
        movie.date[0].day === this.date[id].getDay() ||
        movie.date[1].day === this.date[id].getDay()
      ) {
        this.currentMovies.push(movie);
      } else {
        return false;
      }
    });
    this.changeSelectedDay(id);
  }

  changeSelectedDay(index): void {
    this.service.currentDay = this.date[index];
    localStorage.setItem('currentDay', this.date[index].toString());
  }
}
