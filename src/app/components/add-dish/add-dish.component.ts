import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'cd-add-dish',
  templateUrl: './add-dish.component.html',
  styleUrls: ['./add-dish.component.scss']
})
export class AddDishComponent implements OnInit  {
  dishForm: FormGroup;

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<AddDishComponent>) { }


  ngOnInit() {
    this.dishForm = this.fb.group({
      name: null,
      fat: null,
      protein: null,
      carbohydrate: null,
      calories: null,
    })
  }

  closeDialog() {
    this.dialogRef.close('Pizza!');
  }

}
