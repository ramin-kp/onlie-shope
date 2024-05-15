import React from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function ChartBox({ charts }) {
  return (
    <div className="py-5 my-10 font-dana text-zinc-900 dark:text-gray-400 border-t border-gray-300 dark:border-gray-700">
      <h1 className="pt-2.5 font-danaBold text-lg md:text-xl text-zinc-900 dark:text-white ">
        میزان فروش
      </h1>
      <ResponsiveContainer width="100%" aspect={3}>
        <LineChart data={charts} margin={{ top: 25, bottom: 10, right: 5 }}>
          <CartesianGrid strokeDasharray="10" />
          <XAxis dataKey="name" stroke="#dc2626" />
          <YAxis stroke="#dc2626" dx={-53} />
          <Tooltip />
          <Line type="monotone" dataKey="price" stroke="#dc2626" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ChartBox;
