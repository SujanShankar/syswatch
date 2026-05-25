import pg from "pg";

const { Pool } = pg;

console.log("POSTGRES ENV CHECK:", {
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE
});

const pool = new Pool({
  host: "127.0.0.1",
  port: 5433,
  user: "postgres",
  password: "postgres",
  database: "syswatch"
});

export async function connectPostgres() {

  try {

    const result =
      await pool.query(
        "SELECT NOW()"
      );

    console.log(
      "PostgreSQL connected"
    );

    console.log(result.rows);

  } catch (error) {

    console.error(
      "PostgreSQL connection failed"
    );

    console.error(error);

    process.exit(1);
  }
}

export default pool;