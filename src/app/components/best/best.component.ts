import { MovieDetailsService } from './../../services/movie-details.service';
import { ServiceService } from './../../services/service.service';
import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/interface/movieInterface';

@Component({
  selector: 'app-best',
  templateUrl: './best.component.html',
  styleUrls: ['./best.component.scss']
})
export class BestComponent implements OnInit {
  movies: Movie[] = [];
  best: Movie[] = [];
  latest: Movie[] = [];

  // images = [
  //   'https://ftmp.helios.pl/Get/file/mvpstr/4145/1419949354',
  //   'https://ftmp.helios.pl/Get/file/mvpstr/18573/1593790191',
  //   'https://ftmp.helios.pl/Get/file/mvpstr/19109/1596783601'
  // ];

  imagesBest = [];
  imagesLatest = [];

  constructor(private service: ServiceService, private movieDetailsService: MovieDetailsService) { }

  async ngOnInit() {
    this.movies = await this.service.getJson();
    console.log(this.movies);
    this.sortBestMovies();
    this.sortLatestsMovies();
    this.addBestImages();
    this.addLatestImages();
    console.log( typeof this.best[0].release_date);
    console.log(this.latest);
  }

  sortBestMovies(): void{
    this.best = this.movies.sort((a,b) => {
      return a.note - b.note;
    }).slice(0,3);
  }

  sortLatestsMovies(): void{
    this.latest = this.movies.sort((a,b) => {
      if(a.release_date < b.release_date){ return 1;}
      if(a.release_date > b.release_date){ return -1;}
    }).slice(0,3);
  }

  addBestImages(): void{
    this.best.forEach( (best) =>{
      this.imagesBest.push(best.cover);
    });
  }

  addLatestImages(): void{
    this.latest.forEach( (latest) =>{
      this.imagesLatest.push(latest.cover);
    })
  }

  sendMovie(currentMovie): void{
    console.log(currentMovie);
    this.movieDetailsService.setCurrentMovie(currentMovie);
  }

}
