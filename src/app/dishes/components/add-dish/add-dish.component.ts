import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { take } from 'rxjs/operators';
import { Ingredient } from 'src/app/models/ingredient';
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
  ingredientOptions: Ingredient[];

  get dishIngredients(): FormArray {
    return this.dishForm.get('dishIngredients') as FormArray;
  }

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private fb: FormBuilder,
    private ingredientsService: IngredientsService
  ) {}

  ngOnInit() {
    this.dishForm = this.fb.group({
      name: null,
      dishIngredients: this.fb.array([]),
    });

    this.addIngredient();
  }

  addIngredient() {
    this.dishIngredients.push(
      this.fb.group({
        ingredient: null,
        weight: null,
      })
    );
  }

  deleteIngredient(index: number) {
    this.dishIngredients.removeAt(index);
  }

  onSubmit() {
    this.ref.close(this.dishForm.value);
  }

  onCancel() {
    this.ref.close(false);
  }

  async search({ query }) {
    this.ingredientOptions = await this.ingredientsService.findByName(query);
  }
}
