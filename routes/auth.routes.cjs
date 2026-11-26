const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { requireToken } = require("../middleware/auth.cjs");
const router = express.Router();
function sign(user) { return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "7d" }); }
router.post("/register", async (req,res) => {
 try {
  const {email,password,nombre} = req.body || {};
  if (!email || !password || !nombre) return res.status(400).json({error:"Nombre, email y contraseña requeridos"});
  const pool=req.app.locals.pool;
  const existing=await pool.query('SELECT id FROM usuarios WHERE LOWER(email)=LOWER($1)',[email]);
  if(existing.rowCount) return res.status(409).json({error:"El email ya está registrado"});
  const hash=await bcrypt.hash(password,10);
  const {rows}=await pool.query('INSERT INTO usuarios (nombre,email,password_hash) VALUES ($1,$2,$3) RETURNING id,email,nombre',[nombre,email,hash]);
  return res.status(201).json({token:sign(rows[0]),user:{id:rows[0].id,email:rows[0].email}});
 } catch(e) { if(e.code==='23505') return res.status(409).json({error:"El email ya está registrado"}); console.error(e);return res.status(500).json({error:"Error del servidor"}); }
});
router.post("/login",async(req,res)=>{
 try {
  const {email,password}=req.body||{};
  if(!email||!password) return res.status(400).json({error:"Email y contraseña requeridos"});
  const {rows}=await req.app.locals.pool.query('SELECT id,email,password_hash FROM usuarios WHERE LOWER(email)=LOWER($1)',[email]);
  const user=rows[0];
  if(!user || !await bcrypt.compare(password,user.password_hash)) return res.status(401).json({error:"Credenciales inválidas"});
  return res.json({token:sign(user),user:{id:user.id,email:user.email}});
 }catch(e){console.error(e);return res.status(500).json({error:"Error interno"});}
});
router.get("/me",requireToken,async(req,res)=>{
 try{ const {rows}=await req.app.locals.pool.query('SELECT id,email FROM usuarios WHERE id=$1',[req.user.id]);
  if(!rows.length) return res.status(404).json({message:"Usuario no encontrado"});return res.json(rows[0]);
 }catch(e){console.error(e);return res.status(500).json({message:"Error obteniendo usuario"});}
});
module.exports=router;
