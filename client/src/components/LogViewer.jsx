function LogViewer({
  matches
}) {

  return (

    <div
      className="
        rounded-2xl
        border
        border-zinc-800
        bg-zinc-900/70
        p-5
      "
    >

      <h2
        className="
          mb-4
          text-2xl
          font-semibold
          text-cyan-400
        "
      >
        Raw Log Preview
      </h2>

      <div
        className="
          space-y-2
          rounded-xl
          bg-black
          p-4
          font-mono
          text-xs
          text-zinc-300
        "
      >

        {matches.map(
          (match, index) => (

          <div
            key={index}

            className="
              border-b
              border-zinc-800
              pb-2
            "
          >
            {match.content}
          </div>

        ))}

      </div>

    </div>
  );
}

export default LogViewer;