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
  movies: Movie[] = [];
  currentMovies: Movie[] = [];
  date: Date[] = [];
  dayName: string[] = ['Nd', 'Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'So'];
  monthName: string[] = ['Sty', 'Lut', 'Mar', 'Kwi', 'Maj', 'Cze', 'Lip', 'Sie', 'Wrz', 'Paź', 'Lis', 'Gru'];
  selectedItemId = 0;
  errorMessage: string;

  constructor(private service: MovieService) { }

  ngOnInit(): void {
    this.service.getMovies().subscribe((response) => {
      this.movies = response;

      this.day();
      this.sortMovieForList();

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
