import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PricesService {
  private url = 'https://cinemaniak-db.herokuapp.com/api';

  constructor(private http: HttpClient) { }

  getPriceList(): Observable<any> {
    return this.http.get(this.url + '/prices').pipe(catchError(this.handleError));
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
