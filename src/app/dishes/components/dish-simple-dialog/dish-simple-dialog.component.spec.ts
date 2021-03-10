import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DishSimpleDialogComponent } from './dish-simple-dialog.component';

describe('DishSimpleDialogComponent', () => {
  let component: DishSimpleDialogComponent;
  let fixture: ComponentFixture<DishSimpleDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DishSimpleDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DishSimpleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
