import { Movie } from './../interface/movieInterface';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private url = './assets/cinema-db.json';

  films: Movie[] = [];

  constructor(private http: HttpClient) { }

  public getJson(): Observable<any>{
    return this.http.get(this.url);
  }
}
