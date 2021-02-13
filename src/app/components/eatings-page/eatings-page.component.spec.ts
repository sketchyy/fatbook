import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EatingsPageComponent } from './eatings-page.component';

describe('EatingsPageComponent', () => {
  let component: EatingsPageComponent;
  let fixture: ComponentFixture<EatingsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EatingsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EatingsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
