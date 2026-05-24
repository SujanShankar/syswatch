import express from "express";

import Metric from
  "../models/Metric.js";

import {
  runPythonScript
} from "../lib/pythonBridge.js";

import {
  evaluateAlerts
} from "../services/alerts.service.js";

const router =
  express.Router();

router.get(
  "/",
  async (req, res) => {

    try {

      const snapshot =
        await runPythonScript(
          "collector.py"
        );

      const savedMetric =
        await Metric.create(
          snapshot
        );

      await evaluateAlerts(
        snapshot
      );

      res.json({
        success: true,
        data: savedMetric
      });

    } catch (error) {

      console.error(error);

      res.status(500).json({
        success: false,
        message:
          "Failed to collect metrics"
      });

    }
  }
);

export default router;