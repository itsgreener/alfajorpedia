const express = require("express");
const { requireApiKey } = require("../middleware/auth");

const router = express.Router();

router.get("/", requireApiKey, async (req, res) => {
  try {
    const pool = req.app.locals.pool;

    const [rows] = await pool.query(
      "SELECT alfajor_id FROM favorites WHERE user_id = ?",
      [req.user.id]
    );

    res.json(rows.map((r) => r.alfajor_id));
  } catch (error) {
    res.status(500).json({
      message: "Error obteniendo favoritos",
      detail: error.message,
    });
  }
});

router.post("/:alfajorId", requireApiKey, async (req, res) => {
  try {
    const pool = req.app.locals.pool;

    await pool.query(
      "INSERT IGNORE INTO favorites (user_id, alfajor_id) VALUES (?, ?)",
      [req.user.id, req.params.alfajorId]
    );

    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({
      message: "Error guardando favorito",
      detail: error.message,
    });
  }
});

router.delete("/:alfajorId", requireApiKey, async (req, res) => {
  try {
    const pool = req.app.locals.pool;

    await pool.query(
      "DELETE FROM favorites WHERE user_id = ? AND alfajor_id = ?",
      [req.user.id, req.params.alfajorId]
    );

    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({
      message: "Error borrando favorito",
      detail: error.message,
    });
  }
});

module.exports = router;