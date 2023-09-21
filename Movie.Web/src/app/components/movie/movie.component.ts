import { Component, Injectable, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { IMovie } from '../../models/movie';
import { ColDef, GridApi, GridReadyEvent, ValueGetterParams } from 'ag-grid-community';
import { ICategory } from '../../models/category';
import { IRating } from '../../models/rating';
import { ButtonCellComponent } from '../button-cell/button-cell.component';
import { firstValueFrom } from 'rxjs';
import { LookupService } from '../../services/lookup.service';
import { Guid } from 'typescript-guid';
import { EditDialogComponent } from '../dialogs/edit-dialog/edit-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AddDialogComponent } from '../dialogs/add-dialog/add-dialog.component';
import { ColumnHeaderComponent } from '../column-header/column-header.component';
import { ConfirmationDialogComponent } from '../dialogs/confirmation-dialog/confirmation-dialog.component';

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
      maxWidth: 60,
      valueGetter: this.getRowIndex,
      headerComponentParams: {
        showIcon: false,
        label: "No."
      },
    },
    {
      field: 'name',
      maxWidth: 300,
      minWidth: 220,
      headerComponentParams: {
        showIcon: false,
        label: "Name"
      },
    },
    {
      headerName: 'Category',
      maxWidth: 120,
      headerComponentParams: {
        showIcon: false,
        label: "Category"
      },
      valueGetter: this.getCategoryName,
    },
    {
      headerName: 'Rating',
      maxWidth: 130,
      headerComponentParams: {
        showIcon: false,
        label: "Rating"
      },
      valueGetter: this.getRatingName,
    },
    {
      field: 'options',
      maxWidth: 170,
      headerComponentParams: {
        onAddMovie: () => { this.addMovie(); },
        showIcon: true,
        label: "Add " }, 
      cellRenderer: ButtonCellComponent,
      cellRendererParams: {
        onDeleteMovie: (id: Guid) => { this.deleteMovie(id); },
        onEditMovie: (id: Guid) => { this.editMovie(id); }
      }
    },
  ];

  public components: { [p: string]: any; } = { agColumnHeader: ColumnHeaderComponent, };

  movieRows: IMovie[] = [];

  constructor(
    private movieService: MovieService,
    private lookupService: LookupService,
    public addDialog: MatDialog,
    public editDialog: MatDialog,
    public confirmDialog: MatDialog) { }

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
    const rating = ((params.data as IMovie).ratingId as IRating);
    return `(${rating.id}) ${rating.name}`;
  }

  deleteMovie(id: Guid): void {
    const movieName = this.movieRows.find(x => x.id === id)?.name;

    const confirmDialog = this.confirmDialog.open(
      ConfirmationDialogComponent,
      { minWidth: '100px', data: ['Delete', `Are you sure you want to remove ${movieName}?`] });

    confirmDialog.afterClosed().subscribe(r => {
      if (r === true) {
        this.movieService.deleteMovie(id).subscribe(_ => {
          this.movieRows = this.movieRows.filter(m => m.id !== id);
          this.gridApi.setRowData(this.movieRows);
        });
      }
    });
  }

  editMovie(id: Guid): void {
    const movieIndex = this.movieRows.findIndex(m => m.id === id);
    const editDialog = this.editDialog.open(
      EditDialogComponent,
      { minWidth: '100px', data: [this.movieRows[movieIndex], this.movieCategories, this.movieRatings] });

    editDialog.afterClosed().subscribe(x => {
      if (x === false || x === undefined) {
        return;
      }

      this.movieRows[movieIndex] = x;
      this.gridApi.setRowData(this.movieRows);
    });
  }

  addMovie(): void {
    const addDialog = this.addDialog.open(
      AddDialogComponent,
      { minWidth: '100px', data: [this.movieCategories, this.movieRatings] });

    addDialog.afterClosed().subscribe(x => {
      if (x === false || x === undefined) {
        return;
      }

      this.movieRows.push({
        id: x.id,
        name: x.name,
        categoryId: <ICategory>this.movieCategories.find(c => c.id === x.categoryId),
        ratingId: <IRating>this.movieRatings.find(c => c.id === x.ratingId)
      });
      this.gridApi.setRowData(this.movieRows);
    })
  }

  onFilterTextBoxChanged() {
    this.gridApi.setQuickFilter(
      (document.getElementById('filter-text-box') as HTMLInputElement).value
    );
  }

  onDownload() {
    this.gridApi.exportDataAsCsv();
  }
}
