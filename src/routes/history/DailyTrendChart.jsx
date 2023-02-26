import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";

function DailyTrendChart({ title, data, barFill, referenceValue, xKey, yKey }) {
  return (
    <div className="box">
      <span>{title}</span>
      <ResponsiveContainer width="100%" height={150}>
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 20,
            left: 50,
            bottom: 5,
          }}
          barSize={20}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xKey} tick={{ fontSize: 12 }} />
          {/* <YAxis /> */}
          <Tooltip />
          <Bar
            dataKey={yKey}
            fill={barFill}
            label={{ fontSize: 9, fill: "hsl(0, 0%, 14%)", position: "top" }}
          />
          <ReferenceLine
            y={referenceValue}
            label={{ position: "left", value: referenceValue, fontSize: 12 }}
            stroke="red"
            strokeDasharray="3 3"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default DailyTrendChart;
