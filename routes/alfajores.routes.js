const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

function getOptionalUser(req) {
  const authHeader = req.headers.authorization;
  const token =
    req.cookies?.token ||
    (authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null);

  if (!token) return null;

  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return null;
  }
}

router.get("/", async (req, res) => {
  try {
    const pool = req.app.locals.pool;
    const user = getOptionalUser(req);

    const [rows] = await pool.query(
      `
      SELECT
        a.id,
        a.foto_url,
        CONCAT(a.marca, ' ', a.variedad) AS nombre,
        a.marca,
        a.variedad,
        a.empresa,
        a.pais,
        COALESCE(a.descripcion, '') AS descripcion,
        COALESCE(a.tagline, '') AS tagline,
        a.gramos,
        a.calorias,
        a.puntuacion,
        a.categorias,
        a.website,
        a.instagram,
        a.tiktok,
        a.empresa_proc,
        a.empresa_imp,
        CASE
          WHEN f.alfajor_id IS NOT NULL THEN TRUE
          ELSE FALSE
        END AS isFav
      FROM alfajores a
      LEFT JOIN favoritos f
        ON f.alfajor_id = a.id
        AND f.usuario_id = ?
      ORDER BY a.id DESC
      `,
      [user?.id || null]
    );

    res.json(rows);
  } catch (error) {
    res.status(500).json({
      message: "Error obteniendo alfajores",
      detail: error.message,
    });
  }
});

module.exports = router;