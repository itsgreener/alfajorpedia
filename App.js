require("dotenv").config();
const mysql = require("mysql2/promise");
const express = require("express");
const cookieParser = require("cookie-parser");
const nodemailer = require("nodemailer");
const { requireApiKey, requireToken } = require("./middleware/auth");
const authRoutes = require("./routes/auth.routes");
const alfajoresRoutes = require("./routes/alfajores.routes");
const favoritesRoutes = require("./routes/favorites.routes");

const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
const MAILCHIMP_LIST_ID = process.env.MAILCHIMP_LIST_ID;
const MAILCHIMP_DC = process.env.MAILCHIMP_DC;

const app = express();

app.use((req, res, next) => {
  const allowedOrigins = [
    "https://alfajorpedia.com",
    "https://www.alfajorpedia.com",
    "https://app.alfajorpedia.com",
    "http://localhost:5173",
  ];

  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS",
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, x-api-key",
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

function escapeHtml(text) {
  if (!text) return "";

  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
    "/": "&#x2F;",
  };

  return String(text).replace(/[&<>"'/]/g, (char) => map[char]);
}

const pool = mysql.createPool({
  host: process.env.DB_HOST || "127.0.0.1",
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

app.locals.pool = pool;

app.get("/", (_req, res) => {
  res.send("NODE OK");
});

app.get("/api/health", requireApiKey, (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.post("/api/sync-alfajores", requireApiKey, async (req, res) => {
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
        categorias: r.categorias == null ? null : String(r.categorias).trim(),
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
        pais = VALUES(pais),
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

app.use("/api/auth", authRoutes);
app.use("/api/alfajores", alfajoresRoutes);
app.use("/api/favorites", favoritesRoutes);

app.post("/api/subscribe", requireToken, async (req, res) => {
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
      },
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

app.post("/api/email", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Required fields are missing",
      });
    }

    if (!email.includes("@") || email.length > 254) {
      return res.status(422).json({
        success: false,
        message: "Invalid email",
      });
    }

    if (name.length > 100) {
      return res.status(422).json({
        success: false,
        message: "Name too long",
      });
    }

    if (message.length > 5000) {
      return res.status(422).json({
        success: false,
        message: "Message too long",
      });
    }

    const urlPattern = /(https?:\/\/|www\.)/gi;
    if (urlPattern.test(message)) {
      return res.status(422).json({
        success: false,
        message: "URLs are not allowed in the message",
      });
    }

    const htmlPattern = /<[^>]*>/g;
    if (
      htmlPattern.test(name) ||
      htmlPattern.test(email) ||
      htmlPattern.test(message)
    ) {
      return res.status(422).json({
        success: false,
        message: "HTML tags are not allowed",
      });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: parseInt(process.env.MAIL_PORT) || 465,
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `<${process.env.MAIL_USER}> "Alfajorpedia"`,
      to: process.env.MAIL_TO,
      subject: `[Web] New message from ${escapeHtml(name)}`,
      text: `
You have received a new message from the contact form

CONTACT INFORMATION:
Name:       ${name}
Email:      ${email}

MESSAGE:
${message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Sent from https://alfajorpedia.com
${new Date().toLocaleString("en-US")}
      `,
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { 
      font-family: Arial, sans-serif; 
      color: #111; 
      background-color: #f5f5f5;
      margin: 0;
      padding: 0;
    }
    .container { 
      max-width: 600px; 
      margin: 20px auto; 
      background-color: #fff;
      border-radius: 18px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
    .header { 
      background: #ff2a00; 
      color: white; 
      padding: 30px 20px; 
      text-align: center;
    }
    .header h2 {
      margin: 0;
      font-size: 24px;
      font-weight: 600;
    }
    .content { 
      background: #fff; 
      padding: 30px 20px; 
    }
    .field { 
      margin: 20px 0; 
      padding: 15px; 
      background: #f9f9f9; 
      border-radius: 18px;
      border-left: 4px solid #ff2a00;
    }
    .label { 
      font-weight: bold; 
      color: #666; 
      display: block; 
      margin-bottom: 8px;
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .value {
      color: #111;
      font-size: 16px;
      line-height: 1.5;
    }
    .value a {
      color: #ff2a00;
      text-decoration: none;
    }
    .value a:hover {
      text-decoration: underline;
    }
    .message { 
      background: #fff; 
      padding: 20px; 
      border-left: 4px solid #ff2a00; 
      margin: 25px 0;
      border-radius: 18px;
      background: #f9f9f9;
      white-space: pre-wrap; 
      word-wrap: break-word;
    }
    .message-title {
      color: #ff2a00;
      font-weight: bold;
      font-size: 16px;
      margin-bottom: 15px;
      display: block;
    }
    .message-content {
      color: #111;
      font-size: 15px;
      line-height: 1.6;
    }
    .footer { 
      text-align: center; 
      color: #666; 
      font-size: 13px; 
      padding: 25px 20px;
      background: #f9f9f9;
      border-top: 1px solid #eee;
    }
    .footer strong {
      color: #111;
    }
    .footer p {
      margin: 5px 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>New Contact Message</h2>
    </div>
    
    <div class="content">
      <div class="field">
        <span class="label">Name</span>
        <div class="value">${escapeHtml(name)}</div>
      </div>
      
      <div class="field">
        <span class="label">Email</span>
        <div class="value">
          <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>
        </div>
      </div>
      
      <div class="message">
        <span class="message-title">Message</span>
        <div class="message-content">${escapeHtml(message).replace(/\n/g, "<br>")}</div>
      </div>
    </div>
    
    <div class="footer">
      <p>Sent from the contact form at <strong>tr.itsgreener.com</strong></p>
      <p>${new Date().toLocaleString("en-US", { dateStyle: "full", timeStyle: "short" })}</p>
    </div>
  </div>
</body>
</html>
      `,
      replyTo: email,
    });

    return res.json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Error sending email",
    });
  }
});

app.get("/api/test-node", (_req, res) => {
  res.json({ ok: true, source: "node" });
});

app.post("/api/test-post", (req, res) => {
  res.json({
    ok: true,
    body: req.body,
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
