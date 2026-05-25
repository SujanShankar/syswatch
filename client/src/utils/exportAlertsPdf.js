import jsPDF from "jspdf";

import autoTable from
  "jspdf-autotable";

export default function exportAlertsPdf(
  alerts
) {

  const doc =
    new jsPDF();

  doc.setFontSize(22);

  doc.text(
    "SysWatch Alerts Report",
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
    alerts.map(
      (alert) => [

        alert.metric,

        alert.value,

        alert.level,

        alert.status,

        new Date(
          alert.triggered_at
        ).toLocaleString()
      ]
    );

  autoTable(
    doc,
    {

      startY: 40,

      head: [[
        "Metric",
        "Value",
        "Level",
        "Status",
        "Triggered At"
      ]],

      body: tableData
    }
  );

  doc.save(
    `syswatch-alerts-${
      Date.now()
    }.pdf`
  );
}