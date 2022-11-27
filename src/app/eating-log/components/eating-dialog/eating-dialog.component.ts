import { TitleCasePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {
  UntypedFormArray,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatLegacyAutocompleteSelectedEvent as MatAutocompleteSelectedEvent } from '@angular/material/legacy-autocomplete';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
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
  formGroup: UntypedFormGroup;
  title: string;
  okButtonText: string;

  get tmpDish(): boolean {
    return this.formGroup.get('tmpDish').value as boolean;
  }

  get tmpDishName(): string {
    return this.formGroup.get('tmpDishName').value as string;
  }

  get timestamp(): UntypedFormControl {
    return this.formGroup.get('timestamp') as UntypedFormControl;
  }

  get dishes(): UntypedFormArray {
    return this.formGroup.get('dishes') as UntypedFormArray;
  }

  constructor(
    private fb: UntypedFormBuilder,
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
        timestamp: this.fb.control(moment(initialValue.timestamp), [
          Validators.required,
        ]),
        dishes: this.fb.array([]),
        tmpDish: initialValue.tmpDish,
        tmpDishName: initialValue.tmpDishName,
      });

      if (initialValue.tmpDish) {
        initialValue.dish.ingredients.forEach((ingredient, i) => {
          this.addDish();

          this.dishes.at(i).get('dish').setValue(ingredient.dish);
          this.dishes.at(i).get('servingSize').setValue(ingredient.servingSize);
        });
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
      dish: this.fb.control(null, [Validators.required]),
      servingSize: this.fb.control(null, [Validators.required]),
    });

    this.dishes.push(newDishGroup);
  }

  deleteDish(index: number) {
    this.dishes.removeAt(index);
  }

  onSubmit() {
    if (this.formGroup.valid) {
      const eatingForm: EatingForm = {
        tmpDish: this.tmpDish,
        tmpDishName: this.tmpDishName,
        timestamp: this.formGroup.value.timestamp.toDate().getTime(),
        eatings: this.dishes.value,
      };

      this.dialogRef.close(eatingForm);
    } else {
      this.formGroup.get('timestamp').markAsTouched();
      this.dishes.controls.forEach((control) => {
        control.markAllAsTouched();
      });
    }
  }

  private isEdit(): boolean {
    return this.data?.mode === DishDialogMode.Edit;
  }
}
