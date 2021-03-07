import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'cd-eating-log-entry-dialog',
  templateUrl: './eating-log-entry-dialog.component.html',
  styleUrls: ['./eating-log-entry-dialog.component.scss'],
})
export class EatingLogEntryDialogComponent implements OnInit {
  formGroup: FormGroup;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      testField: '',
      dishes: this.fb.array([]),
    });
  }

  onSubmit() {
    // const userInput: DishUserInput = {
    //   name: this.dishForm.get('name').value,
    //   ingredients: this.ingredients.value.map((i) => ({
    //     id: i.ingredient.id,
    //     weight: i.weight,
    //   })),
    // };

    this.ref.close(this.formGroup.value);
  }

  onCancel() {
    this.ref.close(false);
  }
}
