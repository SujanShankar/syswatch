function StatusPill({ status }) {
  const styles = {
    PASS: "bg-green-500/20 text-green-400 border-green-500/30",
    FAIL: "bg-red-500/20 text-red-400 border-red-500/30",
    OPEN: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    ACK: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
    RESOLVED: "bg-green-500/20 text-green-400 border-green-500/30"
  };

  return (
    <span
      className={`rounded-full border px-4 py-1 text-sm font-semibold ${
        styles[status]
      }`}
    >
      {status}
    </span>
  );
}

export default StatusPill;