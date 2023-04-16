import eatingsService from "@/core/firebase/eatingsService";
import FoodValue from "@/shared/components/FoodValue";
import Message from "@/shared/components/Message";
import DatePicker from "@/shared/components/ui/DatePicker";
import { NutritionFacts } from "@/shared/models/NutritionFacts";
import { Fragment, useEffect, useState } from "react";
import { FaInfo } from "react-icons/fa";
import { useLoaderData } from "react-router-dom";

import { UserSettings } from "@/shared/models/User";
import dateService from "@/shared/services/dateService";
import foodValueService from "@/shared/services/foodValueService";
import DailyTrendChart from "./DailyTrendChart";
import FoodValueDiff from "./FoodValueDiff";

function HistoryPage() {
  const userSettings = useLoaderData() as UserSettings;
  const [showGoal, setShowGoal] = useState(false);
  const [chartData, setChartData] = useState<any[]>([]);
  const [dietGoal, setDietGoal] = useState<NutritionFacts>(
    userSettings.dailyDietGoal
  );
  const [dateRange, setDateRange] = useState([
    dateService.subtractDays(dateService.now(), 7),
    dateService.nowAsDate(),
  ]);
  const [startDate, endDate] = dateRange;
  const selectedDays = dateService.getDaysBetween(startDate, endDate);
  const [totalFoodValue, setTotalFoodValue] = useState<NutritionFacts>(
    foodValueService.emptyFoodValue()
  );
  const dietGoalDiff: NutritionFacts = {
    proteins: totalFoodValue.proteins - dietGoal.proteins,
    fats: totalFoodValue.fats - dietGoal.fats,
    carbs: totalFoodValue.carbs - dietGoal.carbs,
    calories: totalFoodValue.calories - dietGoal.calories,
  };

  useEffect(() => {
    const fetchData = async () => {
      const logDays = await Promise.all(
        selectedDays.map(
          async (day) => await eatingsService.getOrCreateLogDay(day)
        )
      );
      setChartData(
        logDays.map((logDay) => ({
          date: dateService.format(logDay.id, "DD MMM"),
          kcal: Math.round(logDay.totalFoodValue.calories),
          proteins: Math.round(logDay.totalFoodValue.proteins),
          fats: Math.round(logDay.totalFoodValue.fats),
          carbs: Math.round(logDay.totalFoodValue.carbs),
        }))
      );

      setTotalFoodValue(
        foodValueService.sumFoodValues(logDays.map((ld) => ld.totalFoodValue))
      );

      setDietGoal({
        proteins: userSettings.dailyDietGoal.proteins * selectedDays.length,
        fats: userSettings.dailyDietGoal.fats * selectedDays.length,
        carbs: userSettings.dailyDietGoal.carbs * selectedDays.length,
        calories: userSettings.dailyDietGoal.calories * selectedDays.length,
      });
    };

    fetchData();
  }, [dateRange]);

  return (
    <Fragment>
      <div className="box mb-2">
        <div className="is-flex is-justify-content-space-between mb-4">
          <div className="is-size-4 mr-2">History</div>

          <DatePicker
            width={230}
            selectsRange={true}
            startDate={startDate}
            endDate={endDate}
            onChange={(update: [Date, Date]) => {
              setDateRange(update);
            }}
          />
        </div>
        <div>
          <div className="mt-2">
            <FoodValue
              foodValue={totalFoodValue}
              className="level-left is-size-7"
            />
          </div>
          <div className="mt-2">
            <div className="is-flex is-align-items-center">
              <FoodValueDiff foodValue={dietGoalDiff} />
              <button
                onClick={() => setShowGoal((s) => !s)}
                className="button is-small is-rounded"
              >
                <FaInfo />
              </button>
            </div>
          </div>
          {showGoal && (
            <Message
              title="Goal for selected days"
              onClose={() => setShowGoal((s) => !s)}
              className="mt-2"
            >
              <FoodValue
                foodValue={dietGoal}
                className="level-left is-size-7 has-text-dark"
              />
            </Message>
          )}
        </div>
      </div>
      <DailyTrendChart
        title="⚡ Calories"
        data={chartData}
        barFill="hsl(171, 100%, 41%)"
        referenceValue={userSettings.dailyDietGoal.calories}
        xKey="date"
        yKey="kcal"
      />
      <DailyTrendChart
        title="🥩 Proteins"
        data={chartData}
        barFill="hsl(204, 86%, 53%)"
        referenceValue={userSettings.dailyDietGoal.proteins}
        xKey="date"
        yKey="proteins"
      />
      <DailyTrendChart
        title="🧈 Fats"
        data={chartData}
        barFill="hsl(48, 100%, 67%)"
        referenceValue={userSettings.dailyDietGoal.fats}
        xKey="date"
        yKey="fats"
      />
      <DailyTrendChart
        title="🍚 Carbs"
        data={chartData}
        barFill="hsl(348, 100%, 61%)"
        referenceValue={userSettings.dailyDietGoal.carbs}
        xKey="date"
        yKey="carbs"
      />
    </Fragment>
  );
}

export default HistoryPage;
