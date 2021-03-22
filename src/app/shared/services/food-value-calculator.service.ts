import { FoodValue } from './../models/food-value';
import { EatingInput } from './../models/eatings';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FoodValueCalculator {
  constructor() {}

  calculate(userInput: EatingInput): FoodValue {
    if (!userInput.dish || !userInput.servingSize) {
      return this.emptyFoodValue();
    }

    return {
      proteins:
        (userInput.dish.foodValue.proteins * userInput.servingSize) / 100,
      fats: (userInput.dish.foodValue.fats * userInput.servingSize) / 100,
      carbs: (userInput.dish.foodValue.carbs * userInput.servingSize) / 100,
      calories:
        (userInput.dish.foodValue.calories * userInput.servingSize) / 100,
    };
  }

  sum(foodValues: FoodValue[]): FoodValue {
    return foodValues.reduce((result, item) => {
      result.proteins += item.proteins;
      result.fats += item.fats;
      result.carbs += item.carbs;
      result.calories += item.calories;

      return result;
    }, this.emptyFoodValue());
  }

  private emptyFoodValue(): FoodValue {
    return {
      proteins: 0,
      fats: 0,
      carbs: 0,
      calories: 0,
    };
  }
}
