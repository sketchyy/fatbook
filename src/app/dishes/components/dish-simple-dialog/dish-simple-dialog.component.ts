import { FoodValueCalculator } from './../../../shared/services/food-value-calculator.service';
import { EatingInput } from './../../../shared/models/eatings';
import { FoodValue } from './../../../shared/models/food-value';
import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Dish, DishDialogMode } from 'src/app/shared/models/dishes';

@Component({
  selector: 'cd-dish-simple-dialog',
  templateUrl: './dish-simple-dialog.component.html',
  styleUrls: ['./dish-simple-dialog.component.scss'],
})
export class DishSimpleDialogComponent implements OnInit {
  formGroup: FormGroup;
  title: string;
  okButtonText: string;

  get ingredients() {
    return this.formGroup.get('ingredients') as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DishSimpleDialogComponent>,
    private foodValueCalculator: FoodValueCalculator,
    @Inject(MAT_DIALOG_DATA) private data: { mode: DishDialogMode; dish: Dish }
  ) {}

  ngOnInit() {
    if (this.isEdit()) {
      this.title = 'Modify Dish';
      this.okButtonText = 'Save';

      const initialValue = this.data.dish;

      this.formGroup = this.fb.group({
        name: initialValue.name,
        defaultServingSize: initialValue.defaultServingSize,
        foodValue: this.fb.group(initialValue.foodValue),
        ingredients: this.fb.array(initialValue.ingredients),
      });
    } else {
      this.title = 'Add New Dish';
      this.okButtonText = 'Add';

      this.formGroup = this.fb.group({
        name: null,
        defaultServingSize: null,
        foodValue: this.fb.group({
          proteins: null,
          fats: null,
          carbs: null,
          calories: null,
        }),
        ingredients: this.fb.array([]),
      });

      this.ingredients.valueChanges.subscribe((x) => {
        const foodValues = this.ingredients.controls.map((control) => {
          const userInput: EatingInput = control.value;
          return this.foodValueCalculator.calculate(userInput)
        });

        const sumFoodValue = this.foodValueCalculator.sum(foodValues);

        this.formGroup.get('foodValue').setValue(sumFoodValue);
      });
    }
  }

  onSubmit() {
    this.dialogRef.close(this.formGroup.value);
  }

  isEdit(): boolean {
    return this.data?.mode === DishDialogMode.Edit;
  }

  onAddIngredient() {
    this.ingredients.push(
      this.fb.group({
        dish: null,
        servingSize: null,
      })
    );
  }

  deleteIngredient(index: number) {
    this.ingredients.removeAt(index);
  }
}
