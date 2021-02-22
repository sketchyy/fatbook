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
  options: any[];
  filteredOptions: Observable<any[]>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {dishNames: any[]},
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddEatingComponent>
  ) {}

  ngOnInit() {
    this.eatingForm = this.fb.group({
      dish: null,
      portionSize: null,
    });

    this.options = this.data.dishNames;

    this.filteredOptions = this.eatingForm.get('dish').valueChanges.pipe(
      startWith({name: ''}),
      map((value) => this._filter(value))
    );
  }

  onSubmit() {
    this.dialogRef.close(this.eatingForm.value);
  }

  displayFn(eating: any): string {
    return eating && eating.name ? eating.name : '';
  }

  private _filter(value: any): string[] {
    const filterValue = value.name.toLowerCase();

    return this.options.filter((option) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }

}
