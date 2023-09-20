import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MovieService } from '../../../services/movie.service';
import { ICategory } from '../../../models/category';
import { IRating } from '../../../models/rating';
import { DIALOG_DATA } from '@angular/cdk/dialog';
import { IMovie } from '../../../models/movie';
import { FormControl, Validators } from '@angular/forms';

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
    private movieService: MovieService) {
    this.categories = data[0];
    this.ratings = data[1];
  }

  save(): void {
    const movie: IMovie = {
      id: null,
      name: <string>this.nameControl.value,
      categoryId: (<ICategory>this.categoryControl.value).id,
      ratingId: (<IRating>this.ratingControl.value).id
    };

    this.movieService.addMovie(movie).subscribe(r => {
      this.dialogRef.close(r);
    });
  }
}
