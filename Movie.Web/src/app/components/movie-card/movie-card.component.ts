import { Component, Input, OnInit } from '@angular/core';
import { IMovie } from '../../models/movie';
import { ICategory } from '../../models/category';
import { IRating } from '../../models/rating';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent implements OnInit {
  @Input() movie!: IMovie;
  category!: ICategory;
  rating!: IRating;

  constructor() { }

  ngOnInit(): void {
    this.category = <ICategory>this.movie.categoryId;
    this.rating = <IRating>this.movie.ratingId;
  }
}
