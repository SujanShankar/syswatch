import dotenv from "dotenv";

dotenv.config();
import app from "./app.js";

import connectMongo
  from "./config/mongo.js";

import {
  connectPostgres
} from "./config/postgres.js";

import initAlertsTable
  from "./db/initAlertsTable.js";

const PORT =
  process.env.PORT || 5000;

async function startServer() {

  await connectMongo();

  await connectPostgres();

  await initAlertsTable();

  app.listen(
    PORT,
    () => {

      console.log(
        `Server running on port ${PORT}`
      );
    }
  );
}

startServer();