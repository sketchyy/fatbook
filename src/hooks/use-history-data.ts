import { useQuery } from "react-query";
import { FoodValue } from "@/types/food-value";
import { useAuth } from "@/context/Auth";
import { getDaysBetween } from "@/utils/date-utils";
import foodValueUtils from "@/utils/food-value-utils";
import { useSettings } from "@/hooks/use-settings";
import { fetchHistory } from "@/services/history-service";

type HistoryResult =
  | {
      isLoading: false;
      chartData: FoodValue[];
      totalFoodValue: FoodValue;
      dietGoal: FoodValue;
      dietGoalDiff: FoodValue;
      settings: FoodValue;
    }
  | {
      isLoading: true;
      chartData: FoodValue[];
      totalFoodValue?: FoodValue;
      dietGoal?: FoodValue;
      dietGoalDiff?: FoodValue;
      settings?: FoodValue;
    };

export function useHistoryData(startDate: Date, endDate: Date): HistoryResult {
  const { userId } = useAuth();
  const selectedDays = getDaysBetween(startDate, endDate);

  const { data: history, isLoading: historyLoading } = useQuery({
    queryKey: ["history", startDate, endDate],
    queryFn: () => fetchHistory(userId, selectedDays),
    enabled: Boolean(startDate && endDate),
  });
  const { data: settings, isLoading: settingsLoading } = useSettings();

  if (historyLoading || settingsLoading || !settings) {
    return {
      chartData: [],
      isLoading: true,
    };
  }

  const chartData = history ?? [];
  const totalFoodValue = foodValueUtils.sumFoodValues(chartData);
  const dietGoal = {
    proteins: settings.proteins * selectedDays.length,
    fats: settings.fats * selectedDays.length,
    carbs: settings.carbs * selectedDays.length,
    calories: settings.calories * selectedDays.length,
  };
  const dietGoalDiff: FoodValue = {
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
