import { Dish, DishModel } from "@/types/dish";
import { DishPortion } from "@/types/dish-portion";
import { supabase } from "@/services/supabase";
import {
  calculateDishValuePer100g,
  calculateFoodValueForPortion,
} from "@/utils/food-value-utils";
import { dishesService } from "@/services/dishes-service";
import { TablesInsert, TablesUpdate } from "@/types/supabase.types";

const SELECT_INGREDIENT_WITH_DISH = `*, dish:dishes!public_dishIngredients_dish_fkey (*)`;

class IngredientsService {
  async addIngredient(
    dish: DishModel,
    inputs: DishPortion,
  ): Promise<DishPortion> {
    const foodValue = calculateFoodValueForPortion(inputs);
    const newIngredient: TablesInsert<"ingredients"> = {
      portion: inputs.portion ?? 0,
      dishId: inputs.dish.id,
      parentDishId: dish.id,
      ...foodValue,
    };

    const { data: ingredient } = await supabase
      .from("ingredients")
      .insert(newIngredient)
      .select(SELECT_INGREDIENT_WITH_DISH)
      .single<DishPortion>()
      .throwOnError();

    await this.updateDishFoodValue(dish);

    return {
      ...ingredient!,
      selected: true,
    };
  }

  async updateIngredient(
    dish: Dish,
    inputs: DishPortion,
  ): Promise<DishPortion> {
    const foodValue = calculateFoodValueForPortion(inputs);
    const updatedIngredient: TablesUpdate<"ingredients"> = {
      portion: inputs.portion,
      ...foodValue,
    };

    const { data: ingredient } = await supabase
      .from("ingredients")
      .update(updatedIngredient)
      .eq("dishId", inputs.dish.id)
      .eq("parentDishId", dish.id)
      .select(SELECT_INGREDIENT_WITH_DISH)
      .single<DishPortion>()
      .throwOnError();

    await this.updateDishFoodValue(dish);

    return {
      ...ingredient!,
      selected: true,
    };
  }

  async deleteIngredient(dish: Dish, inputs: DishPortion) {
    await supabase
      .from("ingredients")
      .delete()
      .eq("dishId", inputs.dish.id)
      .eq("parentDishId", dish.id);

    await this.updateDishFoodValue(dish);
  }

  private async updateDishFoodValue(dish: Dish) {
    // Calculate food value for dish
    const { data: ingredients } = await supabase
      .from("ingredients")
      .select(`proteins,fats,carbs,calories,portion`)
      .eq("parentDishId", dish.id)
      .returns<DishPortion[]>();

    const dishFoodValue = calculateDishValuePer100g(ingredients ?? []);

    // Update dish table
    await dishesService.updateDish(dish.id, {
      name: dish.name,
      hasIngredients: Boolean(ingredients && ingredients.length > 0),
      cookedWeight: null, // Reset cooked weight, as the ingredients were changed
      ...dishFoodValue,
    });
  }
}

export const ingredientsService = new IngredientsService();
