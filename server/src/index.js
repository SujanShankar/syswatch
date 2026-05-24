import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import initAlertsTable from "./db/initAlertsTable.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, "../.env")
});

import http from "http";

import app from "./app.js";

import connectMongo from "./config/mongo.js";
import connectPostgres from "./config/postgres.js";

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

async function startServer() {
  await connectMongo();

  await connectPostgres();

await initAlertsTable();

  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();