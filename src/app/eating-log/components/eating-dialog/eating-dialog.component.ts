import { EatingForm } from './../../../models/log-eating';
import { Eating } from 'src/app/models/log-eating';
import { TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { filter, mergeMap, startWith } from 'rxjs/operators';
import { DishesService } from 'src/app/dishes/services/dishes.service';
import { Dish } from 'src/app/models/dish';
import * as moment from 'moment';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'cd-eating-dialog',
  templateUrl: './eating-dialog.component.html',
  styleUrls: ['./eating-dialog.component.scss'],
  providers: [TitleCasePipe],
})
export class EatingDialogComponent implements OnInit {
  formGroup: FormGroup;
  dishOptions: Observable<Dish[]>[];
  displayFn: Function;

  get dishes(): FormArray {
    return this.formGroup.get('dishes') as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EatingDialogComponent>,
    private dishesService: DishesService,
    private titleCasePipe: TitleCasePipe
  ) {}

  ngOnInit() {
    this.displayFn = this.display.bind(this);

    this.dishOptions = [];
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

    this.dishOptions.push(
      newDishGroup.get('dish').valueChanges.pipe(
        startWith(''),
        filter((query) => typeof query === 'string'),
        mergeMap((query) => this.dishesService.findByName(query))
      )
    );

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

  onDishSelected(
    event: MatAutocompleteSelectedEvent,
    dishControl: FormControl
  ) {
    const selectedDish: Dish = event.option.value;
    const servingSizeControl = dishControl.get('servingSize');

    if (
      servingSizeControl.value == null &&
      selectedDish.defaultServingSize != null
    ) {
      servingSizeControl.setValue(selectedDish.defaultServingSize);
    } else {
      servingSizeControl.setValue(null);
    }
  }

  display(dish: Dish): string {
    return dish && dish.name ? this.titleCasePipe.transform(dish.name) : '';
  }
}
