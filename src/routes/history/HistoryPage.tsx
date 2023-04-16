import { Fragment, useEffect, useState } from "react";
import { FaInfo, FaInfoCircle } from "react-icons/fa";
import { useLoaderData } from "react-router-dom";
import eatingsDbService from "../../core/firebase/eatingsDbService";
import FoodValue from "../../shared/components/FoodValue";
import DatePicker from "../../shared/components/ui/DatePicker";
import { UserSettings } from "../../shared/models/User";
import dateService from "../../shared/services/dateService";
import foodValueService from "../../shared/services/foodValueService";
import DailyTrendChart from "./DailyTrendChart";
import FoodValueDiff from "./FoodValueDiff";

function HistoryPage() {
  const userSettings = useLoaderData() as UserSettings;
  const [showGoal, setShowGoal] = useState(false);
  const [chartData, setChartData] = useState<any[]>([]);
  const [dietGoal, setDietGoal] = useState<FoodValue>(
    userSettings.dailyDietGoal
  );
  const [dateRange, setDateRange] = useState([
    dateService.subtractDays(dateService.now(), 7),
    dateService.now(),
  ]);
  const [startDate, endDate] = dateRange;
  const selectedDays = dateService.getDaysBetween(startDate, endDate);
  const [totalFoodValue, setTotalFoodValue] = useState<FoodValue>(
    foodValueService.emptyFoodValue()
  );
  const dietGoalDiff: FoodValue = {
    proteins: totalFoodValue.proteins - dietGoal.proteins,
    fats: totalFoodValue.fats - dietGoal.fats,
    carbs: totalFoodValue.carbs - dietGoal.carbs,
    calories: totalFoodValue.calories - dietGoal.calories,
  };

  useEffect(() => {
    const fetchData = async () => {
      const logDays = await Promise.all(
        selectedDays.map(
          async (day) => await eatingsDbService.getOrCreateLogDay(day)
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
            onChange={(update) => {
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
            <article className="message is-info mt-2">
              <div className="message-header">
                <p className="is-flex is-align-items-center">
                  <span className="icon is-medium">
                    <FaInfoCircle />
                  </span>
                  Goal for selected days
                </p>
                <button
                  className="delete"
                  aria-label="delete"
                  onClick={() => setShowGoal((s) => !s)}
                ></button>
              </div>
              <div className="message-body">
                <FoodValue
                  foodValue={dietGoal}
                  className="level-left is-size-7 has-text-dark"
                />
              </div>
            </article>
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
