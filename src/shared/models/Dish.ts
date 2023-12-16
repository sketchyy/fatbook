import foodValueService from "../services/foodValueService";
import { DishPortion } from "./DishPortion";
import { NutritionFacts } from "./NutritionFacts";

export default class Dish {
  static empty(): Dish {
    return new Dish(
      null,
      "",
      foodValueService.emptyFoodValue(),
      [],
      null,
      null
    );
  }

  id: string | null;
  name: string;
  foodValue: NutritionFacts;
  ingredients: DishPortion[];
  defaultServingSize: number | null;
  createdAt: number | null;

  constructor(
    id: string | null,
    name: string,
    foodValue: NutritionFacts,
    ingredients: DishPortion[],
    defaultServingSize: number | null,
    createdAt: number | null
  ) {
    this.id = id;
    this.name = name;
    this.foodValue = foodValue;
    this.ingredients = ingredients;
    this.createdAt = createdAt ?? null;

    // Avoid render defaultServingSize === 0
    if (defaultServingSize) {
      this.defaultServingSize = defaultServingSize;
    }
  }

  hasIngredients() {
    return this.ingredients.length > 0;
  }

  addIngredients(ingredients) {
    this.ingredients = [...ingredients, ...this.ingredients];
    this.foodValue = foodValueService.calculateDishValuePer100g(
      this.ingredients
    );

    this.updateServingSize();
  }

  updateIngredient(ingredient) {
    const index = this.ingredients.findIndex(
      (ing) => ing.dish.id === ingredient.dish.id
    );

    if (index >= 0) {
      this.ingredients[index] = ingredient;

      this.foodValue = foodValueService.calculateDishValuePer100g(
        this.ingredients
      );

      this.updateServingSize();
    }
  }

  deleteIngredient(ingredient) {
    this.ingredients = this.ingredients.filter((item) => {
      if (item.id) {
        return item.id !== ingredient.id;
      } else {
        return item !== ingredient;
      }
    });

    if (this.hasIngredients()) {
      this.foodValue = foodValueService.calculateDishValuePer100g(
        this.ingredients
      );
    } else {
      this.foodValue = foodValueService.emptyFoodValue();
    }

    this.updateServingSize();
  }

  toJsonSimple() {
    return {
      id: this.id,
      name: this.name,
      foodValue: this.foodValue,
      defaultServingSize: this.defaultServingSize,
      createdAt: this.createdAt,
    };
  }

  private updateServingSize() {
    this.defaultServingSize = this.calculateDishServingSizeFromIngredients();
  }

  private calculateDishServingSizeFromIngredients(): number | null {
    if (!this.hasIngredients()) {
      return null;
    }

    return this.ingredients.reduce((sum, ingredient) => {
      sum += ingredient.servingSize;
      return sum;
    }, 0);
  }
}

export const dishConverter = {
  toFirestore: (dish: Dish) => {
    console.log("dish converter to firestore", dish);
    const jsonIngredients = dish.ingredients?.map((ingredient) => ({
      ...ingredient,
      dish: dishConverter.toFirestore(ingredient.dish),
    }));

    return {
      id: dish.id ?? null,
      name: dish.name,
      foodValue: dish.foodValue,
      ingredients: jsonIngredients ?? [],
      defaultServingSize: dish.defaultServingSize ?? null,
      createdAt: dish.createdAt ?? null,
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new Dish(
      snapshot.id,
      data.name,
      data.foodValue,
      data.ingredients,
      data.defaultServingSize,
      data.createdAt
    );
  },
};
