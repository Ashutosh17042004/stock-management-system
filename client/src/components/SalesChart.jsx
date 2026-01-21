import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";

function SalesChart() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    axiosClient.get("/sales")
      .then((res) => {
        const raw = res.data;

        const daily = {};
        raw.forEach((sale) => {
          const date = new Date(sale.soldAt).toLocaleDateString();
          if (!daily[date]) daily[date] = 0;
          daily[date] += sale.totalAmount;
        });

        const formatted = Object.keys(daily).map((date) => ({
          date,
          total: daily[date],
        }));

        setChartData(formatted);
      })
      .catch((err) => console.error("Chart fetch error", err));
  }, []);

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-6 w-full">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
        Sales Trend
      </h2>

      <div className="w-full h-64 sm:h-80 lg:h-96">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <XAxis dataKey="date" className="text-xs text-gray-600" />
            <YAxis className="text-xs text-gray-600" />
            <Tooltip
              contentStyle={{ backgroundColor: "#ffffff", borderRadius: "8px" }}
              formatter={(value) => [`₹${value.toLocaleString()}`, "Total Sales"]}
            />
            <Line type="monotone" dataKey="total" stroke="#6366F1" strokeWidth={2} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default SalesChart;
