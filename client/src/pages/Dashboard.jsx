import TrendChart from "../components/TrendChart";
import MetricCard from "../components/MetricCard";

function Dashboard() {
  const metrics = [
    {
      title: "CPU Usage",
      value: 42,
      unit: "%",
      color: "text-cyan-400"
    },
    {
      title: "Memory Usage",
      value: 68,
      unit: "%",
      color: "text-yellow-400"
    },
    {
      title: "Disk Usage",
      value: 51,
      unit: "%",
      color: "text-green-400"
    },
    {
      title: "System Uptime",
      value: 12,
      unit: "hrs",
      color: "text-purple-400"
    }
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-cyan-400">
          Live System Dashboard
        </h1>

        <p className="mt-2 text-zinc-400">
          Real-time firmware and system health monitoring.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <MetricCard
            key={metric.title}
            title={metric.title}
            value={metric.value}
            unit={metric.unit}
            color={metric.color}
          />
        ))}
      </div>

      <TrendChart />
    </div>
  );
}

export default Dashboard;