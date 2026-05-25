import dotenv from "dotenv";

dotenv.config();
import app from "./app.js";

import connectMongo from "./config/mongo.js";

import {
  connectPostgres
} from "./config/postgres.js";

import initAlertsTable from "./db/initAlertsTable.js";

import historyRoutes from "./routes/history.js";

import { Server } from "socket.io";

const PORT = process.env.PORT || 5000;

async function startServer() {

  await connectMongo();

  await connectPostgres();

  await initAlertsTable();

  const server =
  app.listen(PORT, () => {

    console.log(
      `Server running on port ${PORT}`
    );
  });

const io = new Server(
  server,
  {
    cors: {
      origin:
        process.env.CLIENT_URL
    }
  }
);

global.io = io;

app.set("io", io);

  app.use(
  "/api/history",
  historyRoutes
);
}

startServer();