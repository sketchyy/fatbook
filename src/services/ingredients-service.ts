import { Dish } from "@/types/dish";
import { DishPortion } from "@/types/dish-portion";
import { supabase } from "@/utils/supabase";
import foodValueService from "@/shared/services/foodValueService";
import dishesService from "@/services/dishes-service";
import { TablesInsert, TablesUpdate } from "@/types/supabase.types";

async function addIngredient(dish: Dish, inputs: DishPortion) {
  const foodValue = foodValueService.calculateFoodValueForPortion(inputs);
  const newIngredient: TablesInsert<"dishIngredients"> = {
    portion: inputs.portion ?? 0,
    dish: inputs.dish.id,
    parentDish: dish.id,
    ...foodValue,
  };

  await supabase.from("dishIngredients").insert(newIngredient);

  await updateDish(dish);
}

async function updateIngredient(dish: Dish, inputs: DishPortion) {
  const foodValue = foodValueService.calculateFoodValueForPortion(inputs);
  const updatedIngredient: TablesUpdate<"dishIngredients"> = {
    portion: inputs.portion,
    ...foodValue,
  };

  await supabase
    .from("dishIngredients")
    .update(updatedIngredient)
    .eq("dish", inputs.dish.id)
    .eq("parentDish", dish.id);

  await updateDish(dish);
}

async function deleteIngredient(dish: Dish, inputs: DishPortion) {
  await supabase
    .from("dishIngredients")
    .delete()
    .eq("dish", inputs.dish.id)
    .eq("parentDish", dish.id);

  await updateDish(dish);
}

async function updateDish(dish: Dish) {
  // Calculate food value for dish
  const { data: ingredients } = await supabase
    .from("dishIngredients")
    .select(`proteins,fats,carbs,calories,portion`)
    .eq("parentDish", dish.id);

  const dishFoodValue = foodValueService.calculateDishValuePer100g(
    ingredients ?? [],
  );

  // Update dish table
  await dishesService.updateDish(dish.id, {
    name: dish.name,
    hasIngredients: Boolean(ingredients && ingredients.length > 0),
    ...dishFoodValue,
  });
}

export default {
  addIngredient,
  updateIngredient,
  deleteIngredient,
};
