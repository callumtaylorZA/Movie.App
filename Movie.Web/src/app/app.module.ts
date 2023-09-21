import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { AgGridModule } from 'ag-grid-angular';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { MovieComponent } from './components/movie/movie.component';
import { HeaderComponent } from './components/header/header.component';
import { ButtonComponent } from './components/button/button.component';
import { ButtonCellComponent } from './components/button-cell/button-cell.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditDialogComponent } from './components/dialogs/edit-dialog/edit-dialog.component';
import { AddDialogComponent } from './components/dialogs/add-dialog/add-dialog.component';
import { ColumnHeaderComponent } from './components/column-header/column-header.component';
import { ConfirmationDialogComponent } from './components/dialogs/confirmation-dialog/confirmation-dialog.component';
import { MovieGroupingComponent } from './components/movie-grouping/movie-grouping.component';

const appRoutes: Routes = [
  { path: '', component: MovieComponent },
  { path: 'group-by-rating', component: MovieGroupingComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    MovieComponent,
    HeaderComponent,
    ButtonComponent,
    ButtonCellComponent,
    EditDialogComponent,
    AddDialogComponent,
    ColumnHeaderComponent,
    ConfirmationDialogComponent,
    MovieGroupingComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AgGridModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDividerModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatSnackBarModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
