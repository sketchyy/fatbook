import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EatingLogPageComponent } from './eating-log-page.component';

describe('EatingLogPageComponent', () => {
  let component: EatingLogPageComponent;
  let fixture: ComponentFixture<EatingLogPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EatingLogPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EatingLogPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
