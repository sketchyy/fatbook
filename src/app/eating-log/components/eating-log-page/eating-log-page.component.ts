import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { DishDialogMode } from 'src/app/shared/models/dishes';
import { Eating, EatingForm, LogDay } from 'src/app/shared/models/eatings';
import { EatingLogService } from 'src/app/shared/services/eating-log.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

import { EatingDialogComponent } from './../eating-dialog/eating-dialog.component';

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
        (eatingEdited)="onEatingEdit(logDay.id, $event)"
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
    private eatingLogService: EatingLogService,
    private notificationService: NotificationService,
    private spinner: NgxSpinnerService
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

  onAddClick() {
    let dialogRef = this.dialog.open(EatingDialogComponent, {
      position: {
        top: '50px',
      },
      maxWidth: '100vw',
    });

    dialogRef
      .afterClosed()
      .pipe(filter((result) => Boolean(result)))
      .subscribe((eatingForm: EatingForm) => {
        this.spinner.show();

        this.eatingLogService
          .addEatings(eatingForm)
          .then(() => {
            this.notificationService.showSuccess('Eating saved');
          })
          .catch(() => {
            this.notificationService.showFail(
              'Error while saving :( contact Andrey'
            );
          })
          .finally(() => {
            this.spinner.hide();
          });
      });
  }

  onEatingRemove(logDayId: string, eating: Eating) {
    //TODO notification + spinner
    this.eatingLogService.removeEating(logDayId, eating);
  }

  async onEatingEdit(logDayId: string, eatingId: string) {
    const updatedEating = await this.eatingLogService
      .getEatingById(logDayId, eatingId)
      .toPromise();

    let dialogRef = this.dialog.open(EatingDialogComponent, {
      position: {
        top: '100px',
      },
      data: {
        mode: DishDialogMode.Edit,
        eating: updatedEating,
      },
    });

    dialogRef
      .afterClosed()
      .pipe(filter((result) => Boolean(result)))
      .subscribe(async (eatingForm: EatingForm) => {
        await this.eatingLogService.removeEating(logDayId, updatedEating);
        await this.eatingLogService.addEatings(eatingForm);
      });
  }
}
