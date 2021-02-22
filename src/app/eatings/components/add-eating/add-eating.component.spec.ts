import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEatingComponent } from './add-eating.component';

describe('AddEatingComponent', () => {
  let component: AddEatingComponent;
  let fixture: ComponentFixture<AddEatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEatingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
