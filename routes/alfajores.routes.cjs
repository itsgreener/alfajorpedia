const express=require("express");
const jwt=require("jsonwebtoken");
const router=express.Router();
router.get("/",async(req,res)=>{
 try{
  const token=req.cookies?.token || (req.headers.authorization?.startsWith("Bearer ") ? req.headers.authorization.slice(7) : null);
  let userId=null;
  if(token) {try{userId=jwt.verify(token,process.env.JWT_SECRET).id}catch{}}
  const {rows}=await req.app.locals.pool.query(`SELECT a.id,a.foto_url,CONCAT(a.marca,' ',a.variedad) AS nombre,
   a.marca,a.variedad,a.empresa,a.pais,COALESCE(a.descripcion,'') AS descripcion,
   COALESCE(a.tagline,'') AS tagline,a.gramos,a.calorias,a.puntuacion,a.categorias,
   a.website,a.instagram,a.tiktok,a.empresa_proc,a.empresa_imp,
   EXISTS(SELECT 1 FROM favoritos f WHERE f.alfajor_id=a.id AND f.usuario_id=$1) AS "isFav"
   FROM alfajores a ORDER BY a.id DESC`,[userId]);
  res.json(rows);
 }catch(e){console.error(e);res.status(500).json({message:"Error obteniendo alfajores"});}
});
module.exports=router;
