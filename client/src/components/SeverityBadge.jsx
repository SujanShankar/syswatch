function SeverityBadge({ severity }) {
  const colors = {
    CRITICAL: "bg-red-500/20 text-red-400 border-red-500/30",
    HIGH: "bg-orange-500/20 text-orange-400 border-orange-500/30",
    MEDIUM: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    INFO: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30"
  };

  return (
    <span
      className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
        colors[severity] || colors.INFO
      }`}
    >
      {severity}
    </span>
  );
}

export default SeverityBadge;