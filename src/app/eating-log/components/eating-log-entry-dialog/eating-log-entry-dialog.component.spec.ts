import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EatingLogEntryDialogComponent } from './eating-log-entry-dialog.component';

describe('EatingLogEntryDialogComponent', () => {
  let component: EatingLogEntryDialogComponent;
  let fixture: ComponentFixture<EatingLogEntryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EatingLogEntryDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EatingLogEntryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
