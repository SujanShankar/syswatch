import {
  useEffect,
  useState
} from "react";

import MetricCard from
  "../components/MetricCard";

import TrendChart from
  "../components/TrendChart";

import api from
  "../services/api";

import socket from
  "../services/socket";

function Dashboard() {

  const [metrics, setMetrics] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  async function fetchMetrics() {

    try {

      const response =
        await api.get(
          "/metrics"
        );

      setMetrics(
        response.data.data
      );

    } catch (error) {

      console.error(
        "Failed to fetch metrics"
      );

    } finally {

      setLoading(false);
    }
  }

  useEffect(() => {

    fetchMetrics();

    socket.on(
      "metrics:update",

      (liveMetrics) => {

        setMetrics(
          liveMetrics
        );
      }
    );

    const interval =
      setInterval(
        fetchMetrics,
        10000
      );

    return () => {

      clearInterval(interval);

      socket.off(
        "metrics:update"
      );
    };

  }, []);

  if (loading || !metrics) {

    return (

      <div
        className="
          flex
          h-[60vh]
          items-center
          justify-center
        "
      >

        <div
          className="
            h-12
            w-12
            animate-spin
            rounded-full
            border-4
            border-cyan-400
            border-t-transparent
          "
        />

      </div>
    );
  }

  const cards = [

    {
      title: "CPU Usage",

      value:
        metrics.cpu.usage_percent,

      unit: "%",

      color:
        "text-cyan-400"
    },

    {
      title: "Memory Usage",

      value:
        metrics.memory.percent,

      unit: "%",

      color:
        "text-yellow-400"
    },

    {
      title: "Disk Usage",

      value:
        metrics.disk.percent,

      unit: "%",

      color:
        "text-green-400"
    },

    {
      title: "System Uptime",

      value:
        metrics.uptime_hours,

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
          Real-time firmware and
          system health monitoring.
        </p>

      </div>

      <div
        className={`
          mb-8
          rounded-3xl
          p-6
          text-2xl
          font-bold

          ${
            metrics?.health?.status ===
            "CRITICAL"

              ? "bg-red-900 text-red-300"

              : metrics?.health?.status ===
                "DEGRADED"

              ? "bg-yellow-900 text-yellow-300"

              : "bg-green-900 text-green-300"
          }
        `}
      >

        SYSTEM STATUS:
        {" "}

        {
          metrics?.health?.status
        }

        {" • "}

        SCORE:
        {" "}

        {
          metrics?.health?.score
        }

      </div>

      <div
        className="
          grid
          gap-6
          md:grid-cols-2
          xl:grid-cols-4
        "
      >

        {
          cards.map(
            (metric) => (

              <MetricCard

                key={metric.title}

                title={metric.title}

                value={metric.value}

                unit={metric.unit}

                color={metric.color}
              />
            )
          )
        }

      </div>

      <div
        className="
          mt-8
          grid
          gap-6
          md:grid-cols-3
        "
      >

        <div className="metric-card">

          <h3>
            SYSTEM HEALTH
          </h3>

          <div
            style={{
              color:
                metrics?.health?.status ===
                "HEALTHY"

                  ? "#00ff88"

                  : metrics?.health?.status ===
                    "DEGRADED"

                  ? "#ffcc00"

                  : "#ff4d4d",

              fontSize: "2rem",

              fontWeight: "bold",

              marginTop: "15px"
            }}
          >

            {
              metrics?.health?.status ===
              "HEALTHY"

              &&

              "✅ HEALTHY"
            }

            {
              metrics?.health?.status ===
              "DEGRADED"

              &&

              "⚠️ DEGRADED"
            }

            {
              metrics?.health?.status ===
              "CRITICAL"

              &&

              "🔴 CRITICAL"
            }

          </div>

        </div>

      </div>

      <div className="mt-10">

        <TrendChart />

      </div>

    </div>
  );
}

export default Dashboard;