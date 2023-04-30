import foodValueService from "../services/foodValueService";
import { DishPortion } from "./DishPortion";
import { NutritionFacts } from "./NutritionFacts";

export default class Dish {
  static empty(): Dish {
    return new Dish(null, "", undefined, [], null, null);
  }

  id: string | null;
  name: string;
  foodValue: NutritionFacts;
  ingredients: DishPortion[];
  defaultServingSize: number | null;
  createdAt;

  constructor(
    id: string | null,
    name: string,
    foodValue = {
      proteins: null,
      fats: null,
      carbs: null,
      calories: null,
    },
    ingredients = [],
    defaultServingSize: number | null,
    createdAt
  ) {
    this.id = id;
    this.name = name;
    this.foodValue = foodValue;
    this.ingredients = ingredients;
    this.defaultServingSize = defaultServingSize ?? null;
    this.createdAt = createdAt ?? null;
  }

  hasIngredients() {
    return this.ingredients.length > 0;
  }

  addIngredients(ingredients) {
    this.ingredients = [...ingredients, ...this.ingredients];
    this.foodValue = foodValueService.calculateDishValuePer100g(
      this.ingredients
    );
    this.defaultServingSize = this.calculateDishServingSizeFromIngredients();
  }

  updateIngredient(ingredient) {
    const index = this.ingredients.findIndex(
      (ing) => ing.dish.id === ingredient.dish.id
    );

    console.log("ing=", ingredient, index);

    if (index >= 0) {
      this.ingredients[index] = ingredient;

      this.foodValue = foodValueService.calculateDishValuePer100g(
        this.ingredients
      );

      this.defaultServingSize = this.calculateDishServingSizeFromIngredients();
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

    this.defaultServingSize = this.calculateDishServingSizeFromIngredients();
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
