import { ServiceService } from './../../services/service.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/interface/movieInterface';

@Component({
  selector: 'app-best',
  host: {
    class: 'contentWrapper'
  },
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

  isLoading = true;

  constructor(
    private service: ServiceService,
    private cdref: ChangeDetectorRef
  ) {}

  async ngOnInit(): Promise<void> {
      this.service.getMovies().subscribe( (response) => {
        this.movies = response;
        console.log(response);
        this.isLoading = false;
        this.sortBestMovies();
        this.sortLatestsMovies();
        this.addBestImages();
        this.addLatestImages();
      })

   
   
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
