const express = require("express");
require("dotenv").config();

const mysql = require("mysql2/promise");
const bcrypt = require("bcrypt");

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://alfajorpedia.com");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, X-API-KEY");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/health", auth, (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

const pool = mysql.createPool({
  host: process.env.DB_HOST || "127.0.0.1",
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

app.get("/api/alfajores", async (_req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT id, nombre_alfajor, pais, puntuacion, calorias, descripcion, imagen_url, img_bandera_url
      FROM alfajores
      ORDER BY id DESC
    `);
    res.json(rows);
  } catch (e) {
    res.status(500).json({ error: "server error" });
  }
});

function auth(req,res,next){
  if(req.headers["x-api-key"] !== process.env.API_KEY){
    return res.status(401).json({error:"unauthorized"});
  }
  next();
}

app.post("/sync-alfajores", auth, async (req, res) => {
  try {
    const rows = req.body?.rows;
    if (!Array.isArray(rows) || rows.length === 0) {
      return res.json({ ok: true, upserted: 0 });
    }

    const clean = rows
      .filter((r) => r?.nombre_alfajor && r?.pais)
      .map((r) => ({
        nombre_alfajor: String(r.nombre_alfajor).trim(),
        pais: String(r.pais).trim(),
        puntuacion: Number(r.puntuacion),
        descripcion: r.descripcion == null ? null : String(r.descripcion),
        imagen_url: r.imagen == null ? null : String(r.imagen),
        img_bandera_url: r.img_bandera == null ? null : String(r.img_bandera),
      }))
      .filter((r) => Number.isFinite(r.puntuacion));

    if (clean.length === 0)
      return res.status(400).json({ error: "no valid rows" });

    const values = clean.map((r) => [
      r.nombre_alfajor,
      r.pais,
      r.puntuacion,
      r.descripcion,
      r.imagen_url,
      r.img_bandera_url,
    ]);

    const sql = `
      INSERT INTO alfajores
        (nombre_alfajor, pais, puntuacion, descripcion, imagen_url, img_bandera_url)
      VALUES ?
      ON DUPLICATE KEY UPDATE
        puntuacion = VALUES(puntuacion),
        descripcion = VALUES(descripcion),
        imagen_url = VALUES(imagen_url),
        img_bandera_url = VALUES(img_bandera_url)
    `;

    const conn = await pool.getConnection();
    try {
      await conn.query(sql, [values]);
    } finally {
      conn.release();
    }

    res.json({ ok: true, upserted: clean.length });
  } catch (e) {
    res.status(500).json({ error: "server error: " + e.message });
  }
});

app.post("/sync-usuarios", auth, async (req, res) => {
  try {
    const rows = req.body?.rows;
    if (!Array.isArray(rows) || rows.length === 0) {
      return res.json({ ok: true, upserted: 0 });
    }

    const rounds = Number(process.env.BCRYPT_ROUNDS || 10);

    const clean = rows
      .filter((r) => r?.nombre && r?.email && r?.contraseña)
      .map((r) => ({
        nombre: String(r.nombre).trim(),
        email: String(r.email).trim().toLowerCase(),
        pass: String(r.contraseña),
      }));

    if (clean.length === 0)
      return res.status(400).json({ error: "no valid rows" });

    const values = [];
    for (const r of clean) {
      const hash = await bcrypt.hash(r.pass, rounds);
      values.push([r.nombre, r.email, hash]);
    }

    const sql = `
      INSERT INTO usuarios (nombre, email, password_hash)
      VALUES ?
      ON DUPLICATE KEY UPDATE
        nombre = VALUES(nombre),
        password_hash = VALUES(password_hash)
    `;

    const conn = await pool.getConnection();
    try {
      await conn.query(sql, [values]);
    } finally {
      conn.release();
    }

    res.json({ ok: true, upserted: clean.length });
  } catch (e) {
    res.status(500).json({ error: "server error: " + e.message });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
