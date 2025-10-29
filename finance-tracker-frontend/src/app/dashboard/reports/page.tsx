"use client";
import BarChart from "@/components/Charts/BarChart";
import LineChart from "@/components/Charts/LineChart";
import PieChart from "@/components/Charts/PieChart";
import { useEffect, useState } from "react";


export default function ReportsPage() {
  const [barData, setBarData] = useState<{ labels: string[]; values: number[] }>({ labels: [], values: [] });
  const [lineData, setLineData] = useState<{ labels: string[]; values: number[] }>({ labels: [], values: [] });
  const [pieData, setPieData] = useState<{ labels: string[]; values: number[] }>({ labels: [], values: [] });

  useEffect(() => {
    setBarData({
      labels: ["Food", "Rent", "Transport", "Shopping", "Bills"],
      values: [5000, 12000, 3000, 7000, 2500],
    });

    setLineData({
      labels: ["Jan", "Feb", "Mar", "Apr", "May"],
      values: [10000, 8000, 9500, 12000, 11000],
    });

    setPieData({
      labels: ["Food", "Rent", "Transport", "Shopping"],
      values: [5000, 12000, 3000, 7000],
    });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-extrabold mb-6 text-gray-800">📊 Reports & Analytics</h1>
      <p className="text-gray-600 mb-8 text-lg">
        Visualize your spending and income trends with charts and analytics.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition">
          <h2 className="text-xl font-bold mb-4 text-blue-600">Expenses by Category</h2>
          <BarChart data={barData} />
        </div>

        {/* Line Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition">
          <h2 className="text-xl font-bold mb-4 text-green-600">Expenses Over Time</h2>
          <LineChart data={lineData} />
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition md:col-span-2">
          <h2 className="text-xl font-bold mb-4 text-purple-600">Expense Distribution</h2>
          <PieChart data={pieData} />
        </div>
      </div>
    </div>
  );
}
