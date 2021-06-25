import { ServiceService } from './../../services/service.service';
import { Component, OnInit } from '@angular/core';
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
  bestMovies: Movie[] = null;
  latestMovies: Movie[] = null;
  errorMessage: string;

  // isLoading = false;

  constructor(
    private service: ServiceService,
  ) {}

  async ngOnInit(): Promise<void> {
        this.getBestThreeMovies();
        this.sortLatestsMovies();
  }

  getBestThreeMovies(): void {
    this.service.getBestThreeMovies().subscribe(best => {
      this.bestMovies = best;
    });
  }

  sortLatestsMovies(): void {
    this.service.getLastThreeMovies().subscribe(last => {
      this.latestMovies = last;
    });
  }
}
