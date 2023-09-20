import { Component } from '@angular/core';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { IHeaderAngularComp } from 'ag-grid-angular';
import { IHeaderParams } from 'ag-grid-community';

@Component({
  selector: 'app-column-header',
  templateUrl: './column-header.component.html',
  styleUrls: ['./column-header.component.css']
})
export class ColumnHeaderComponent implements IHeaderAngularComp {
  private params: any;
  faAdd = faAdd;
  label: string = "";
  showIcon: boolean = false;

  constructor() { }

  agInit(params: IHeaderParams<any, any>): void {
    this.params = params;
    this.label = this.params.label;
    this.showIcon = this.params.showIcon;
  }

  refresh(params: IHeaderParams<any, any>): boolean {
    return false;
  }

  btnClickedAdd(): void {
    this.params.onAddMovie();
  }
}
