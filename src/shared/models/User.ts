import { FoodValue } from "./FoodValue";

export interface User {
  uid: string;
  settings: UserSettings;
}

export interface UserSettings {
  dailyDietGoal: FoodValue;
}
