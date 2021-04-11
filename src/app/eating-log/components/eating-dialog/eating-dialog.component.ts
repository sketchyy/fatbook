import { TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { filter, mergeMap, startWith, debounceTime } from 'rxjs/operators';
import { Dish } from 'src/app/shared/models/dishes';
import { EatingForm } from 'src/app/shared/models/eatings';
import { DishesService } from 'src/app/shared/services/dishes.service';

@Component({
  selector: 'cd-eating-dialog',
  templateUrl: './eating-dialog.component.html',
  styleUrls: ['./eating-dialog.component.scss'],
  providers: [TitleCasePipe],
})
export class EatingDialogComponent implements OnInit {
  formGroup: FormGroup;

  get dishes(): FormArray {
    return this.formGroup.get('dishes') as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EatingDialogComponent>
  ) {}

  ngOnInit() {
    this.formGroup = this.fb.group({
      timestamp: moment(),
      dishes: this.fb.array([]),
    });

    this.addDish();
  }

  addDish() {
    const newDishGroup = this.fb.group({
      dish: null,
      servingSize: null,
    });

    this.dishes.push(newDishGroup);
  }

  deleteDish(index: number) {
    this.dishes.removeAt(index);
  }

  onSubmit() {
    const eatingForm: EatingForm = {
      timestamp: this.formGroup.value.timestamp.toDate().getTime(),
      eatings: this.dishes.value,
    };

    this.dialogRef.close(eatingForm);
  }
}
