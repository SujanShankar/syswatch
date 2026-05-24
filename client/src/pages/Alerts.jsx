import { useState } from "react";

import AlertTable from "../components/AlertTable";

function Alerts() {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      metric: "CPU Usage",
      value: "96%",
      severity: "CRITICAL",
      status: "OPEN"
    },
    {
      id: 2,
      metric: "Memory Usage",
      value: "88%",
      severity: "HIGH",
      status: "OPEN"
    },
    {
      id: 3,
      metric: "Disk Usage",
      value: "81%",
      severity: "MEDIUM",
      status: "ACK"
    }
  ]);

  function updateStatus(id, newStatus) {
    setAlerts((prevAlerts) =>
      prevAlerts.map((alert) =>
        alert.id === id
          ? { ...alert, status: newStatus }
          : alert
      )
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-cyan-400">
          Alert Management
        </h1>

        <p className="mt-2 text-zinc-400">
          Monitor, acknowledge, and resolve active system alerts.
        </p>
      </div>

      <AlertTable
        alerts={alerts}
        updateStatus={updateStatus}
      />
    </div>
  );
}

export default Alerts;