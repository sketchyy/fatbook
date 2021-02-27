import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IngredientRef } from 'src/app/models/ingredient-ref';

import { IngredientsStorageService } from './../../../ingredients/services/ingredients-storage.service';

@Component({
  selector: 'cd-add-dish',
  templateUrl: './add-dish.component.html',
  styleUrls: ['./add-dish.component.scss'],
})
export class AddDishComponent implements OnInit {
  dishForm: FormGroup;
  ingredientOptions: IngredientRef[];

  get ingredients(): FormArray {
    return this.dishForm.get('ingredients') as FormArray;
  }

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private fb: FormBuilder,
    private ingredientsStorage: IngredientsStorageService
  ) {}

  ngOnInit() {
    this.dishForm = this.fb.group({
      name: null,
      ingredients: this.fb.array([]),
    });

    this.addIngredient();
  }

  addIngredient() {
    this.ingredients.push(
      this.fb.group({
        ingredient: null,
        weight: null,
      })
    );
  }

  deleteIngredient(index: number) {
    this.ingredients.removeAt(index);
  }

  onSubmit() {
    this.ref.close(this.dishForm.value);
  }

  onCancel() {
    this.ref.close(false);
  }

  search({ query }) {
    this.ingredientsStorage.findByName(query).subscribe((response) => {
      this.ingredientOptions = response;
    });
  }
}
