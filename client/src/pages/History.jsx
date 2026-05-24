import TrendChart from "../components/TrendChart";
import StatusPill from "../components/StatusPill";

function History() {
  const logRuns = [
    {
      id: 1,
      filename: "thermal_validation.log",
      verdict: "FAIL",
      analyzedAt: "2026-05-24 18:20"
    },
    {
      id: 2,
      filename: "boot_sequence.log",
      verdict: "PASS",
      analyzedAt: "2026-05-24 17:42"
    },
    {
      id: 3,
      filename: "memory_stress.log",
      verdict: "FAIL",
      analyzedAt: "2026-05-24 16:15"
    }
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-cyan-400">
          History & Trends
        </h1>

        <p className="mt-2 text-zinc-400">
          Historical system metrics and firmware validation runs.
        </p>
      </div>

      <TrendChart />

      <div className="mt-8 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">
        <div className="border-b border-zinc-800 p-4">
          <h2 className="text-xl font-semibold text-cyan-400">
            Recent Log Analysis Runs
          </h2>
        </div>

        <table className="w-full">
          <thead className="bg-zinc-800/50">
            <tr>
              <th className="px-4 py-3 text-left text-sm text-zinc-400">
                Filename
              </th>

              <th className="px-4 py-3 text-left text-sm text-zinc-400">
                Verdict
              </th>

              <th className="px-4 py-3 text-left text-sm text-zinc-400">
                Analyzed At
              </th>
            </tr>
          </thead>

          <tbody>
            {logRuns.map((run) => (
              <tr
                key={run.id}
                className="border-t border-zinc-800"
              >
                <td className="px-4 py-4 text-zinc-300">
                  {run.filename}
                </td>

                <td className="px-4 py-4">
                  <StatusPill status={run.verdict} />
                </td>

                <td className="px-4 py-4 text-zinc-400">
                  {run.analyzedAt}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default History;