import {
  useState
} from "react";

import UploadDropzone
  from "../components/UploadDropzone";

import SeverityBadge
  from "../components/SeverityBadge";

import LogViewer
  from "../components/LogViewer";

import Loader
  from "../components/Loader";

import {
  analyzeLog
} from "../services/api";

function LogAnalyzer() {

  const [loading, setLoading] =
    useState(false);

  const [results, setResults] =
    useState(null);

  async function handleUpload(file) {

    try {
      setLoading(true);

      const formData =
        new FormData();

      formData.append(
        "logfile",
        file
      );

      const response =
        await analyzeLog(formData);

      setResults(response.data);

    } catch (error) {

      console.error(error);

      alert(
        "Failed to analyze log"
      );

    } finally {

      setLoading(false);
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
          Firmware Log Analyzer
        </h1>

        <p
          className="
            mt-2
            text-zinc-400
          "
        >
          Upload validation logs
          and detect firmware
          or system failures.
        </p>

      </div>

      <UploadDropzone
        onUpload={handleUpload}
      />

      {loading && (
        <div className="mt-8">
          <Loader />
        </div>
      )}

      {results && !loading && (

        <div className="mt-8 space-y-6">

          <div
            className="
              flex
              items-center
              justify-between
              rounded-2xl
              border
              border-zinc-800
              bg-zinc-900/70
              p-5
            "
          >

            <div>

              <h2
                className="
                  text-xl
                  font-semibold
                  text-white
                "
              >
                {results.filename}
              </h2>

              <p
                className="
                  mt-1
                  text-sm
                  text-zinc-400
                "
              >
                Analysis completed
                successfully.
              </p>

            </div>

            <SeverityBadge
              severity={
                results.verdict
              }
            />

          </div>

          <div
            className="
              overflow-hidden
              rounded-2xl
              border
              border-zinc-800
              bg-zinc-900/70
            "
          >

            <div
              className="
                border-b
                border-zinc-800
                p-4
              "
            >

              <h3
                className="
                  text-xl
                  font-semibold
                  text-cyan-400
                "
              >
                Detected Log Matches
              </h3>

            </div>

            <table className="w-full">

              <thead
                className="
                  bg-zinc-800/40
                  text-left
                  text-sm
                  text-zinc-400
                "
              >

                <tr>

                  <th className="p-4">
                    Line
                  </th>

                  <th className="p-4">
                    Pattern
                  </th>

                  <th className="p-4">
                    Severity
                  </th>

                  <th className="p-4">
                    Content
                  </th>

                </tr>

              </thead>

              <tbody>

                {results.matches.map(
                  (match, index) => (

                  <tr
                    key={index}

                    className="
                      border-t
                      border-zinc-800
                      text-sm
                    "
                  >

                    <td className="p-4">
                      {match.line_number}
                    </td>

                    <td className="p-4">
                      {match.pattern}
                    </td>

                    <td className="p-4">

                      <SeverityBadge
                        severity={
                          match.severity
                        }
                      />

                    </td>

                    <td
                      className="
                        p-4
                        font-mono
                        text-xs
                        text-zinc-300
                      "
                    >
                      {match.content}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

          <LogViewer
            matches={results.matches}
          />

        </div>

      )}

    </div>
  );
}

export default LogAnalyzer;