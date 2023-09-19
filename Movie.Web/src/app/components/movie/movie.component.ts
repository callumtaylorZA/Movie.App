import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { IMovie } from '../../models/movie';
import { ColDef, GridApi, GridReadyEvent, ValueGetterParams } from 'ag-grid-community';
import { ICategory } from '../../models/category';
import { IRating } from '../../models/rating';
import { ButtonCellComponent } from '../button-cell/button-cell.component';
import { firstValueFrom } from 'rxjs';
import { LookupService } from '../../services/lookup.service';
import { Guid } from 'typescript-guid';
import { Dialog } from "@angular/cdk/dialog";
import { EditDialogComponent } from '../dialogs/edit-dialog/edit-dialog.component';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})

export class MovieComponent implements OnInit {
  private gridApi!: GridApi<IMovie>;

  movieCategories: ICategory[] = [];
  movieRatings: IRating[] = [];

  movieDefs: ColDef[] = [
    {
      headerName: 'No.',
      maxWidth: 58,
      valueGetter: this.getRowIndex,
    },
    {
      field: 'name',
      maxWidth: 300,
      minWidth: 220
    },
    {
      headerName: 'Category',
      maxWidth: 120,
      valueGetter: this.getCategoryName,
    },
    {
      headerName: 'Rating',
      maxWidth: 120,
      valueGetter: this.getRatingName,
    },
    {
      field: 'options',
      maxWidth: 100,
      cellRenderer: ButtonCellComponent,
      cellRendererParams: {
        onDeleteMovie: (id: Guid) => { this.deleteMovie(id); },
        onEditMovie: (id: Guid) => { this.editMovie(id); }
      }
    },
  ];

  movieRows: IMovie[] = [];

  constructor(
    private movieService: MovieService,
    private lookupService: LookupService,
    public editDialog: Dialog) { }

  ngOnInit(): void { }

  onGridReady(params: GridReadyEvent<IMovie>) {
    this.gridApi = params.api;
    this.getGridData().then(data => {
      this.movieRows = data;
      this.gridApi.setRowData(data)
    })
  }

  private async getGridData(): Promise<IMovie[]> {
    this.movieCategories = await firstValueFrom(this.lookupService.getCategories());
    this.movieRatings = await firstValueFrom(this.lookupService.getRatings());
    let movies = await firstValueFrom(this.movieService.getMovies());

    return movies.map(m => <IMovie>{
      id:  m.id,
      name:  m.name,
      categoryId: this.movieCategories.find(c => c.id === m.categoryId),
      ratingId:  this.movieRatings.find(r => r.id == m.ratingId)
    });
  }

  getRowIndex(params: ValueGetterParams) {
    return (params.node ? params.node.rowIndex ? params.node.rowIndex: 0 : 0) + 1;
  }

  getCategoryName(params: ValueGetterParams) {
    return ((params.data as IMovie).categoryId as ICategory).name;
  }

  getRatingName(params: ValueGetterParams) {
    return ((params.data as IMovie).ratingId as IRating).name;
  }

  deleteMovie(id: Guid): void {
    this.movieService.deleteMovie(id).subscribe(_ => {
      this.movieRows = this.movieRows.filter(m => m.id !== id);
      this.gridApi.setRowData(this.movieRows);
    })
  }

  editMovie(id: Guid): void {
    const editDialog = this.editDialog.open(
      EditDialogComponent,
      { minWidth: '100px', data: this.movieRows.find(m => m.id === id) })
  }
}
