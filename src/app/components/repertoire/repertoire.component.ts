import { MovieDetailsService } from './../../services/movie-details.service';
import { Movie } from './../../interface/movieInterface';
import { ServiceService } from './../../services/service.service';
import { Component, OnInit } from '@angular/core';
import { preserveWhitespacesDefault } from '@angular/compiler';

@Component({
  selector: 'app-repertoire',
  templateUrl: './repertoire.component.html',
  styleUrls: ['./repertoire.component.scss'],
})
export class RepertoireComponent implements OnInit {
  movies: Movie[] = [];
  date: Date[] = [];
  dayName: string[] = ['Nd', 'Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'So'];
  monthName: string[] = ['Sty', 'Lut', 'Mar', 'Kwi', 'Maj', 'Cze', 'Lip', 'Sie', 'Wrz', 'Paź', 'Lis', 'Gru'];
  selectedItemId = 0;
  //currentMovie: Movie;

  constructor(private service: ServiceService, private movieDetailsService: MovieDetailsService) {}

  ngOnInit(): void {
    this.service.getJson().subscribe((data) => {
      console.log(data);
      this.movies = data.films;
    });
    console.log('films' + this.movies);
    this.day();
    console.log(this.date);
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

  sendMovie(currentMovie): void{
    console.log(currentMovie);
    this.movieDetailsService.setCurrentMovie(currentMovie);
  }

}
