const express = require ('express')
const router = express.Router()
const User = require('../models/User')
const Event = require('../models/Event')
const uploadCloud = require('../helpers/cloudinary')
const {generateToken,verifyToken} = require('../helpers/jwt')

router.get('/organizerProfile',verifyToken,(req,res,next) =>{
  console.log("Respuesta de backend" + req.user)
  res.send("Hola organizador " + req.user.name)
})

router.post('/newEvent',verifyToken,uploadCloud.single('imageURL'),(req,res,next) =>{
  console.log(req.body)
  if(req.file)req.body.imageURL = req.file.url
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
  Event.find({manager:(req.user._id)})
    .then(eventos=>{        
      res.status(201).json(eventos)
    }).catch(e=>{
      next(e)
    })
})
//EDITANDO:
router.get('/getEvent/:id', (req,res,next) =>{
  const {id} = req.params
  console.log(id)
  Event.findById(id)
    .then(evento=>{  
      // console.log(evento.name)      
      res.status(201).json(evento)
    }).catch(e=>{
      next(e)
    })
})

module.exports = router