import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'cd-add-eating',
  templateUrl: './add-eating.component.html',
  styleUrls: ['./add-eating.component.scss'],
})
export class AddEatingComponent implements OnInit {
  eatingForm: FormGroup;
  options: string[];
  filteredOptions: Observable<string[]>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {dishNames: string[]},
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddEatingComponent>
  ) {}

  ngOnInit() {
    this.eatingForm = this.fb.group({
      dishName: null,
      portionSize: null,
    });

    this.options = this.data.dishNames;

    this.filteredOptions = this.eatingForm.get('dishName').valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
  }

  onSubmit() {
    this.dialogRef.close(this.eatingForm.value);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }
}
