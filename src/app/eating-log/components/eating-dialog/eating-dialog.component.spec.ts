import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EatingDialogComponent } from './eating-dialog.component';

describe('EatingDialogComponent', () => {
  let component: EatingDialogComponent;
  let fixture: ComponentFixture<EatingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EatingDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EatingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
