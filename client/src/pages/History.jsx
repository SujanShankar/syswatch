import {

  useEffect,
  useState

} from "react";

import {

  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer

} from "recharts";

import api from "../services/api";

import exportMetricsPdf from "../utils/exportMetricsPdf";

function History() {

  const [

    metrics,
    setMetrics

  ] = useState([]);

  useEffect(() => {

    fetchHistory();

  }, []);

  async function fetchHistory() {

    try {

      const response =
        await api.get(
          "/history"
        );

      setMetrics(
        response.data.data
      );

    } catch (error) {

      console.error(error);
    }
  }

  return (

    <div className="p-8 text-white">

      <h1 className="text-5xl font-bold text-cyan-400 mb-8">

        System History

      </h1>
     
     <div className="mb-6">

  <button
    onClick={() =>
      exportMetricsPdf(metrics)
    }

    className="
      rounded-xl
      bg-cyan-500
      px-5
      py-3
      font-semibold
      text-black
      transition
      hover:bg-cyan-400
    "
  >
    Download Metrics PDF
  </button>

</div>

      <div className="bg-zinc-900 p-6 rounded-2xl">

        <ResponsiveContainer
          width="100%"
          height={400}
        >

          <LineChart
            data={metrics}
          >

            <CartesianGrid
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="timestamp"
            />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="cpu.usage_percent"
              stroke="#00d9ff"
            />

            <Line
              type="monotone"
              dataKey="memory.percent"
              stroke="#ffcc00"
            />

            <Line
              type="monotone"
              dataKey="disk.percent"
              stroke="#00ff88"
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default History;