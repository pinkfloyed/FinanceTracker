"use client";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function BarChart({ data }: { data: { labels: string[], values: number[] } }) {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: "Expenses",
        data: data.values,
        backgroundColor: "#3B82F6",
      },
    ],
  };

  return <Bar data={chartData} />;
}
