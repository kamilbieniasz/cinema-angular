import { ServiceService } from './../../services/service.service';
import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/interface/movieInterface';

@Component({
  selector: 'app-best',
  templateUrl: './best.component.html',
  styleUrls: ['./best.component.scss'],
})
export class BestComponent implements OnInit {
  movies: Movie[] = [];
  best: Movie[] = [];
  latest: Movie[] = [];
  errorMessage: string;
  imagesBest = [];
  imagesLatest = [];

  constructor(
    private service: ServiceService
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      this.movies = await this.service.getMovies();
    } catch {
      this.errorMessage = 'Something bad happend :( please try again later.';
    }
    this.sortBestMovies();
    this.sortLatestsMovies();
    this.addBestImages();
    this.addLatestImages();
  }

  sortBestMovies(): void {
    this.best = this.movies
      .sort((a, b) => {
        return a.note - b.note;
      })
      .slice(0, 3);
  }

  sortLatestsMovies(): void {
    this.latest = this.movies
      .sort((a, b) => {
        if (a.release_date < b.release_date) {
          return 1;
        }
        if (a.release_date > b.release_date) {
          return -1;
        }
      })
      .slice(0, 3);
  }

  addBestImages(): void {
    this.best.forEach((best) => {
      this.imagesBest.push(best.cover);
    });
  }

  addLatestImages(): void {
    this.latest.forEach((latest) => {
      this.imagesLatest.push(latest.cover);
    });
  }
}
