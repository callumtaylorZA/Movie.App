import { Component, OnInit } from '@angular/core';
import { IRating } from '../../models/rating';
import { ColDef, GridApi, GridReadyEvent, RowClickedEvent, ValueGetterParams } from 'ag-grid-community';
import { MovieService } from '../../services/movie.service';
import { LookupService } from '../../services/lookup.service';
import { firstValueFrom } from 'rxjs';
import { Guid } from 'typescript-guid';
import { IMovie } from '../../models/movie';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MovieGridDialogComponent } from '../dialogs/movie-grid-dialog/movie-grid-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ICategory } from '../../models/category';

export interface IMovieCountByRating {
  rating: IRating;
  movieCount: number;
  movieIds: Guid[];
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
  movies: IMovie[] = [];
  categories: ICategory[] = [];

  constructor(
    private messageSnackBar: MatSnackBar,
    private movieGridDialog: MatDialog,
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
    this.categories = await firstValueFrom(this.lookupService.getCategories());
    this.movies = await firstValueFrom(this.movieService.getMovies());

    return ratings.map(m => {
      const selectedMovies = this.movies.filter(x => x.ratingId == m.id);

      return <IMovieCountByRating>
      {
        rating: m,
        movieCount: selectedMovies.length,
        movieIds: selectedMovies.map(x => x.id),
      }
    });
  }

  getRowIndex(params: ValueGetterParams) {
    return (params.node ? params.node.rowIndex ? params.node.rowIndex : 0 : 0) + 1;
  }

  getRatingName(params: ValueGetterParams) {
    const rating = ((params.data as IMovieCountByRating).rating);
    return `(${rating.id}) ${rating.name}`;
  }

  onRowClicked(event: RowClickedEvent<IMovieCountByRating>) {
    if (<number>event.data?.movieCount === 0) {
      this.messageSnackBar.open(`No movies for ${event.data?.rating.name} rating.`, "close");
      return;
    }

    const movieGridDialog = this.movieGridDialog.open(
      MovieGridDialogComponent,
      {
        minWidth: '600px',
        minHeight: '400px',
        data: [event.data?.rating, this.movies
          .filter(x => event.data?.movieIds.some(y => y === x.id))
          .map(m => <IMovie>{ id: m.id, name: m.name, categoryId: this.categories.find(x => x.id === m.categoryId)})]
      });
  }
}
