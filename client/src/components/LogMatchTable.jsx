import SeverityBadge from "./SeverityBadge";

function LogMatchTable({ matches }) {
  return (
    <div className="mt-8 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">
      <div className="border-b border-zinc-800 p-4">
        <h2 className="text-xl font-semibold text-cyan-400">
          Detected Log Matches
        </h2>
      </div>

      <table className="w-full">
        <thead className="bg-zinc-800/50">
          <tr>
            <th className="px-4 py-3 text-left text-sm text-zinc-400">
              Line
            </th>

            <th className="px-4 py-3 text-left text-sm text-zinc-400">
              Pattern
            </th>

            <th className="px-4 py-3 text-left text-sm text-zinc-400">
              Severity
            </th>

            <th className="px-4 py-3 text-left text-sm text-zinc-400">
              Content
            </th>
          </tr>
        </thead>

        <tbody>
          {matches.map((match, index) => (
            <tr
              key={index}
              className="border-t border-zinc-800"
            >
              <td className="px-4 py-4 text-zinc-300">
                {match.line}
              </td>

              <td className="px-4 py-4 text-zinc-300">
                {match.pattern}
              </td>

              <td className="px-4 py-4">
                <SeverityBadge severity={match.severity} />
              </td>

              <td className="px-4 py-4 font-mono text-sm text-zinc-400">
                {match.content}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LogMatchTable;