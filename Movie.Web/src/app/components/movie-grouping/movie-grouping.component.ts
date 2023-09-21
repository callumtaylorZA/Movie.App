import { Component, OnInit } from '@angular/core';
import { IRating } from '../../models/rating';
import { ColDef, GridApi, GridReadyEvent, ValueGetterParams } from 'ag-grid-community';
import { IMovie } from '../../models/movie';
import { MovieService } from '../../services/movie.service';
import { LookupService } from '../../services/lookup.service';
import { firstValueFrom } from 'rxjs';

export interface IMovieCountByRating {
  rating: IRating;
  movieCount: number;
}

@Component({
  selector: 'app-movie-grouping',
  templateUrl: './movie-grouping.component.html',
  styleUrls: ['./movie-grouping.component.css']
})

export class MovieGroupingComponent implements OnInit {
  private gridApi!: GridApi<IMovieCountByRating>;

  movieGroupDefs: ColDef[] = [
    {
      headerName: 'No.',
      maxWidth: 60,
      valueGetter: this.getRowIndex
    },
    {
      field: 'Rating',
      maxWidth: 300,
      valueGetter: this.getRatingName
    },
    {
      field: 'movieCount',
      maxWidth: 120,
    }
  ];

  movieGroupRows: IMovieCountByRating[] = [];

  constructor(
    private movieService: MovieService,
    private lookupService: LookupService) { }

  ngOnInit(): void { }

  onGridReady(params: GridReadyEvent<IMovieCountByRating>) {
    this.gridApi = params.api;
    this.getGridData().then(data => {
      this.movieGroupRows = data;
      this.gridApi.setRowData(data)
    });
  }

  private async getGridData(): Promise<IMovieCountByRating[]> {
    let ratings = await firstValueFrom(this.lookupService.getRatings());
    let movies = await firstValueFrom(this.movieService.getMovies());

    return ratings.map(m => <IMovieCountByRating>{
      rating: m,
      movieCount: movies.filter(x => x.ratingId == m.id).length
    });
  }

  getRowIndex(params: ValueGetterParams) {
    return (params.node ? params.node.rowIndex ? params.node.rowIndex : 0 : 0) + 1;
  }

  getRatingName(params: ValueGetterParams) {
    const rating = ((params.data as IMovieCountByRating).rating);
    return `(${rating.id}) ${rating.name}`;
  }
}
