import { LogEating } from 'src/app/models/log-eating';
import { TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { filter, mergeMap, startWith } from 'rxjs/operators';
import { DishesService } from 'src/app/dishes/services/dishes.service';
import { Dish } from 'src/app/models/dish';
import * as moment from 'moment';

@Component({
  selector: 'cd-eating-dialog',
  templateUrl: './eating-dialog.component.html',
  styleUrls: ['./eating-dialog.component.scss'],
  providers: [TitleCasePipe],
})
export class EatingDialogComponent implements OnInit {
  formGroup: FormGroup;
  dishOptions$: Observable<Dish[]>;
  displayFn: Function;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EatingDialogComponent>,
    private dishesService: DishesService,
    private titleCasePipe: TitleCasePipe
  ) {}

  ngOnInit() {
    this.displayFn = this.display.bind(this);

    this.formGroup = this.fb.group({
      timestamp: moment(),
      dish: null,
      servingWeight: null,
    });

    this.dishOptions$ = this.formGroup.get('dish').valueChanges.pipe(
      startWith(''),
      filter((query) => typeof query === 'string'),
      mergeMap((query) => this.dishesService.findByName(query))
    );
  }

  onSubmit() {
    const logEating: LogEating = {
      timestamp: this.formGroup.value.timestamp.toDate().getTime(),
      dish: this.formGroup.value.dish,
      servingWeight: this.formGroup.value.servingWeight,
      totals: null
    };

    this.dialogRef.close(logEating);
  }

  display(dish: Dish): string {
    return dish && dish.name ? this.titleCasePipe.transform(dish.name) : '';
  }
}
