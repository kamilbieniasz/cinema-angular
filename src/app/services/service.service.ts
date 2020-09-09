import { Movie } from './../interface/movieInterface';
import { Price } from 'src/app/interface/priceListInterface';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private urlMovie = './assets/cinema-db.json';
  private urlPriceList = './assets/priceList-db.json';

  constructor(private http: HttpClient) { }

  // public getJson(): Observable<any>{
  //   return this.http.get(this.urlMovie);
  // }

  // getJson(): Promise<any>{
  //   return this.http.get(this.urlMovie)
  //   .toPromise()
  //   .then(response => response);
  // }

  async getJson(): Promise<Movie[]>{
    const response = await this.http.get<any>(this.urlMovie).toPromise();
    return response.movies;
  }

  public getPriceList(): Observable<any>{
    return this.http.get(this.urlPriceList);
  }
}
