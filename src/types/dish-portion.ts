import { NutritionFacts } from "@/shared/models/NutritionFacts";

export type DishPortion = {
  id: number;
  dish: {
    name: string;
  };
  portion: number;
  selected: boolean;
} & NutritionFacts;
