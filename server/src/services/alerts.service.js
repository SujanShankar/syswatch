import pool from
  "../config/postgres.js";

import {
  runPythonScript
} from "../lib/pythonBridge.js";

export async function evaluateAlerts(
  snapshot
) {

  try {

    const alerts =
    
      await runPythonScript(
        "alert_engine.py",
        [
          JSON.stringify(snapshot)
        ]
      );
     

    for (const alert of alerts) {

      await pool.query(

        `
        INSERT INTO alerts
        (
          metric,
          value,
          level,
          message,
          triggered_at,
          status
        )

        VALUES
        (
          $1,
          $2,
          $3,
          $4,
          NOW(),
          'OPEN'
        )
        `,

        [
          alert.metric,
          alert.value,
          alert.level,
          alert.message
        ]
      );
    }

  } catch (error) {

    console.error(
      "Alert evaluation failed"
    );

    console.error(error);
  }
}