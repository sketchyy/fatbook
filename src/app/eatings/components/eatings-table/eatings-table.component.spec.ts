import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EatingsTableComponent } from './eatings-table.component';

describe('EatingsTableComponent', () => {
  let component: EatingsTableComponent;
  let fixture: ComponentFixture<EatingsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EatingsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EatingsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
