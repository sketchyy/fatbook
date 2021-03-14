import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DishSimpleDialogComponent>,
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
