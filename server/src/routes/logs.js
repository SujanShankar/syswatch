import express from "express";

import multer from "multer";

import path from "path";

import runPythonScript from "../lib/pythonBridge.js";

import LogRun from "../models/LogRun.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (
    req,
    file,
    cb
  ) => {
    cb(null, "uploads/");
  },

  filename: (
    req,
    file,
    cb
  ) => {
    cb(
      null,
      Date.now() +
        path.extname(file.originalname)
    );
  }
});

const upload = multer({
  storage
});

router.post(
  "/analyze",
  upload.single("logfile"),

  async (req, res) => {
    try {
      if (!req.file) {
  return res.status(400).json({
    success: false,
    message: "No log file uploaded"
  });
}

const filepath = req.file.path;
      const results =
        await runPythonScript(
          "log_analyzer.py",
          [filepath]
        );

      const savedRun =
        await LogRun.create({
          filename:
            req.file.originalname,

          ...results
        });

      res.json({
        success: true,
        data: savedRun
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,
        message:
          "Failed to analyze log"
      });
    }
  }
);

export default router;