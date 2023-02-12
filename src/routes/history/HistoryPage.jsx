import React, { Fragment, useEffect, useState } from "react";
import eatingsDbService from "../../core/firebase/eatingsDbService";
import PageTitle from "../../shared/components/PageTitle";
import dateService from "../../shared/services/dateService";
import DailyTrendChart from "./DailyTrendChart";

function HistoryPage({ props }) {
  const [chartData, setChartData] = useState([]);
  const lastSevenDays = dateService.getLastXDays(7, dateService.now());

  useEffect(() => {
    const fetchData = async () => {
      const logDays = await Promise.all(
        lastSevenDays.map(
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
    };

    fetchData();
  }, []);

  return (
    <Fragment>
      <div className="box">
        <PageTitle title="Trend for last 7 days" />
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
