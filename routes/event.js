const express = require ('express')
const router = express.Router()
const User = require('../models/User')
const Event = require('../models/Event')
const {generateToken,verifyToken} = require('../helpers/jwt')

router.get('/organizerProfile',verifyToken,(req,res,next) =>{
  console.log("Respuesta de backend" + req.user)
  res.send("Hola organizador " + req.user.name)
})

// router.post('/login', passport.authenticate('local'),(req,res,next) =>{
//   const token = generateToken(req.user)
//   res.status(200).json({token,user:req.user})
//   .then(user=>{})
//   .catch(e=>next(e))
// })

// router.post('/signup',(req,res,next) =>{
//   User.register(req.body,req.body.password)
//   .then(user=>{
//     res.status(201).json(user)
//   })
//   .catch(e=>next(e))
// })

module.exports = router