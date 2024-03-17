import { Dish } from "@/types/dish";
import { DishPortionInputs } from "@/types/dish-portion";
import { supabase } from "@/utils/supabase";
import foodValueService from "@/shared/services/foodValueService";
import dishesService from "@/services/dishes-service";
import { TablesInsert, TablesUpdate } from "@/types/supabase.types";

async function addIngredient(dish: Dish, inputs: DishPortionInputs) {
  const newIngredient: TablesInsert<"dishIngredients"> = {
    proteins: inputs.proteins ?? 0,
    fats: inputs.fats ?? 0,
    carbs: inputs.carbs ?? 0,
    calories: inputs.calories ?? 0,
    portion: inputs.portion ?? 0,
    dish: inputs.dish.id,
    parentDish: dish.id,
  };

  await supabase.from("dishIngredients").insert({
    ...newIngredient,
    dish: inputs.dish.id!,
    parentDish: dish.id,
  });

  await updateDish(dish);
}

async function updateIngredient(dish: Dish, inputs: DishPortionInputs) {
  const update: TablesUpdate<"dishIngredients"> = {
    proteins: inputs.proteins ?? 0,
    fats: inputs.fats ?? 0,
    carbs: inputs.carbs ?? 0,
    calories: inputs.calories ?? 0,
    portion: inputs.portion ?? 0,
  };

  await supabase
    .from("dishIngredients")
    .update({
      ...update,
    })
    .eq("dish", inputs.dish.id)
    .eq("parentDish", dish.id);

  await updateDish(dish);
}

async function deleteIngredient(dish: Dish, inputs: DishPortionInputs) {
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
    ...dishFoodValue,
  });
}

export default {
  addIngredient,
  updateIngredient,
  deleteIngredient,
};
