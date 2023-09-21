import { Component, OnInit } from '@angular/core';
import { IMovie } from '../../models/movie';
import { MovieService } from '../../services/movie.service';
import { firstValueFrom } from 'rxjs';
import { LookupService } from '../../services/lookup.service';
import { ICategory } from '../../models/category';
import { IRating } from '../../models/rating';

@Component({
  selector: 'app-highest-rated',
  templateUrl: './highest-rated.component.html',
  styleUrls: ['./highest-rated.component.css']
})
export class HighestRatedComponent implements OnInit {
  movies: IMovie[] = [];
  movieCategories: ICategory[] = [];
  movieRatings: IRating[] = [];

  constructor(
    private movieService: MovieService,
    private lookupService: LookupService) { }

  ngOnInit(): void {
    this.getData().then(x => {
      this.movies = x;
    })
  }

  private async getData(): Promise<IMovie[]> {
    this.movieCategories = await firstValueFrom(this.lookupService.getCategories());
    this.movieRatings = await firstValueFrom(this.lookupService.getRatings());
    let movies = await firstValueFrom(this.movieService.getHighestRated());

    return movies.map(m => <IMovie>{
      id: m.id,
      name: m.name,
      categoryId: this.movieCategories.find(c => c.id === m.categoryId),
      ratingId: this.movieRatings.find(r => r.id == m.ratingId)
    });
  }
}
