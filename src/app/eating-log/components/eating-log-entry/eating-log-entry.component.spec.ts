import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EatingLogEntryComponent } from './eating-log-entry.component';

describe('EatingLogEntryComponent', () => {
  let component: EatingLogEntryComponent;
  let fixture: ComponentFixture<EatingLogEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EatingLogEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EatingLogEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
