import { DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { IMovie } from '../../../models/movie';
import { ColDef, GridReadyEvent, ValueGetterParams } from 'ag-grid-community';
import { IRating } from '../../../models/rating';
import { ICategory } from '../../../models/category';

@Component({
  selector: 'app-movie-grid-dialog',
  templateUrl: './movie-grid-dialog.component.html',
  styleUrls: ['./movie-grid-dialog.component.css']
})
export class MovieGridDialogComponent {
  movieDefs: ColDef[] = [
    {
      headerName: 'No.',
      maxWidth: 60,
      valueGetter: this.getRowIndex,
    },
    {
      field: 'name',
      maxWidth: 300,
      minWidth: 220,
    },
    {
      headerName: 'Category',
      maxWidth: 120,
      valueGetter: this.getCategoryName,
    },
  ];

  rating!: IRating;
  movieRows: IMovie[] = [];

  constructor(
    public dialogRef: MatDialogRef<MovieGridDialogComponent>,
    @Inject(DIALOG_DATA) public data: [IRating, IMovie[]]) {
    this.rating = data[0];
    this.movieRows = data[1];
  }

  onGridReady(params: GridReadyEvent<IMovie>) {
    
  }

  getRowIndex(params: ValueGetterParams) {
    return (params.node ? params.node.rowIndex ? params.node.rowIndex : 0 : 0) + 1;
  }

  getCategoryName(params: ValueGetterParams) {
    return ((params.data as IMovie).categoryId as ICategory).name;
  }
}
