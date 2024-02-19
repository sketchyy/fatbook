import foodValueService from "../services/foodValueService";
import { DishPortion } from "./DishPortion";
import { NutritionFacts } from "./NutritionFacts";
import { Tables } from "@/types/supabase.types";

export default class Dish {
  static empty(): Dish {
    return new Dish(
      null,
      "",
      foodValueService.emptyFoodValue(),
      0,
      0,
      0,
      0,
      [],
      null,
      null,
      null,
    );
  }

  static fromSupabase(row: Tables<"dishes">) {
    return new Dish(
      "" + row.id,
      row.name,
      null as any,
      row.proteins,
      row.fats,
      row.carbs,
      row.calories,
      [],
      row.portionSize,
      row.createdAt as any,
      row.cookedWeight,
    );
  }

  id: string | null;
  name: string;
  proteins: number;
  fats: number;
  carbs: number;
  calories: number;
  foodValue: NutritionFacts;
  ingredients: DishPortion[];
  defaultServingSize: number | null | undefined;
  createdAt: number | null;
  cookedWeight: number | null;

  constructor(
    id: string | null,
    name: string,
    foodValue: NutritionFacts,
    proteins: number,
    fats: number,
    carbs: number,
    calories: number,
    ingredients: DishPortion[],
    defaultServingSize: number | null,
    createdAt: number | null,
    cookedWeight: number | null,
  ) {
    this.id = id;
    this.name = name;
    this.ingredients = ingredients;
    this.createdAt = createdAt ?? null;
    this.proteins = proteins;
    this.fats = fats;
    this.carbs = carbs;
    this.calories = calories;
    this.foodValue = {
      proteins: proteins!,
      fats: fats!,
      carbs: carbs!,
      calories: calories!,
    };
    // undefined can't be written to Firebase, so initializing with null
    // Also replace 0 with null, as 0 is useless
    this.defaultServingSize = defaultServingSize || null;
    this.cookedWeight = cookedWeight || null;
  }

  hasIngredients() {
    return this.ingredients.length > 0;
  }

  addIngredients(ingredients) {
    this.ingredients = [...ingredients, ...this.ingredients];
    this.foodValue = this.calculateFoodValue();

    this.updateServingSize();
  }

  updateIngredient(ingredient) {
    const index = this.ingredients.findIndex(
      (ing) => ing.dish.id === ingredient.dish.id,
    );

    if (index >= 0) {
      this.ingredients[index] = ingredient;

      this.foodValue = this.calculateFoodValue();

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
      this.foodValue = this.calculateFoodValue();
    } else {
      this.foodValue = foodValueService.emptyFoodValue();
    }

    this.updateServingSize();
  }

  calculateFoodValue(cookedWeight?: number | null): NutritionFacts {
    if (this.hasIngredients()) {
      return foodValueService.calculateDishValuePer100g(
        this.ingredients,
        cookedWeight ?? this.cookedWeight,
      );
    } else {
      return foodValueService.calculateOwnDishValuePer100g(
        this,
        cookedWeight ?? this.cookedWeight,
      );
    }
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
  // toFirestore: (dish: Dish) => {
  //   console.log("dish converter to firestore", dish);
  //   const jsonIngredients = dish.ingredients?.map((ingredient) => ({
  //     ...ingredient,
  //     dish: dishConverter.toFirestore(ingredient.dish),
  //   }));
  //
  //   return {
  //     id: dish.id ?? null,
  //     name: dish.name,
  //     foodValue: dish.foodValue,
  //     ingredients: jsonIngredients ?? [],
  //     defaultServingSize: dish.defaultServingSize ?? null,
  //     createdAt: dish.createdAt ?? null,
  //     cookedWeight: dish.cookedWeight ?? null,
  //   };
  // },
  // fromFirestore: (snapshot, options) => {
  //   const data = snapshot.data(options);
  //   return new Dish(
  //     snapshot.id,
  //     data.name,
  //     data.foodValue,
  //     data.ingredients,
  //     data.defaultServingSize,
  //     data.createdAt,
  //     data.cookedWeight,
  //   );
  // },
};
