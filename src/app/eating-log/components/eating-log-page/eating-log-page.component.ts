import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { LogEating } from 'src/app/models/log-eating';

import { LogDay } from './../../../models/log-day';
import { EatingLogService } from './../../services/eating-log.service';
import { EatingLogEntryDialogComponent } from './../eating-log-entry-dialog/eating-log-entry-dialog.component';

@Component({
  selector: 'cd-eating-log-page',
  templateUrl: './eating-log-page.component.html',
  styleUrls: ['./eating-log-page.component.scss'],
  providers: [DialogService],
})
export class EatingLogPageComponent implements OnInit {
  logDays$: Observable<LogDay[]>;
  eatings$: Record<string, Observable<LogEating[]>> = {};

  constructor(
    private dialogSerivce: DialogService,
    private eatingLogService: EatingLogService
  ) {}

  ngOnInit(): void {
    this.logDays$ = this.eatingLogService.getThisMonthDays()
    .pipe(
      tap(logDays => {
        logDays.forEach(day => {
          this.eatings$[day.id] = this.eatingLogService.getEatings(day.id);
        })
      })
    );
  }


  pushMocks() {
    this.eatingLogService.pushMocks();
  }

  onAddClick() {
    let dialogRef = this.dialogSerivce.open(EatingLogEntryDialogComponent, {
      // height: '575px',
      header: 'Add New Eating',
      width: '500px',
    });

    dialogRef.onClose
      .pipe(filter((result) => Boolean(result)))
      .subscribe((result: any) => {
        console.log('RESULT', result);

        this.eatingLogService.create(result);

        // this.dishesStorage.create(result);
      });
  }
}
