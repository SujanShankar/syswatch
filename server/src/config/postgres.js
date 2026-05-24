import pg from "pg";

let pool;

async function connectPostgres() {
  try {
    pool = new pg.Pool({
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      user: process.env.PG_USER,
      password: String(process.env.PG_PASSWORD),
      database: process.env.PG_DATABASE
    });

    await pool.query("SELECT NOW()");

    console.log("PostgreSQL connected");
  } catch (error) {
    console.error("PostgreSQL connection failed");

    console.error(error);

    process.exit(1);
  }
}

export { pool };

export default connectPostgres;