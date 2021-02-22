import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DishesPageComponent } from './dishes-page.component';

describe('DishesPageComponent', () => {
  let component: DishesPageComponent;
  let fixture: ComponentFixture<DishesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DishesPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DishesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
