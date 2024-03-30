import { supabase } from "@/services/supabase";
import { formatDate } from "@/utils/date-utils";

async function getHistory(userId: string, selectedDays: string[]) {
  const { data: dbData } = await supabase
    .from("eatings_by_day")
    .select()
    .eq("user", userId)
    .throwOnError();

  const data = dbData ?? [];

  return selectedDays.map((day) => {
    const summary = data.find((r) => r.day === day);

    return {
      date: formatDate(day, "DD MMM"),
      calories: Math.round(summary?.calories ?? 0),
      proteins: Math.round(summary?.proteins ?? 0),
      fats: Math.round(summary?.fats ?? 0),
      carbs: Math.round(summary?.carbs ?? 0),
    };
  });
}

export default {
  getHistory,
};
