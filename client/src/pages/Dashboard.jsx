import {
  useEffect,
  useState
} from "react";

import MetricCard from
  "../components/MetricCard";

import TrendChart from
  "../components/TrendChart";

import { fetchMetrics }
  from "../services/api";

function Dashboard() {
  const [metrics, setMetrics] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  async function loadMetrics() {
    try {
      const response =
        await fetchMetrics();

      setMetrics(response.data);

    } catch (error) {
      console.error(error);

    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMetrics();

    const interval =
      setInterval(
        loadMetrics,
        10000
      );

    return () =>
      clearInterval(interval);

  }, []);

  if (loading) {
    return (
      <div className="text-cyan-400">
        Loading metrics...
      </div>
    );
  }

  const cards = [
    {
      title: "CPU Usage",
      value:
        metrics.cpu
          .usage_percent,

      unit: "%",

      color:
        "text-cyan-400"
    },

    {
      title: "Memory Usage",

      value:
        metrics.memory
          .percent,

      unit: "%",

      color:
        "text-yellow-400"
    },

    {
      title: "Disk Usage",

      value:
        metrics.disk
          .percent,

      unit: "%",

      color:
        "text-green-400"
    },

    {
      title: "System Uptime",

      value:
        metrics
          .uptime_hours,

      unit: "hrs",

      color:
        "text-purple-400"
    }
  ];

  return (
    <div>
      <div className="mb-8">
        <h1
          className="
            text-4xl
            font-bold
            text-cyan-400
          "
        >
          Live System Dashboard
        </h1>

        <p
          className="
            mt-2
            text-zinc-400
          "
        >
          Real-time firmware
          and system health
          monitoring.
        </p>
      </div>

      <div
        className="
          grid
          gap-6
          md:grid-cols-2
          xl:grid-cols-4
        "
      >
        {cards.map((metric) => (
          <MetricCard
            key={metric.title}

            title={metric.title}

            value={metric.value}

            unit={metric.unit}

            color={metric.color}
          />
        ))}
      </div>

      <div className="mt-8">
        <TrendChart />
      </div>
    </div>
  );
}

export default Dashboard;