"use client";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function LineChart({ data }: { data: { labels: string[], values: number[] } }) {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: "Expenses Over Time",
        data: data.values,
        borderColor: "#3B82F6",
        backgroundColor: "#93C5FD",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  return <Line data={chartData} />;
}
