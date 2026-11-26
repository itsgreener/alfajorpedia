const express=require("express");
const {requireToken}=require("../middleware/auth.cjs");
const router=express.Router();
router.get("/",requireToken,async(req,res)=>{
 try{const {rows}=await req.app.locals.pool.query('SELECT alfajor_id FROM favoritos WHERE usuario_id=$1',[req.user.id]);res.json(rows.map(r=>r.alfajor_id));}
 catch(e){console.error(e);res.status(500).json({message:"Error obteniendo favoritos"});}
});
router.post("/:alfajorId",requireToken,async(req,res)=>{
 try{
  const id=Number(req.params.alfajorId);if(!Number.isInteger(id))return res.status(400).json({message:"ID inválido"});
  const existing=await req.app.locals.pool.query('SELECT id FROM favoritos WHERE usuario_id=$1 AND alfajor_id=$2',[req.user.id,id]);
  if(existing.rowCount)return res.status(409).json({ok:false,message:"Ese alfajor ya está en favoritos"});
  const r=await req.app.locals.pool.query('INSERT INTO favoritos (usuario_id,alfajor_id) VALUES ($1,$2)',[req.user.id,id]);
  return res.status(201).json({ok:true,userId:req.user.id,alfajorId:id,affectedRows:r.rowCount});
 }catch(e){if(e.code==='23505')return res.status(409).json({message:"Ese alfajor ya está en favoritos"});console.error(e);res.status(500).json({message:"Error guardando favorito"});}
});
router.delete("/:alfajorId",requireToken,async(req,res)=>{
 try{const r=await req.app.locals.pool.query('DELETE FROM favoritos WHERE usuario_id=$1 AND alfajor_id=$2',[req.user.id,req.params.alfajorId]);
 res.json({ok:true,userId:req.user.id,alfajorId:req.params.alfajorId,affectedRows:r.rowCount});}
 catch(e){console.error(e);res.status(500).json({message:"Error borrando favorito"});}
});
module.exports=router;
