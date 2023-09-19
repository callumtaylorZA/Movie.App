import { Injectable } from '@angular/core';
import { ICategory } from '../models/category';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRating } from '../models/rating';
import { BASE_URL } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class LookupService {
  private url = `${BASE_URL}/lookups`;
  constructor(private httpClient: HttpClient) { }

  getCategories(): Observable<ICategory[]> {
    return this.httpClient.get<ICategory[]>(`${this.url}/categories`);
  }

  getRatings(): Observable<IRating[]> {
    return this.httpClient.get<IRating[]>(`${this.url}/ratings`);
  }
}
