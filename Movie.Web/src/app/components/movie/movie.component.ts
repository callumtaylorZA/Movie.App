import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { Category } from '../../models/category';
import { Rating } from '../../models/rating';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})

export class MovieComponent implements OnInit {
  private gridApi!: GridApi<Movie>;

  movieCategories: Category[] = [];
  movieRatings: Rating[] = [];

  movieDefs: ColDef[] = [
    { field: 'name' },
    { field: 'category' },
    { field: 'rating' },
  ];

  movieRows: Movie[] | null = [];

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {

  }

  onGridReady(params: GridReadyEvent<Movie>) {
    this.gridApi = params.api;
    this.movieService.getMovies().subscribe(data => this.gridApi.setRowData(data));
  }
}
