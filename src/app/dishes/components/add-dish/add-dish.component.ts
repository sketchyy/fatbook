import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IngredientRef } from 'src/app/models/ingredient-ref';

import { IngredientsService } from '../../../ingredients/services/ingredients.service';
import { DishUserInput } from './../../../models/dish-user-input';

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
    private ingredientsStorage: IngredientsService
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
    const userInput: DishUserInput = {
      name: this.dishForm.get('name').value,
      ingredients: this.ingredients.value.map((i) => ({
        id: i.ingredient.id,
        weight: i.weight,
      })),
    };

    this.ref.close(userInput);
  }

  onCancel() {
    this.ref.close(false);
  }

  search({ query }) {
    /* this.ingredientsStorage.findByName(query).subscribe((response) => {
      this.ingredientOptions = response;
    }); */
  }
}
