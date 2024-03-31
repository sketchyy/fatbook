import { Dish } from "@/types/dish";
import { DishPortion } from "@/types/dish-portion";
import { supabase } from "@/services/supabase";
import foodValueUtils from "@/utils/food-value-utils";
import { updateDish } from "@/services/dishes-service";
import { TablesInsert, TablesUpdate } from "@/types/supabase.types";

const SELECT_INGREDIENT_WITH_DISH = `*, dish:dishes!public_dishIngredients_dish_fkey (*)`;

export async function addIngredient(
  dish: Dish,
  inputs: DishPortion,
): Promise<DishPortion> {
  const foodValue = foodValueUtils.calculateFoodValueForPortion(inputs);
  const newIngredient: TablesInsert<"ingredients"> = {
    portion: inputs.portion ?? 0,
    dish: inputs.dish.id,
    parentDish: dish.id,
    ...foodValue,
  };

  const { data: ingredient } = await supabase
    .from("ingredients")
    .insert(newIngredient)
    .select(SELECT_INGREDIENT_WITH_DISH)
    .single()
    .throwOnError();

  await updateDishFoodValue(dish);

  return {
    ...ingredient!,
    selected: true,
  };
}

export async function updateIngredient(
  dish: Dish,
  inputs: DishPortion,
): Promise<DishPortion> {
  const foodValue = foodValueUtils.calculateFoodValueForPortion(inputs);
  const updatedIngredient: TablesUpdate<"ingredients"> = {
    portion: inputs.portion,
    ...foodValue,
  };

  const { data: ingredient } = await supabase
    .from("ingredients")
    .update(updatedIngredient)
    .eq("dish", inputs.dish.id)
    .eq("parentDish", dish.id)
    .select(SELECT_INGREDIENT_WITH_DISH)
    .single()
    .throwOnError();

  await updateDishFoodValue(dish);

  return {
    ...ingredient!,
    selected: true,
  };
}

export async function deleteIngredient(dish: Dish, inputs: DishPortion) {
  await supabase
    .from("ingredients")
    .delete()
    .eq("dish", inputs.dish.id)
    .eq("parentDish", dish.id);

  await updateDishFoodValue(dish);
}

async function updateDishFoodValue(dish: Dish) {
  // Calculate food value for dish
  const { data: ingredients } = await supabase
    .from("ingredients")
    .select(`proteins,fats,carbs,calories,portion`)
    .eq("parentDish", dish.id);

  const dishFoodValue = foodValueUtils.calculateDishValuePer100g(
    ingredients ?? [],
  );

  // Update dish table
  await updateDish(dish.id, {
    name: dish.name,
    hasIngredients: Boolean(ingredients && ingredients.length > 0),
    ...dishFoodValue,
  });
}
