import jsPDF from "jspdf";

import autoTable from
  "jspdf-autotable";

export default function exportMetricsPdf(
  metrics
) {

  const doc =
    new jsPDF();

  doc.setFontSize(22);

  doc.text(
    "SysWatch Metrics Report",
    14,
    20
  );

  doc.setFontSize(11);

  doc.text(
    `Generated: ${
      new Date()
        .toLocaleString()
    }`,
    14,
    30
  );

  const tableData =
    metrics.map(
      (metric) => [

        new Date(
          metric.timestamp
        ).toLocaleString(),

        metric.cpu
          ?.usage_percent,

        metric.memory
          ?.percent,

        metric.disk
          ?.percent,

        metric.uptime_hours
      ]
    );

  autoTable(
    doc,
    {

      startY: 40,

      head: [[
        "Timestamp",
        "CPU %",
        "Memory %",
        "Disk %",
        "Uptime (hrs)"
      ]],

      body: tableData
    }
  );

  doc.save(
    `syswatch-metrics-${
      Date.now()
    }.pdf`
  );
}