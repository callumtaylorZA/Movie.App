import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MovieService } from '../../../services/movie.service';
import { ICategory } from '../../../models/category';
import { IRating } from '../../../models/rating';
import { DIALOG_DATA } from '@angular/cdk/dialog';
import { IMovie } from '../../../models/movie';
import { FormControl, Validators } from '@angular/forms';
import { catchError, of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css']
})
export class AddDialogComponent {
  nameControl = new FormControl('', [Validators.required]);
  categoryControl = new FormControl<ICategory>(<ICategory>{}, [Validators.required]);
  ratingControl = new FormControl<IRating>(<IRating>{}, [Validators.required]);

  categories: ICategory[];
  ratings: IRating[];

  constructor(public dialogRef: MatDialogRef<AddDialogComponent>,
    @Inject(DIALOG_DATA) public data: [ICategory[], IRating[]],
    private errorSnackBar: MatSnackBar,
    private movieService: MovieService) {
    this.categories = data[0];
    this.ratings = data[1];
  }

  canSave(): boolean {
    return this.nameControl.valid && this.categoryControl.valid && this.ratingControl.valid;
  }

  save(): void {
    if ((<ICategory>this.categoryControl.value).id === undefined) {
      this.categoryControl.setErrors({ 'invalid': true });
      this.categoryControl.markAsTouched();
    }

    if ((<IRating>this.ratingControl.value).id === undefined) {
      this.ratingControl.setErrors({ 'invalid': true });
      this.ratingControl.markAsTouched();
    }

    if (!this.nameControl.valid || !this.categoryControl.valid || !this.ratingControl.valid) {
      return;
    }

    const movie: IMovie = {
      id: null,
      name: <string>this.nameControl.value,
      categoryId: (<ICategory>this.categoryControl.value).id,
      ratingId: (<IRating>this.ratingControl.value).id
    };

    this.movieService.addMovie(movie)
      .pipe(catchError(error => {
        if (error.status === 400) {
          this.nameControl.setErrors({ 'invalid': true });
          this.errorSnackBar.open(error.error, "close");
        }

        return of(false);
      }))
      .subscribe(r => {
        if (r !== false) {
          this.dialogRef.close(r);
        }
    });
  }

  close(): void {
    this.dialogRef.close(false);
  }
}
