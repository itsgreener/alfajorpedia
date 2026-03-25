const express = require("express");
const { requireToken } = require("../middleware/auth");

const router = express.Router();

router.get("/", requireToken, async (req, res) => {
  try {
    const pool = req.app.locals.pool;

    const [rows] = await pool.query(
      "SELECT alfajor_id FROM favoritos WHERE usuario_id = ?",
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

router.post("/:alfajorId", requireToken, async (req, res) => {
  try {
    const pool = req.app.locals.pool;

    const [[dbInfo]] = await pool.query("SELECT DATABASE() AS db");

    const [result] = await pool.query(
      "INSERT IGNORE INTO favoritos (usuario_id, alfajor_id) VALUES (?, ?)",
      [req.user.id, req.params.alfajorId]
    );

    return res.json({
      ok: true,
      db: dbInfo.db,
      userId: req.user.id,
      alfajorId: req.params.alfajorId,
      affectedRows: result.affectedRows,
      warningStatus: result.warningStatus,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error guardando favorito",
      detail: error.message,
    });
  }
});
router.delete("/:alfajorId", requireToken, async (req, res) => {
  try {
    const pool = req.app.locals.pool;

    const [result] = await pool.query(
      "DELETE FROM favoritos WHERE usuario_id = ? AND alfajor_id = ?",
      [req.user.id, req.params.alfajorId]
    );

    return res.json({
      ok: true,
      route: "DELETE /api/favorites/:alfajorId",
      userId: req.user.id,
      alfajorId: req.params.alfajorId,
      affectedRows: result.affectedRows,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error borrando favorito",
      detail: error.message,
    });
  }
});

module.exports = router;