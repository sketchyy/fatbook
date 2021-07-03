import { TitleCasePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';
import { DishDialogMode } from 'src/app/shared/models/dishes';
import { Eating, EatingForm } from 'src/app/shared/models/eatings';

@Component({
  selector: 'cd-eating-dialog',
  templateUrl: './eating-dialog.component.html',
  styleUrls: ['./eating-dialog.component.scss'],
  providers: [TitleCasePipe],
})
export class EatingDialogComponent implements OnInit {
  formGroup: FormGroup;
  title: string;
  okButtonText: string;

  get tmpDish(): boolean {
    return this.formGroup.get('tmpDish').value as boolean;
  }

  get tmpDishName(): string {
    return this.formGroup.get('tmpDishName').value as string;
  }

  get dishes(): FormArray {
    return this.formGroup.get('dishes') as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EatingDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    private data: { mode: DishDialogMode; eating: Eating }
  ) {}

  ngOnInit() {
    if (this.isEdit()) {
      this.title = 'Modify Eating';
      this.okButtonText = 'Save';

      const initialValue = this.data.eating;

      this.formGroup = this.fb.group({
        timestamp: moment(initialValue.timestamp),
        dishes: this.fb.array([]),
        tmpDish: initialValue.tmpDish,
        tmpDishName: initialValue.tmpDishName,
      });

      if (initialValue.tmpDish) {
        initialValue.dish.ingredients.forEach((ingredient, i) => {
          this.addDish();

          this.dishes.at(i).get('dish').setValue(ingredient.dish);
          this.dishes.at(i).get('servingSize').setValue(ingredient.servingSize);
        })
      } else {
        this.addDish();

        this.dishes.at(0).get('dish').setValue(initialValue.dish);
        this.dishes.at(0).get('servingSize').setValue(initialValue.servingSize);
      }
    } else {
      this.title = 'Add Eating';
      this.okButtonText = 'Add';

      this.formGroup = this.fb.group({
        timestamp: moment(),
        dishes: this.fb.array([]),
        tmpDish: false,
        tmpDishName: '',
      });

      this.addDish();
    }
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
      tmpDish: this.tmpDish,
      tmpDishName: this.tmpDishName,
      timestamp: this.formGroup.value.timestamp.toDate().getTime(),
      eatings: this.dishes.value,
    };

    this.dialogRef.close(eatingForm);
  }

  private isEdit(): boolean {
    return this.data?.mode === DishDialogMode.Edit;
  }
}
