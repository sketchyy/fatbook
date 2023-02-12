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
            top: 5,
            right: 20,
            left: 20,
            bottom: 5,
          }}
          barSize={20}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xKey} />
          {/* <YAxis /> */}
          <Tooltip />
          <Bar dataKey={yKey} fill={barFill} />
          <ReferenceLine
            y={referenceValue}
            label={referenceValue}
            stroke="red"
            strokeDasharray="3 3"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default DailyTrendChart;
