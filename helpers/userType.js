//This helper is used to check if a user is a "normal" user or an "Organizer user"

const User = require ('../models/User')

exports.checkUserType=(req,res,next)=>{
  //1. Checar qué usuario está logueado
  const user = req.body.email 
  if(!user) return res.status(401).json({message:"No se detecta un usuario logueado, favor de iniciar sesión nuevamente."})
  //2. Obtener tipo de usuario
  const typeUser = req.body.typeUser
  if(typeUser==="Organizador"){}
}


exports.generateToken = (user) =>{
  return jwt.sign({
    'userId':user._id,
    'email':user.email
  },
  process.env.TOKEN_GENERATOR,
  {expiresIn:"72 hours"}
  )
}