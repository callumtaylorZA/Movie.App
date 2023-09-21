import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieGroupingComponent } from './movie-grouping.component';

describe('MovieGroupingComponent', () => {
  let component: MovieGroupingComponent;
  let fixture: ComponentFixture<MovieGroupingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MovieGroupingComponent]
    });
    fixture = TestBed.createComponent(MovieGroupingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
