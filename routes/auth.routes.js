const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { requireToken } = require("../middleware/auth");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const pool = req.app.locals.pool;
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email y contraseña son requeridos" });
    }

    const [existing] = await pool.query(
      "SELECT id FROM usuarios WHERE email = ?",
      [email]
    );

    if (existing.length > 0) {
      return res.status(409).json({ error: "El email ya está registrado" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const [result] = await pool.query(
      "INSERT INTO usuarios (email, password_hash) VALUES (?, ?)",
      [email, passwordHash]
    );

    const token = jwt.sign(
      { id: result.insertId, email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(201).json({
      token,
      user: { id: result.insertId, email },
    });
  } catch (error) {
    return res.status(500).json({ error: "Error del servidor", detail: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const pool = req.app.locals.pool;
    const { email, password } = req.body;

    const [rows] = await pool.query(
      "SELECT id, email, password_hash FROM usuarios WHERE email = ?",
      [email]
    );

    const user = rows[0];

    if (!user) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    const ok = await bcrypt.compare(password, user.password_hash);

    if (!ok) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({
      token,
      user: { id: user.id, email: user.email },
    });
  } catch (error) {
    return res.status(500).json({ error: "Error interno", detail: error.message });
  }
});

router.get("/me", requireToken, async (req, res) => {
  return res.json({
    user: {
      id: req.user.id,
      email: req.user.email,
    },
  });
});

module.exports = router;