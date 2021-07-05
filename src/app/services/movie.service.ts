import { Movie } from 'src/app/interface/movieInterface';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private url = 'https://cinemaniak-db.herokuapp.com/api';
  currentDay: globalThis.Date;
  currentMovie: Movie;

  constructor(private http: HttpClient) {}

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.url + '/movies');
  }

  getBestThreeMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.url + '/best-three');
  }
  
  getLastThreeMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.url + '/last-three');
  }

  getMovieById(id: string): Observable<Movie> {
    return this.http.get<Movie>(this.url + '/movie/' + id).pipe(catchError(this.handleError));
  }

  getPlaces(id: string, date): Observable<any> {
    return this.http.post<any>(this.url + '/movie-places/' + id, date).pipe(catchError(this.handleError));
  }

  bookPlaces(date): Observable<any> {
    return this.http.post<any>(this.url + '/places', date).pipe(catchError(this.handleError));
  }

  public getPriceList(): Observable<any> {
    return this.http.get(this.url + '/price').pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.error(
      `Name: ${error.name} \n` +
        `Message: ${error.message} \n` +
        `Returned code: ${error.status} \n`
    );
    return throwError('Something bad happend :( please try again later.');
  }
}
