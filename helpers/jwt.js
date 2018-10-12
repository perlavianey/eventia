const jwt = require ('jsonwebtoken')
const User = require ('../models/User')

exports.verifyToken=(req,res,next)=>{
  //1. Checar si llegó un token
  const token = req.headers['authorization'] || req.body.token || req.query['token'] || req.headers['x-access-token']
  if(!token) return res.status(401).json({message:"No se recibió un token."})
  //2. Checar que el token sea válido
  
  jwt.verify(token, process.env.TOKEN_GENERATOR,(err,decoded)=>{
    console.log(err)
    if(err) return res.status(401).json({message:"Token expirado, favor de iniciar sesión nuevamente"})
    //3. Checar que el user exista y si sí lo dejamos pasar
    User.findById(decoded.userId)
    .then(user=>{
      req.user = user
      next()
    })
  })
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