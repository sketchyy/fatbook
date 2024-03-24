import { supabase } from "@/utils/supabase";
import { DishPortion } from "@/types/dish-portion";
import foodValueService from "@/shared/services/foodValueService";
import { MealType } from "@/shared/models/Meals";
import { DailyEatings, Eating } from "@/types/eating";

async function getDailyEatings(
  userId: string,
  day: string,
): Promise<DailyEatings> {
  const { data, error } = await supabase
    .from("eatings")
    .select(
      `
      *,
      dish:dishes (*)
    `,
    )
    .eq("user", userId)
    .eq("day", day);

  if (error) {
    console.error("Failed fetch eatings:", error);
  }

  let eatings: Eating[] = error ? [] : data;

  // Group by is not supported by Supabase out of the box at the moment of writing (see https://github.com/orgs/supabase/discussions/19517)
  const breakfast = eatings.filter((e) => e.meal === "breakfast");
  const lunch = eatings.filter((e) => e.meal === "lunch");
  const dinner = eatings.filter((e) => e.meal === "dinner");
  const snack = eatings.filter((e) => e.meal === "snack");

  return {
    ...foodValueService.sumFoodValues(eatings),
    meals: {
      breakfast: {
        eatings: breakfast,
        ...foodValueService.sumFoodValues(breakfast),
      },
      lunch: {
        eatings: lunch,
        ...foodValueService.sumFoodValues(lunch),
      },
      dinner: {
        eatings: dinner,
        ...foodValueService.sumFoodValues(dinner),
      },
      snack: {
        eatings: snack,
        ...foodValueService.sumFoodValues(snack),
      },
    },
  };
}

async function createEating(
  userId: string,
  day: string,
  meal: string,
  eating: DishPortion,
) {
  const eatingFoodValue = foodValueService.calculateFoodValueForPortion(eating);

  await supabase.from("eatings").insert({
    user: userId,
    day,
    meal: meal as MealType,
    dish: eating.dish.id,
    portion: eating.portion!,
    ...eatingFoodValue,
  });
}

async function updateEating(eating: DishPortion) {
  const eatingFoodValue = foodValueService.calculateFoodValueForPortion(eating);

  await supabase
    .from("eatings")
    .update({
      dish: eating.dish.id,
      portion: eating.portion!,
      ...eatingFoodValue,
    })
    .eq("id", eating.id!);
}

async function deleteEating(eating: DishPortion) {
  await supabase.from("eatings").delete().eq("id", eating.id!);
}

export default {
  getDailyEatings,
  createEating,
  updateEating,
  deleteEating,
};
