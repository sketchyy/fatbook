import React, { forwardRef, Fragment, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import eatingsDbService from "../../core/firebase/eatingsDbService";
import FoodValue from "../../shared/components/FoodValue";
import dateService from "../../shared/services/dateService";
import foodValueService from "../../shared/services/foodValueService";
import DailyTrendChart from "./DailyTrendChart";

function HistoryPage({ props }) {
  const [chartData, setChartData] = useState([]);
  const [dateRange, setDateRange] = useState([
    dateService.subtractDays(dateService.now(), 7),
    dateService.now(),
  ]);
  const [startDate, endDate] = dateRange;
  const selectedDays = dateService.getDaysBetween(startDate, endDate);
  const [totalFoodValue, setTotalFoodValue] = useState([]);

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
    };

    fetchData();
  }, [dateRange]);

  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <input
      className="input"
      style={{ width: 230 }}
      defaultValue={value}
      onClick={onClick}
      ref={ref}
      readOnly={true}
    />
  ));

  return (
    <Fragment>
      <div className="box">
        <div className="is-flex is-justify-content-space-between mb-4">
          <div className="is-size-4">History</div>

          <DatePicker
            selectsRange={true}
            startDate={startDate}
            endDate={endDate}
            onChange={(update) => {
              setDateRange(update);
            }}
            customInput={<ExampleCustomInput />}
            withPortal
            dateFormat="dd MMM yyyy"
          />
        </div>
        <div className="mt-2">
          <FoodValue
            foodValue={totalFoodValue}
            className="level-left is-size-6"
          />
        </div>
      </div>
      <DailyTrendChart
        title="⚡ Calories"
        data={chartData}
        barFill="hsl(171, 100%, 41%)"
        referenceValue={2000}
        xKey="date"
        yKey="kcal"
      />
      <DailyTrendChart
        title="🥩 Proteins"
        data={chartData}
        barFill="hsl(204, 86%, 53%)"
        referenceValue={100}
        xKey="date"
        yKey="proteins"
      />
      <DailyTrendChart
        title="🧈 Fats"
        data={chartData}
        barFill="hsl(48, 100%, 67%)"
        referenceValue={70}
        xKey="date"
        yKey="fats"
      />
      <DailyTrendChart
        title="🍚 Carbs"
        data={chartData}
        barFill="hsl(348, 100%, 61%)"
        referenceValue={150}
        xKey="date"
        yKey="carbs"
      />
    </Fragment>
  );
}

export default HistoryPage;
