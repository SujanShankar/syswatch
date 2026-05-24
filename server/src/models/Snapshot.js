import mongoose from "mongoose";

const SnapshotSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    default: Date.now
  },

  cpu: {
    usage_percent: Number,
    core_count: Number,
    freq_mhz: Number
  },

  memory: {
    total_gb: Number,
    used_gb: Number,
    percent: Number
  },

  disk: {
    total_gb: Number,
    used_gb: Number,
    percent: Number
  },

  os_info: {
    os: String,
    version: String,
    hostname: String,
    architecture: String
  },

  boot_logs: [String]
});

export default mongoose.model(
  "Snapshot",
  SnapshotSchema
);