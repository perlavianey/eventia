const express = require ('express')
const router = express.Router()
const User = require('../models/User')
const Event = require('../models/Event')
const {generateToken,verifyToken} = require('../helpers/jwt')

router.get('/organizerProfile',verifyToken,(req,res,next) =>{
  console.log("Respuesta de backend" + req.user)
  res.send("Hola organizador " + req.user.name)
})

router.post('/newEvent', (req,res,next) =>{
  Event.create(req.body)
  .then(event=>{
    res.status(201).json(event)
  })
  .catch(e=>next(e))
})

router.get('/getAllEvents', (req,res,next) =>{
  Event.find()
    .then(eventos=>{        
      res.status(201).json(eventos)
    }).catch(e=>{
      next(e)
    })
})

router.get('/getEvents', verifyToken,(req,res,next) =>{
  //req.app.locals.loggedUser = req.user;
  //{manager:ObjectId("5bbe2eac3c00b13ae030514f")}


  Event.find({manager:(req.user._id)})
    .then(eventos=>{        
      res.status(201).json(eventos)
    }).catch(e=>{
      next(e)
    })
})

module.exports = router