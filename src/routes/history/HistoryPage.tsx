import FoodValue from "@/shared/components/FoodValue";
import DatePicker from "@/shared/components/ui/DatePicker";
import Message from "@/shared/components/ui/Message";
import { Fragment, useState } from "react";
import { FaInfo } from "react-icons/fa";
import dateService from "@/shared/services/dateService";
import DailyTrendChart from "./components/DailyTrendChart";
import FoodValueDiff from "./components/FoodValueDiff";
import { useHistoryData } from "@/hooks/use-history-data";

function HistoryPage() {
  const [showGoal, setShowGoal] = useState(false);
  const [dateRange, setDateRange] = useState([
    dateService.subtractDays(dateService.now(), 7),
    dateService.nowAsDate(),
  ]);
  const [startDate, endDate] = dateRange;

  const {
    chartData,
    isLoading,
    totalFoodValue,
    dietGoal,
    dietGoalDiff,
    settings,
  } = useHistoryData(startDate, endDate);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  const handleDateChange = async (update: [Date, Date]) => {
    setDateRange(update);
  };

  return (
    <>
      <div className="box mb-2">
        <div className="is-flex is-justify-content-space-between mb-4">
          <div className="is-size-4 mr-2">History</div>

          <DatePicker
            width={230}
            selectsRange={true}
            startDate={startDate}
            endDate={endDate}
            onChange={handleDateChange}
          />
        </div>
        <div>
          <div className="mt-2">
            <FoodValue
              proteins={totalFoodValue.proteins}
              fats={totalFoodValue.fats}
              carbs={totalFoodValue.carbs}
              calories={totalFoodValue.calories}
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
                proteins={dietGoal.proteins}
                fats={dietGoal.fats}
                carbs={dietGoal.carbs}
                calories={dietGoal.calories}
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
        referenceValue={settings.calories}
        xKey="date"
        yKey="calories"
      />
      <DailyTrendChart
        title="🥩 Proteins"
        data={chartData}
        barFill="hsl(204, 86%, 53%)"
        referenceValue={settings.proteins}
        xKey="date"
        yKey="proteins"
      />
      <DailyTrendChart
        title="🧈 Fats"
        data={chartData}
        barFill="hsl(48, 100%, 67%)"
        referenceValue={settings.fats}
        xKey="date"
        yKey="fats"
      />
      <DailyTrendChart
        title="🍚 Carbs"
        data={chartData}
        barFill="hsl(348, 100%, 61%)"
        referenceValue={settings.carbs}
        xKey="date"
        yKey="carbs"
      />
    </>
  );
}

export default HistoryPage;
