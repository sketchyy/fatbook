import { EatingDialogComponent } from './../eating-dialog/eating-dialog.component';
import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { LogEating } from 'src/app/models/log-eating';

import { LogDay } from './../../../models/log-day';
import { EatingLogService } from './../../services/eating-log.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'cd-eating-log-page',
  template: ` <div class="page">
    <button pButton label="Add Eating" (click)="onAddClick()"></button>
    <button pButton label="Add Mocks" (click)="pushMocks()"></button>
    <div *ngFor="let logDay of logDays$ | async" class="mb2">
      <cd-eating-log-entry
        [logDay]="logDay"
        [eatings]="eatings$[logDay.id] | async"
        (eatingRemoved)="onEatingRemove(logDay.id, $event)"
      ></cd-eating-log-entry>
    </div>
  </div>`,
  styleUrls: ['./eating-log-page.component.scss'],
})
export class EatingLogPageComponent implements OnInit {
  logDays$: Observable<LogDay[]>;
  eatings$: Record<string, Observable<LogEating[]>> = {};

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
      height: '575px',
      width: '500px',
    });

    dialogRef
      .afterClosed()
      .pipe(filter((result) => Boolean(result)))
      .subscribe((result: any) => {
        this.eatingLogService.create(result);
      });
  }

  onEatingRemove(logDayId: string, eating: LogEating) {
    this.eatingLogService.removeEating(logDayId, eating);
  }
}
