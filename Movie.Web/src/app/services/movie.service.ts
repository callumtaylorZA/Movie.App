import { BASE_URL } from 'src/app/constants';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Movie } from '../models/movie';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private url = `${BASE_URL}/movies`;

  constructor(private httpClient:HttpClient) { }

  getMovies(): Observable<Movie[]> {
    return this.httpClient.get<Movie[]>(this.url);
  }
}
