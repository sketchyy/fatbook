import { NutritionFacts } from "./NutritionFacts";

export interface User {
  uid: string;
  settings: UserSettings;
}

export interface UserSettings {
  dailyDietGoal: NutritionFacts;
}
