import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'cd-add-eating',
  templateUrl: './add-eating.component.html',
  styleUrls: ['./add-eating.component.scss']
})
export class AddEatingComponent implements OnInit {
  eatingForm: FormGroup;

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<AddEatingComponent>) { }


  ngOnInit() {
    this.eatingForm = this.fb.group({
      dishName: null,
      portionSize: null,
    })
  }

  closeDialog() {
    this.dialogRef.close('Pizza!');
  }

}
