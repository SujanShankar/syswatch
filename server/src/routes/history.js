import express
from "express";

import Metric
from "../models/Metric.js";

const router =
  express.Router();

router.get(
  "/",

  async (req, res) => {

    try {

      const metrics =
        await Metric
          .find()
          .sort({
            timestamp: -1
          })
          .limit(20);

      res.json({

        success: true,

        data:
          metrics.reverse()
      });

    } catch (error) {

      console.error(error);

      res.status(500).json({

        success: false,

        message:
          "Failed to fetch history"
      });
    }
  }
);

export default router;