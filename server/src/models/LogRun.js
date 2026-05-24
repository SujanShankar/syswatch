import mongoose from "mongoose";

const logRunSchema =
  new mongoose.Schema({

    filename: String,

    analyzed_at: Date,

    total_lines: Number,

    pass_count: Number,

    fail_count: Number,

    verdict: String,

    matches: [
      {
        line_number: Number,

        pattern: String,

        severity: String,

        content: String
      }
    ],

    summary: Object
  });

const LogRun =
  mongoose.model(
    "LogRun",
    logRunSchema
  );

export default LogRun;