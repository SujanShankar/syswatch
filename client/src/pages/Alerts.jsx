import {
  useEffect,
  useState
} from "react";

import api from
  "../services/api";

function Alerts() {

  const [alerts, setAlerts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  async function fetchAlerts() {

    try {

      const response =
        await api.get(
          "/alerts"
        );

      setAlerts(
        response.data.data
      );

    } catch (error) {

      console.error(
        "Failed to fetch alerts"
      );

    } finally {

      setLoading(false);
    }
  }

  async function acknowledgeAlert(
    id
  ) {

    try {

      await api.patch(
        `/alerts/${id}/ack`
      );

      fetchAlerts();

    } catch (error) {

      console.error(
        "Failed to acknowledge alert"
      );
    }
  }

  async function resolveAlert(
    id
  ) {

    try {

      await api.patch(
        `/alerts/${id}/resolve`
      );

      fetchAlerts();

    } catch (error) {

      console.error(
        "Failed to resolve alert"
      );
    }
  }

  useEffect(() => {

    fetchAlerts();

    const interval =
      setInterval(
        fetchAlerts,
        5000
      );

    return () =>
      clearInterval(interval);

  }, []);

  function getSeverityColor(level) {

    switch (level) {

      case "CRITICAL":
        return "bg-red-500/20 text-red-400";

      case "WARNING":
        return "bg-yellow-500/20 text-yellow-400";

      case "HIGH":
        return "bg-orange-500/20 text-orange-400";

      default:
        return "bg-cyan-500/20 text-cyan-400";
    }
  }

  return (

    <div>

      <div className="mb-8">

        <h1
          className="
            text-4xl
            font-bold
            text-cyan-400
          "
        >
          Alert Management
        </h1>

        <p
          className="
            mt-2
            text-zinc-400
          "
        >
          Real-time system alerts
          from backend engine.
        </p>

      </div>

      <div
        className="
          overflow-hidden
          rounded-2xl
          border
          border-zinc-800
          bg-zinc-900/60
        "
      >

        <table className="w-full">

          <thead
            className="
              border-b
              border-zinc-800
              bg-zinc-900
            "
          >

            <tr>

              <th
                className="
                  px-6
                  py-4
                  text-left
                  text-sm
                  text-zinc-400
                "
              >
                Metric
              </th>

              <th
                className="
                  px-6
                  py-4
                  text-left
                  text-sm
                  text-zinc-400
                "
              >
                Value
              </th>

              <th
                className="
                  px-6
                  py-4
                  text-left
                  text-sm
                  text-zinc-400
                "
              >
                Severity
              </th>

              <th
                className="
                  px-6
                  py-4
                  text-left
                  text-sm
                  text-zinc-400
                "
              >
                Status
              </th>

              <th
                className="
                  px-6
                  py-4
                  text-left
                  text-sm
                  text-zinc-400
                "
              >
                Time
              </th>

            </tr>

          </thead>

          <tbody>

            {
              loading ? (

                <tr>

                  <td
                    colSpan="5"
                    className="
                      py-10
                      text-center
                      text-zinc-500
                    "
                  >
                    Loading alerts...
                  </td>

                </tr>

              ) : alerts.length === 0 ? (

                <tr>

                  <td
                    colSpan="5"
                    className="
                      py-10
                      text-center
                      text-zinc-500
                    "
                  >
                    No alerts found.
                  </td>

                </tr>

              ) : (

                alerts.map((alert) => (

                  <tr
                    key={alert.id}
                    className="
                      border-b
                      border-zinc-800/50
                    "
                  >

                    <td
                      className="
                        px-6
                        py-4
                        text-sm
                      "
                    >
                      {alert.metric}
                    </td>

                    <td
                      className="
                        px-6
                        py-4
                        text-sm
                      "
                    >
                      {alert.value}
                    </td>

                    <td
                      className="
                        px-6
                        py-4
                      "
                    >

                      <span
                        className={`
                          rounded-full
                          px-3
                          py-1
                          text-xs
                          font-semibold
                          ${getSeverityColor(
                            alert.level
                          )}
                        `}
                      >
                        {alert.level}
                      </span>

                    </td>

                    <td
                      className="
                        px-6
                        py-4
                      "
                    >

                      <div
                        className="
                          flex
                          items-center
                          gap-2
                        "
                      >

                        <span
                          className="
                            text-sm
                            text-cyan-400
                          "
                        >
                          {alert.status}
                        </span>

                        {
                          alert.status === "OPEN" && (

                            <button

                              onClick={() =>
                                acknowledgeAlert(
                                  alert.id
                                )
                              }

                              className="
                                rounded-lg
                                bg-yellow-500/20
                                px-3
                                py-1
                                text-xs
                                text-yellow-400
                                transition
                                hover:bg-yellow-500/30
                              "
                            >
                              ACK
                            </button>
                          )
                        }

                        {
                          alert.status !== "RESOLVED" && (

                            <button

                              onClick={() =>
                                resolveAlert(
                                  alert.id
                                )
                              }

                              className="
                                rounded-lg
                                bg-red-500/20
                                px-3
                                py-1
                                text-xs
                                text-red-400
                                transition
                                hover:bg-red-500/30
                              "
                            >
                              Resolve
                            </button>
                          )
                        }

                      </div>

                    </td>

                    <td
                      className="
                        px-6
                        py-4
                        text-sm
                        text-zinc-400
                      "
                    >
                      {
                        new Date(
                          alert.triggered_at
                        ).toLocaleString()
                      }
                    </td>

                  </tr>
                ))
              )
            }

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Alerts;