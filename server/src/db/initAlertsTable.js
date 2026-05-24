import { pool } from "../config/postgres.js";

async function initAlertsTable() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS alerts (
        id UUID PRIMARY KEY,
        metric VARCHAR(50),
        value FLOAT,
        level VARCHAR(20),
        message TEXT,
        triggered_at TIMESTAMP,
        acknowledged_at TIMESTAMP,
        resolved_at TIMESTAMP,
        status VARCHAR(20) DEFAULT 'OPEN'
      );
    `);

    console.log("Alerts table ready");
  } catch (error) {
    console.error("Failed to initialize alerts table");

    console.error(error);
  }
}

export default initAlertsTable;