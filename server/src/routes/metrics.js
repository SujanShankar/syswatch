import express from "express";

import runPythonScript from "../lib/pythonBridge.js";

import Snapshot from "../models/Snapshot.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const snapshot =
      await runPythonScript(
        "collector.py"
      );

    const savedSnapshot =
      await Snapshot.create(snapshot);

    res.json({
      success: true,
      data: savedSnapshot
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Failed to collect metrics"
    });
  }
});

export default router;