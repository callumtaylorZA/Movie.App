import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieGridDialogComponent } from './movie-grid-dialog.component';

describe('MovieGridDialogComponent', () => {
  let component: MovieGridDialogComponent;
  let fixture: ComponentFixture<MovieGridDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MovieGridDialogComponent]
    });
    fixture = TestBed.createComponent(MovieGridDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
