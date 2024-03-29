import { useQuery } from "react-query";
import historyService from "@/services/history-service";
import { NutritionFacts } from "@/types/nutrition-facts";
import { useAuth } from "@/contexts/Auth";
import dateService from "@/shared/services/dateService";
import foodValueService from "@/shared/services/foodValueService";
import { useSettings } from "@/hooks/use-settings";

type HistoryResult =
  | {
      isLoading: false;
      chartData: NutritionFacts[];
      totalFoodValue: NutritionFacts;
      dietGoal: NutritionFacts;
      dietGoalDiff: NutritionFacts;
      settings: NutritionFacts;
    }
  | {
      isLoading: true;
      chartData: NutritionFacts[];
      totalFoodValue?: NutritionFacts;
      dietGoal?: NutritionFacts;
      dietGoalDiff?: NutritionFacts;
      settings?: NutritionFacts;
    };

export function useHistoryData(startDate: Date, endDate: Date): HistoryResult {
  const { user } = useAuth();
  const selectedDays = dateService.getDaysBetween(startDate, endDate);

  const { data: history, isLoading: historyLoading } = useQuery({
    queryKey: ["history", startDate, endDate],
    queryFn: () => historyService.getHistory(user?.id!, selectedDays),
    enabled: Boolean(startDate && endDate),
  });
  const { data: settings, isLoading: settingsLoading } = useSettings(user?.id!);

  if (historyLoading || settingsLoading || !settings) {
    return {
      chartData: [],
      isLoading: true,
    };
  }

  const chartData = history ?? [];
  const totalFoodValue = foodValueService.sumFoodValues(chartData);
  const dietGoal = {
    proteins: settings.proteins * selectedDays.length,
    fats: settings.fats * selectedDays.length,
    carbs: settings.carbs * selectedDays.length,
    calories: settings.calories * selectedDays.length,
  };
  const dietGoalDiff: NutritionFacts = {
    proteins: totalFoodValue.proteins - dietGoal.proteins,
    fats: totalFoodValue.fats - dietGoal.fats,
    carbs: totalFoodValue.carbs - dietGoal.carbs,
    calories: totalFoodValue.calories - dietGoal.calories,
  };

  return {
    isLoading: false,
    chartData,
    settings,
    dietGoal,
    dietGoalDiff,
    totalFoodValue,
  };
}
