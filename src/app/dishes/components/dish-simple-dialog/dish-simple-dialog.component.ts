import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Dish, DishDialogMode } from 'src/app/shared/models/dishes';

import { FoodValueCalculator } from './../../../shared/services/food-value-calculator.service';

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
        name: this.fb.control(initialValue.name, [Validators.required]),
        defaultServingSize: initialValue.defaultServingSize,
        foodValue: this.fb.group({
          proteins: this.fb.control(null, [Validators.required]),
          fats: this.fb.control(null, [Validators.required]),
          carbs: this.fb.control(null, [Validators.required]),
          calories: this.fb.control(null, [Validators.required]),
        }),
        ingredients: this.fb.array([]),
      });

      this.formGroup.get('foodValue').setValue(initialValue.foodValue);

      initialValue.ingredients?.forEach((ingredient) => {
        this.onAddIngredient();
        this.ingredients.at(this.ingredients.length - 1).setValue(ingredient);
      });
    } else {
      this.title = 'Add New Dish';
      this.okButtonText = 'Add';

      this.formGroup = this.fb.group({
        name: this.fb.control(null, [Validators.required]),
        defaultServingSize: null,
        foodValue: this.fb.group({
          proteins: this.fb.control(null, [Validators.required]),
          fats: this.fb.control(null, [Validators.required]),
          carbs: this.fb.control(null, [Validators.required]),
          calories: this.fb.control(null, [Validators.required]),
        }),
        ingredients: this.fb.array([]),
      });

      this.ingredients.valueChanges.subscribe((x) => {
        const ingredients = this.ingredients.controls.map((control) => control.value).filter(ingredient => ingredient?.dish?.foodValue);

        const sumFoodValue = this.foodValueCalculator.calculateDishValuePer100g(ingredients);

        this.formGroup.get('foodValue').setValue(sumFoodValue);
      });
    }
  }

  onSubmit() {
    console.log('valid? ',this.formGroup.valid);

    if (this.formGroup.valid) {
      this.dialogRef.close(this.formGroup.value);
    } else {
      this.formGroup.get('timestamp').markAsTouched();
      this.ingredients.controls.forEach(control => {
        control.markAllAsTouched();
      })
    }
  }

  isEdit(): boolean {
    return this.data?.mode === DishDialogMode.Edit;
  }

  onAddIngredient() {
    this.ingredients.push(
      this.fb.group({
        dish: this.fb.control(null, [Validators.required]),
        servingSize: this.fb.control(null, [Validators.required]),
      })
    );
  }

  deleteIngredient(index: number) {
    this.ingredients.removeAt(index);
  }
}
