function MetricCard({ title, value, unit, color }) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-lg">
      <h2 className="text-sm uppercase tracking-wide text-zinc-400">
        {title}
      </h2>

      <div className="mt-4 flex items-end gap-2">
        <span className={`text-4xl font-bold ${color}`}>
          {value}
        </span>

        <span className="pb-1 text-zinc-400">
          {unit}
        </span>
      </div>
    </div>
  );
}

export default MetricCard;