import foodValueService from "../services/foodValueService";
import { DishPortionOld } from "./DishPortionOld";
import { NutritionFacts } from "./NutritionFacts";
import { Tables } from "@/types/supabase.types";
import { DishInputs } from "@/routes/dish/edit/DishForm";

export default class DishClass {
  static empty(): DishClass {
    return new DishClass(
      null,
      null,
      foodValueService.emptyFoodValue(),
      null,
      null,
      null,
      null,
      [],
      null,
      null,
      null,
    );
  }

  static fromSupabase(row: Tables<"dishes">) {
    return new DishClass(
      row.id,
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

  id!: number;
  name: string | null;
  proteins: number | null;
  fats: number | null;
  carbs: number | null;
  calories: number | null;
  foodValue: NutritionFacts;
  ingredients: DishPortionOld[];
  defaultServingSize: number | null | undefined;
  createdAt: number | null;
  cookedWeight: number | null;

  constructor(
    id: number | null,
    name: string | null,
    foodValue: NutritionFacts,
    proteins: number | null,
    fats: number | null,
    carbs: number | null,
    calories: number | null,
    ingredients: DishPortionOld[],
    defaultServingSize: number | null,
    createdAt: number | null,
    cookedWeight: number | null,
  ) {
    if (id != null) {
      this.id = id;
    }
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

  setIngredients(ingredients: DishPortionOld[]) {
    this.ingredients = ingredients;
  }

  addIngredient(ingredient: DishPortionOld) {
    this.ingredients = [ingredient, ...this.ingredients];
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

  toForm(): DishInputs {
    return {
      name: this.name!,
      proteins: this.foodValue.proteins,
      fats: this.foodValue.fats,
      carbs: this.foodValue.carbs,
      calories: this.foodValue.calories,
      cookedWeight: this.cookedWeight,
      defaultPortion: this.defaultServingSize ?? null,
    };
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
