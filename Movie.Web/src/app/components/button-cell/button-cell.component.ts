import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { IMovie } from '../../models/movie';
import { faEdit, faTimesSquare } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-button-cell',
  templateUrl: './button-cell.component.html',
  styleUrls: ['./button-cell.component.css']
})
export class ButtonCellComponent implements ICellRendererAngularComp {
  private params: any;
  faEdit = faEdit;
  faTimesSquare = faTimesSquare;
  data: IMovie = <IMovie>{};

  constructor() { }

  agInit(params: ICellRendererParams<IMovie, any, any>): void {
    this.params = params;
    this.data = <IMovie>params.data;
  }

  refresh(params: ICellRendererParams<IMovie, any, any>): boolean {
    console.log(params.data);
    return false;
  }

  btnClickedEdit(): void {
    this.params.onEditMovie((<IMovie>this.params.data).id);
  }

  btnClickedDelete(): void {
    this.params.onDeleteMovie((<IMovie>this.params.data).id);
  }
}
