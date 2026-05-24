import SeverityBadge from "./SeverityBadge";
import StatusPill from "./StatusPill";

function AlertTable({ alerts, updateStatus }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">
      <div className="border-b border-zinc-800 p-4">
        <h2 className="text-xl font-semibold text-cyan-400">
          Active System Alerts
        </h2>
      </div>

      <table className="w-full">
        <thead className="bg-zinc-800/50">
          <tr>
            <th className="px-4 py-3 text-left text-sm text-zinc-400">
              Metric
            </th>

            <th className="px-4 py-3 text-left text-sm text-zinc-400">
              Value
            </th>

            <th className="px-4 py-3 text-left text-sm text-zinc-400">
              Severity
            </th>

            <th className="px-4 py-3 text-left text-sm text-zinc-400">
              Status
            </th>

            <th className="px-4 py-3 text-left text-sm text-zinc-400">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {alerts.map((alert) => (
            <tr
              key={alert.id}
              className="border-t border-zinc-800"
            >
              <td className="px-4 py-4 text-zinc-300">
                {alert.metric}
              </td>

              <td className="px-4 py-4 text-zinc-300">
                {alert.value}
              </td>

              <td className="px-4 py-4">
                <SeverityBadge severity={alert.severity} />
              </td>

              <td className="px-4 py-4">
                <StatusPill status={alert.status} />
              </td>

              <td className="px-4 py-4">
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      updateStatus(alert.id, "ACK")
                    }
                    className="rounded-lg bg-cyan-500 px-3 py-1 text-sm font-semibold text-black transition hover:bg-cyan-400"
                  >
                    ACK
                  </button>

                  <button
                    onClick={() =>
                      updateStatus(alert.id, "RESOLVED")
                    }
                    className="rounded-lg bg-green-500 px-3 py-1 text-sm font-semibold text-black transition hover:bg-green-400"
                  >
                    Resolve
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AlertTable;