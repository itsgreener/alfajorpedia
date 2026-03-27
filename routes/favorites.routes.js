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

    const [result] = await pool.query(
      "INSERT INTO favoritos (usuario_id, alfajor_id) VALUES (?, ?)",
      [req.user.id, req.params.alfajorId]
    );

    return res.status(201).json({
      ok: true,
      userId: req.user.id,
      alfajorId: req.params.alfajorId,
      affectedRows: result.affectedRows,
    });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        ok: false,
        message: "Ese alfajor ya está en favoritos",
      });
    }

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