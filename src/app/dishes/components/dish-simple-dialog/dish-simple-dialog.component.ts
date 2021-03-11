import { DishDialogMode } from './../../../models/dish-dialog-mode';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IngredientDialogComponent } from 'src/app/ingredients/components/ingredient-dialog/ingredient-dialog.component';
import { Dish } from 'src/app/models/dish';

@Component({
  selector: 'cd-dish-simple-dialog',
  templateUrl: './dish-simple-dialog.component.html',
  styleUrls: ['./dish-simple-dialog.component.scss']
})
export class DishSimpleDialogComponent implements OnInit {
  formGroup: FormGroup;
  title: string;
  okButtonText: string;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<IngredientDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: {mode: DishDialogMode, dish: Dish}
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
      });
    }
  }

  onSubmit() {
    this.dialogRef.close(this.formGroup.value);
  }


  isEdit(): boolean {
    return this.data?.mode === DishDialogMode.Edit;
  }
}
