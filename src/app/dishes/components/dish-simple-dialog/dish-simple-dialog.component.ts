import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { IngredientDialogComponent } from 'src/app/ingredients/components/ingredient-dialog/ingredient-dialog.component';

@Component({
  selector: 'cd-dish-simple-dialog',
  templateUrl: './dish-simple-dialog.component.html',
  styleUrls: ['./dish-simple-dialog.component.scss']
})
export class DishSimpleDialogComponent implements OnInit {
  formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<IngredientDialogComponent>
  ) {}

  ngOnInit() {
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

  onSubmit() {
    this.dialogRef.close(this.formGroup.value);
  }

}
