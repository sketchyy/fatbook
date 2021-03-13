import { EatingForm, EatingInput } from './../../../models/log-eating';
import { EatingDialogComponent } from './../eating-dialog/eating-dialog.component';
import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { Eating } from 'src/app/models/log-eating';

import { LogDay } from './../../../models/log-day';
import { EatingLogService } from './../../services/eating-log.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'cd-eating-log-page',
  template: ` <div class="page">
    <div class="table-toolbar">
      <button mat-raised-button color="accent" (click)="onAddClick()">
        Add Eating
      </button>
    </div>
    <mat-accordion multi>
      <cd-eating-log-entry
        *ngFor="let logDay of logDays$ | async"
        [logDay]="logDay"
        [eatings]="eatings$[logDay.id] | async"
        (eatingRemoved)="onEatingRemove(logDay.id, $event)"
      ></cd-eating-log-entry>
    </mat-accordion>
  </div>`,
  styleUrls: ['./eating-log-page.component.scss'],
})
export class EatingLogPageComponent implements OnInit {
  logDays$: Observable<LogDay[]>;
  eatings$: Record<string, Observable<Eating[]>> = {};

  constructor(
    private dialog: MatDialog,
    private eatingLogService: EatingLogService
  ) {}

  ngOnInit(): void {
    this.logDays$ = this.eatingLogService.getThisMonthDays().pipe(
      tap((logDays) => {
        logDays.forEach((day) => {
          this.eatings$[day.id] = this.eatingLogService.getEatings(day.id);
        });
      })
    );
  }

  pushMocks() {
    this.eatingLogService.pushMocks();
  }

  onAddClick() {
    let dialogRef = this.dialog.open(EatingDialogComponent, {
      position: {
        top: '100px',
      },
    });

    dialogRef
      .afterClosed()
      .pipe(filter((result) => Boolean(result)))
      .subscribe((eatingForm: EatingForm) => {
        this.eatingLogService.addEatings(eatingForm);
      });
  }

  onEatingRemove(logDayId: string, eating: Eating) {
    this.eatingLogService.removeEating(logDayId, eating);
  }
}
