import { supabase } from "@/utils/supabase";
import { DishPortion } from "@/types/dish-portion";
import foodValueService from "@/shared/services/foodValueService";
import { MealType } from "@/shared/models/Meals";

export async function createEating(
  userId: string,
  day: string,
  meal: string,
  eating: DishPortion,
) {
  const eatingFoodValue = foodValueService.calculateFoodValueForPortion(eating);

  const response = await supabase.from("eatings").insert({
    user: userId,
    day,
    meal: meal as MealType,
    dish: eating.dish.id,
    portion: eating.portion!,
    ...eatingFoodValue,
  });
  console.log("response", response);
}

export default {
  createEating,
};
