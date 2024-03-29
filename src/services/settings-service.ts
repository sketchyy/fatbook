import { supabase } from "@/services/supabase";
import { UserSettings } from "@/types/settings";
import { isNull } from "@/utils/is-null";

async function getSettings(userId: string): Promise<UserSettings> {
  const { data } = await supabase
    .from("settings")
    .select(`proteins, fats, carbs, calories`)
    .eq("user", userId)
    .throwOnError();

  if (isNull(data) || data.length === 0) {
    return {
      proteins: 100,
      fats: 70,
      carbs: 180,
      calories: 2000,
    };
  }

  return data[0];
}

async function saveSettings(userId: string, userSettings: UserSettings) {
  await supabase.from("settings").upsert({ user: userId, ...userSettings });
}

export default {
  getSettings,
  saveSettings,
};
