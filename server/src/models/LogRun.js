import mongoose from "mongoose";

const MatchSchema = new mongoose.Schema({
  line_number: Number,

  pattern: String,

  severity: String,

  content: String
});

const LogRunSchema = new mongoose.Schema({
  filename: String,

  analyzed_at: {
    type: Date,
    default: Date.now
  },

  total_lines: Number,

  pass_count: Number,

  fail_count: Number,

  verdict: String,

  matches: [MatchSchema],

  summary: {
    type: Object
  }
});

export default mongoose.model(
  "LogRun",
  LogRunSchema
);