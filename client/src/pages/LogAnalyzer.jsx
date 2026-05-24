import { useState } from "react";

import UploadDropzone from "../components/UploadDropzone";
import StatusPill from "../components/StatusPill";
import LogMatchTable from "../components/LogMatchTable";
import LogViewer from "../components/LogViewer";

function LogAnalyzer() {
  const [uploadedFile, setUploadedFile] = useState(null);

  const mockMatches = [
    {
      line: 42,
      pattern: "kernel_panic",
      severity: "CRITICAL",
      content: "Kernel Panic - Fatal exception detected"
    },
    {
      line: 87,
      pattern: "cpu_throttle",
      severity: "MEDIUM",
      content: "CPU thermal throttling activated"
    },
    {
      line: 120,
      pattern: "firmware_fail",
      severity: "HIGH",
      content: "BIOS firmware validation failed"
    }
  ];

  const mockLogs = [
    "[INFO] System boot initialized",
    "[INFO] Loading firmware modules",
    "[WARN] CPU temperature rising",
    "[ERROR] Kernel Panic - Fatal exception detected",
    "[WARN] CPU thermal throttling activated",
    "[ERROR] BIOS firmware validation failed"
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-cyan-400">
          Firmware Log Analyzer
        </h1>

        <p className="mt-2 text-zinc-400">
          Upload validation logs and detect firmware/system failures.
        </p>
      </div>

      <UploadDropzone onFileUpload={setUploadedFile} />

      {uploadedFile && (
        <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white">
                {uploadedFile.name}
              </h2>

              <p className="mt-1 text-zinc-400">
                Log analysis completed successfully.
              </p>
            </div>

            <StatusPill status="FAIL" />
          </div>
        </div>
      )}

      {uploadedFile && (
        <>
          <LogMatchTable matches={mockMatches} />

          <LogViewer logs={mockLogs} />
        </>
      )}
    </div>
  );
}

export default LogAnalyzer;