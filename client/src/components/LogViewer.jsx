function LogViewer({ logs }) {
  return (
    <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <h2 className="mb-4 text-xl font-semibold text-cyan-400">
        Raw Log Preview
      </h2>

      <div className="max-h-96 overflow-y-auto rounded-lg bg-black p-4 font-mono text-sm text-zinc-300">
        {logs.map((line, index) => (
          <div
            key={index}
            className="border-b border-zinc-800 py-1"
          >
            {line}
          </div>
        ))}
      </div>
    </div>
  );
}

export default LogViewer;