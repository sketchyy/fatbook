import { TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';
import { EatingForm } from 'src/app/shared/models/eatings';

@Component({
  selector: 'cd-eating-dialog',
  templateUrl: './eating-dialog.component.html',
  styleUrls: ['./eating-dialog.component.scss'],
  providers: [TitleCasePipe],
})
export class EatingDialogComponent implements OnInit {
  formGroup: FormGroup;

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
    private dialogRef: MatDialogRef<EatingDialogComponent>
  ) {}

  ngOnInit() {
    this.formGroup = this.fb.group({
      timestamp: moment(),
      dishes: this.fb.array([]),
      tmpDish: false,
      tmpDishName: ''
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
      tmpDish: this.tmpDish,
      tmpDishName: this.tmpDishName,
      timestamp: this.formGroup.value.timestamp.toDate().getTime(),
      eatings: this.dishes.value,
    };

    this.dialogRef.close(eatingForm);
  }
}
