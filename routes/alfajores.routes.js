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
        a.foto_url AS image,
        CONCAT(a.marca, ' ', a.variedad) AS name,
        a.marca,
        a.variedad,
        a.empresa,
        a.pais,
        a.descripcion AS description,
        a.tagline,
        a.gramos AS weight,
        a.calorias AS calories,
        a.puntuacion AS rating,
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