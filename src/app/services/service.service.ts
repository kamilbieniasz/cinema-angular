import { Movie } from 'src/app/interface/movieInterface';
import { Price } from 'src/app/interface/priceListInterface';
import { Date } from 'src/app/interface/movieInterface';
import { Injectable } from '@angular/core';
import { fromEventPattern, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private url = 'https://cinemaniak-db.herokuapp.com';
  currentDay;

  constructor(private http: HttpClient) { }

  // public getJson(): Observable<any>{
  //   return this.http.get(this.urlMovie);
  // }

  // getJson(): Promise<any>{
  //   return this.http.get(this.urlMovie)
  //   .toPromise()
  //   .then(response => response);
  // }

  async getMovies(): Promise<Movie[]>{
    const response = await this.http.get<any>(this.url + '/movies').toPromise();
    return response;
  }

  getMovieById(id: string): Observable<Movie>{
    return this.http.get<Movie>(this.url + '/movies/' + id)
    .pipe(catchError(this.handleError));

  }

  patchMovie(movie: Partial<Movie>): Observable<Partial<Movie>>{
    return this.http.patch(this.url + '/movies/' + movie.id, movie)
    .pipe(catchError(this.handleError));
  }

  public getPriceList(): Observable<any>{
    return this.http.get(this.url + '/price')
    .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse){
    console.error(
      `Name: ${error.name} \n` +
      `Message: ${error.message} \n` +
      `Returned code: ${error.status} \n`
    );
    return throwError('Something bad happend :( please try again later.');
  }
}
