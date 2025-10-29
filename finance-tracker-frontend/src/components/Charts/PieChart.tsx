"use client";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart({ data }: { data: { labels: string[], values: number[] } }) {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: "Expenses",
        data: data.values,
        backgroundColor: ["#3B82F6", "#EF4444", "#F59E0B", "#10B981"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-64 h-64 mx-auto">
      <Pie data={chartData} options={{ maintainAspectRatio: false }} />
    </div>
  );
}
