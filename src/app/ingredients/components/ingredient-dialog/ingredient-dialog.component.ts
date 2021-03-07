import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'cd-ingredient-dialog',
  templateUrl: './ingredient-dialog.component.html',
  styleUrls: ['./ingredient-dialog.component.scss'],
})
export class IngredientDialogComponent implements OnInit {
  formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<IngredientDialogComponent>
  ) {}

  ngOnInit() {
    this.formGroup = this.fb.group({
      name: null,
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
