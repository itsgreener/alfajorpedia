const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const pool = req.app.locals.pool;

    const [rows] = await pool.query(`
      SELECT
        id,
        foto_url,
        marca,
        variedad,
        empresa,
        pais,
        descripcion,
        tagline,
        gramos,
        calorias,
        puntuacion,
        categorias,
        website,
        instagram,
        tiktok,
        empresa_proc,
        empresa_imp
      FROM alfajores
      ORDER BY id DESC
    `);

    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo alfajores", detail: error.message });
  }
});

module.exports = router;