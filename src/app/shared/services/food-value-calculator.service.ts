import { FoodValue } from './../models/food-value';
import { EatingInput } from './../models/eatings';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FoodValueCalculator {
  constructor() {}

  calculateFoodValue(userInput: EatingInput): FoodValue {
    if (
      !userInput.dish ||
      !userInput.dish.foodValue ||
      !userInput.servingSize
    ) {
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

  calculateDishWeight(ingredients: EatingInput[]): number {
    return ingredients.reduce(
      (result, item) => (result += item.servingSize),
      0
    );
  }

  calculateDishValuePer100g(ingredients: EatingInput[]): FoodValue {
    const totalDishWeight = this.calculateDishWeight(ingredients);

    const foodValues = ingredients.map((ingredient) =>
      this.calculateFoodValue(ingredient)
    );

    const resultFoodValue = foodValues.reduce((result, item) => {
      result.proteins += item.proteins;
      result.fats += item.fats;
      result.carbs += item.carbs;
      result.calories += item.calories;

      return result;
    }, this.emptyFoodValue());

    return {
      proteins: this.round((resultFoodValue.proteins / totalDishWeight) * 100),
      fats: this.round((resultFoodValue.fats / totalDishWeight) * 100),
      carbs: this.round((resultFoodValue.carbs / totalDishWeight) * 100),
      calories: this.round((resultFoodValue.calories / totalDishWeight) * 100),
    };
  }

  sumFoodValues(foodValues: FoodValue[]): FoodValue {
    return foodValues.reduce((result, current) => {
      result.proteins += current.proteins;
      result.fats += current.fats;
      result.carbs += current.carbs;
      result.calories += current.calories;

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

  private round(value): number {
    return Math.round(value * 100) / 100;
  }
}
