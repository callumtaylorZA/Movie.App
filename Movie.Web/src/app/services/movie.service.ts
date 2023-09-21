import { BASE_URL } from 'src/app/constants';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { IMovie } from '../models/movie';
import { Observable, catchError, of } from 'rxjs';
import { Guid } from 'typescript-guid';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private url = `${BASE_URL}/movies`;

  constructor(private httpClient:HttpClient) { }

  getMovies(): Observable<IMovie[]> {
    return this.httpClient.get<IMovie[]>(this.url);
  }

  deleteMovie(id: Guid): Observable<any> {
    return this.httpClient.delete(`${this.url}/${id.toString()}`);
  }

  updateMovie(movie: IMovie): Observable<IMovie> {
    return this.httpClient.put<IMovie>(`${this.url}`, movie);
  }

  addMovie(movie: IMovie): Observable<IMovie> {
    return this.httpClient.post<IMovie>(`${this.url}`, movie);
  }

  getHighestRated(): Observable<IMovie[]> {
    return this.httpClient.get<IMovie[]>(`${this.url}/highest-rating`);
  }
}
