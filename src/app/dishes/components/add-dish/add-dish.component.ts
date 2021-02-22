import { stringify } from '@angular/compiler/src/util';
import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'cd-add-dish',
  templateUrl: './add-dish.component.html',
  styleUrls: ['./add-dish.component.scss'],
})
export class AddDishComponent implements OnInit {
  dishForm: FormGroup;
  options: any[];
  filteredOptions: Observable<any[]>;

  get ingredients(): FormArray {
    return this.dishForm.get('ingredients') as FormArray;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { dishNames: any[] },
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddDishComponent>
  ) {}

  ngOnInit() {
    this.dishForm = this.fb.group({
      name: null,
      ingredients: this.fb.array([]),
    });

    this.options = this.data.dishNames;

    this.filteredOptions = this..get('dish').valueChanges.pipe(
      startWith({ name: '' }),
      map((value) => this._filter(value))
    );

    this.addIngredient();
  }

  addIngredient() {
    this.ingredients.push(
      this.fb.group({
        id: null,
        weight: null,
      })
    );
  }

  deleteIngredient(index: number) {
    this.ingredients.removeAt(index);
  }

  onSubmit() {
    this.dialogRef.close(this.dishForm.value);
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
