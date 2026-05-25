import express
  from "express";

import pool
  from "../config/postgres.js";

const router =
  express.Router();

router.get(
  "/",
  async (req, res) => {

    try {

      const result =
        await pool.query(
          `
          SELECT *
          FROM alerts

          ORDER BY
          triggered_at DESC
          `
        );

      res.json({
        success: true,
        data: result.rows
      });

    } catch (error) {

  console.error(
    "ALERT FETCH ERROR:"
  );

  console.error(error);

  res.status(500).json({

    success: false,

    message:
      error.message
  });
}
  }
);

router.patch(
  "/:id/ack",

  async (req, res) => {

    try {

      const result =
        await pool.query(

          `
          UPDATE alerts

          SET
            status = 'ACK',
            acknowledged_at = NOW()

          WHERE id = $1

          RETURNING *
          `,

          [req.params.id]
        );

      res.json({
        success: true,
        data:
          result.rows[0]
      });

    } catch (error) {

  console.error(
    "ALERT FETCH ERROR:"
  );

  console.error(error);

  res.status(500).json({

    success: false,

    message:
      error.message
  });
}
  }
);

router.patch(
  "/:id/resolve",

  async (req, res) => {

    try {

      const result =
        await pool.query(

          `
          UPDATE alerts

          SET
            status = 'RESOLVED',
            resolved_at = NOW()

          WHERE id = $1

          RETURNING *
          `,

          [req.params.id]
        );

      res.json({
        success: true,
        data:
          result.rows[0]
      });

    } catch (error) {

  console.error(
    "ALERT FETCH ERROR:"
  );

  console.error(error);

  res.status(500).json({

    success: false,

    message:
      error.message
  });
}
  }
);

export default router;