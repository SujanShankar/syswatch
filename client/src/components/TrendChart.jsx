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

import api
from "../services/api";

function TrendChart() {

  const [

    history,
    setHistory

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

      setHistory(
        response.data.data
      );

    } catch (error) {

      console.error(error);
    }
  }

  return (

    <div className="bg-zinc-900 p-6 rounded-3xl">

      <h2 className="text-2xl font-bold text-cyan-400 mb-6">

        CPU Usage Trend

      </h2>

      <ResponsiveContainer
        width="100%"
        height={350}
      >

        <LineChart
          data={history}
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

        </LineChart>

      </ResponsiveContainer>

    </div>
  );
}

export default TrendChart;