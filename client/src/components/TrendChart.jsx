import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function TrendChart() {
  const data = {
    labels: ["0m", "5m", "10m", "15m", "20m", "25m", "30m"],

    datasets: [
      {
        label: "CPU Usage %",
        data: [35, 42, 38, 55, 49, 60, 52],
        borderColor: "#22d3ee",
        backgroundColor: "#22d3ee",
        tension: 0.4
      }
    ]
  };

  const options = {
    responsive: true,

    plugins: {
      legend: {
        labels: {
          color: "white"
        }
      }
    },

    scales: {
      x: {
        ticks: {
          color: "#a1a1aa"
        },

        grid: {
          color: "#27272a"
        }
      },

      y: {
        ticks: {
          color: "#a1a1aa"
        },

        grid: {
          color: "#27272a"
        }
      }
    }
  };

  return (
    <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <h2 className="mb-6 text-xl font-semibold text-cyan-400">
        CPU Usage Trend
      </h2>

      <Line data={data} options={options} />
    </div>
  );
}

export default TrendChart;