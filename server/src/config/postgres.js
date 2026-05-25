import pg from "pg";

const { Pool } = pg;

const pool = new Pool({

  host:
    process.env.PG_HOST,

  port:
    process.env.PG_PORT,

  user:
    process.env.PG_USER,

  password:
    process.env.PG_PASSWORD,

  database:
    process.env.PG_DATABASE
});

export async function connectPostgres() {

  try {

    const client =
      await pool.connect();

    console.log(
      "PostgreSQL connected"
    );

    const result =
      await client.query(
        "SELECT NOW()"
      );

    console.log(
      result.rows
    );

    client.release();

  } catch (error) {

    console.error(
      "PostgreSQL connection failed"
    );

    console.error(error);

    process.exit(1);
  }
}

export default pool;