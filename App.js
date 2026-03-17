const mysql = require("mysql2/promise");
const bcrypt = require("bcrypt");
const express = require("express");
require("dotenv").config();

const BACKEND_API_KEY = process.env.API_KEY;
const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
const MAILCHIMP_LIST_ID = process.env.MAILCHIMP_LIST_ID;
const MAILCHIMP_DC = process.env.MAILCHIMP_DC;

const app = express();

app.use((req, res, next) => {
   const allowedOrigins = [
    "https://alfajorpedia.com",
    "https://www.alfajorpedia.com",
    "http://localhost:5173"
  ];

  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }

  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, X-API-KEY");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const pool = mysql.createPool({
  host: process.env.DB_HOST || "127.0.0.1",
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
function auth(req, res, next) {
  if (req.headers["x-api-key"] !== BACKEND_API_KEY) {
    return res.status(401).json({ error: "unauthorized" });
  }
  next();
}

app.get("/api/health", auth, (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.get("/api/alfajores", auth, async (_req, res) => {
  try {
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
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post("/sync-alfajores", auth, async (req, res) => {
  try {
    const rows = req.body?.rows;
    if (!Array.isArray(rows) || rows.length === 0) {
      return res.json({ ok: true, upserted: 0 });
    }

     const clean = rows
      .filter((r) => r?.marca && r?.variedad)
      .map((r) => ({
        foto_url: r.foto_url == null ? null : String(r.foto_url).trim(),
        marca: String(r.marca).trim(),
        variedad: String(r.variedad).trim(),
        empresa: r.empresa == null ? null : String(r.empresa).trim(),
        pais: r.pais == null ? null : String(r.pais).trim(),
        descripcion:
          r.descripcion == null ? null : String(r.descripcion).trim(),
        tagline: r.tagline == null ? null : String(r.tagline).trim(),
        gramos:
          r.gramos == null || r.gramos === "" || Number.isNaN(Number(r.gramos))
            ? null
            : Number(r.gramos),
        calorias:
          r.calorias == null ||
          r.calorias === "" ||
          Number.isNaN(Number(r.calorias))
            ? null
            : Number(r.calorias),
        puntuacion:
          r.puntuacion == null ||
          r.puntuacion === "" ||
          Number.isNaN(Number(r.puntuacion))
            ? null
            : Number(r.puntuacion),
        categorias:
          r.categorias == null ? null : String(r.categorias).trim(),
        website: r.website == null ? null : String(r.website).trim(),
        instagram: r.instagram == null ? null : String(r.instagram).trim(),
        tiktok: r.tiktok == null ? null : String(r.tiktok).trim(),
        empresa_proc:
          r.empresa_proc == null ? null : String(r.empresa_proc).trim(),
        empresa_imp:
          r.empresa_imp == null ? null : String(r.empresa_imp).trim(),
      }));


    if (clean.length === 0) {
      return res.status(400).json({ error: "no valid rows" });
    }

    const values = clean.map((r) => [
      r.foto_url,
      r.marca,
      r.variedad,
      r.empresa,
      r.pais,
      r.descripcion,
      r.tagline,
      r.gramos,
      r.calorias,
      r.puntuacion,
      r.categorias,
      r.website,
      r.instagram,
      r.tiktok,
      r.empresa_proc,
      r.empresa_imp,
    ]);

   const sql = `
      INSERT INTO alfajores (
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
      )
      VALUES ?
      ON DUPLICATE KEY UPDATE
        foto_url = VALUES(foto_url),
        empresa = VALUES(empresa),
        descripcion = VALUES(descripcion),
        tagline = VALUES(tagline),
        gramos = VALUES(gramos),
        calorias = VALUES(calorias),
        puntuacion = VALUES(puntuacion),
        categorias = VALUES(categorias),
        website = VALUES(website),
        instagram = VALUES(instagram),
        tiktok = VALUES(tiktok),
        empresa_proc = VALUES(empresa_proc),
        empresa_imp = VALUES(empresa_imp),
        updated_at = CURRENT_TIMESTAMP
    `;

    const conn = await pool.getConnection();
    try {
      await conn.query(sql, [values]);
    } finally {
      conn.release();
    }

 return res.json({
      ok: true,
      received: rows.length,
      upserted: clean.length,
    });
  } catch (e) {
    return res.status(500).json({
      error: "server error",
      detail: e.message,
    });
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

    if (clean.length === 0) {
      return res.status(400).json({ error: "no valid rows" });
    }

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

    return res.json({ ok: true, upserted: clean.length });
  } catch (e) {
    return res.status(500).json({
      error: "server error",
      detail: e.message,
    });
  }
});


app.post("/api/subscribe", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || typeof email !== "string") {
      return res.status(400).json({ error: "email requerido" });
    }

    if (!MAILCHIMP_API_KEY || !MAILCHIMP_LIST_ID || !MAILCHIMP_DC) {
      return res.status(500).json({
        error: "faltan variables de entorno de Mailchimp",
      });
    }

    const response = await fetch(
      `https://${MAILCHIMP_DC}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members`,
      {
        method: "POST",
        headers: {
          Authorization:
            "Basic " +
            Buffer.from(`anystring:${MAILCHIMP_API_KEY}`).toString("base64"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email_address: email.trim().toLowerCase(),
          status: "pending",
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: data.detail || "error mailchimp",
        data,
      });
    }

    return res.status(200).json({
      ok: true,
      message: "suscripción creada",
      data,
    });
  } catch (e) {
    return res.status(500).json({
      error: "server error",
      detail: e.message,
    });
  }
});

app.get("/", (_req, res) => {
  res.send("NODE OK");
});

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


