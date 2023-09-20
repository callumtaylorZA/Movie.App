import { DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { IMovie } from '../../../models/movie';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ICategory } from '../../../models/category';
import { IRating } from '../../../models/rating';
import { MovieService } from '../../../services/movie.service';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent {
  nameControl = new FormControl('', [Validators.required]);
  categoryControl = new FormControl<ICategory>(<ICategory>{}, [Validators.required]);
  ratingControl = new FormControl<IRating>(<IRating>{}, [Validators.required]);

  categories: ICategory[];
  ratings: IRating[];

  private movie: IMovie;

  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(DIALOG_DATA) public data: [IMovie, ICategory[], IRating[]],
    private movieService: MovieService) {

    this.movie = data[0];
    this.categories = data[1];
    this.ratings = data[2];
    this.nameControl.setValue((data[0].name));
    this.categoryControl.setValue(<ICategory>data[0].categoryId);
    this.ratingControl.setValue(<IRating>data[0].ratingId);
  };

  save(): void {
    this.movie.name = this.nameControl.value ? this.nameControl.value : this.movie.name;
    this.movie.categoryId = this.categoryControl.value?.id ? this.categoryControl.value : this.movie.categoryId;
    this.movie.ratingId = this.ratingControl.value?.id ? this.ratingControl.value : this.movie.ratingId;

    this.movieService.updateMovie({
      id: this.movie.id,
      name: this.movie.name,
      categoryId: (<ICategory>this.movie.categoryId).id,
      ratingId: (<IRating>this.movie.ratingId).id
    }).subscribe(() => {
      this.dialogRef.close(this.movie);
    });
  }
}
