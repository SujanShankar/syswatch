import express from "express";
import cors from "cors";
import metricsRoutes from "./routes/metrics.js";
import logsRoutes from "./routes/logs.js";
import alertsRoutes from "./routes/alerts.js";
import historyRoutes from "./routes/history.js";
const app = express();

app.use(cors());

app.use(express.json());
app.use("/api/metrics", metricsRoutes);
app.use("/api/logs", logsRoutes);
app.use(
  "/api/alerts",
  alertsRoutes
);

app.use(
  "/api/history",
  historyRoutes
);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "SysWatch backend is running"
  });
});

export default app;