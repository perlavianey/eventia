const express = require ('express')
const router = express.Router()
const User = require('../models/User')
const Event = require('../models/Event')
const Article = require('../models/Article')
const uploadCloud = require('../helpers/cloudinary')
const {generateToken,verifyToken} = require('../helpers/jwt')

router.get('/organizerProfile',verifyToken,(req,res,next) =>{
  console.log("Respuesta de backend" + req.user)
  res.send("Hola organizador " + req.user.name)
})

//Crear Evento
router.post('/newEvent',verifyToken,uploadCloud.single('imageURL'),(req,res,next) =>{
  console.log(req.body)
  if(req.file)req.body.imageURL = req.file.url
  Event.create(req.body)
  .then(event=>{
    res.status(201).json(event)
  })
  .catch(e=>next(e))
})

//Actualizar Evento por ID
router.post('/updateEvent/:id',verifyToken,uploadCloud.single('imageURL'),(req,res,next) =>{
  const {id} = req.params
  if(req.file)req.body.imageURL = req.file.url
  Event.findByIdAndUpdate(id,{$set:req.body},{new:true})
  .then(event=>{
    res.status(201).json(event)
  })
  .catch(e=>next(e))
})

//Traer todos los eventos
router.get('/getAllEvents', (req,res,next) =>{
  Event.find()
    .then(eventos=>{        
      res.status(201).json(eventos)
    }).catch(e=>{
      next(e)
    })
})

//Traer todos los eventos de un organizador
router.get('/getEvents', verifyToken,(req,res,next) =>{
  Event.find({manager:(req.user._id)})
    .then(eventos=>{        
      res.status(201).json(eventos)
    }).catch(e=>{
      next(e)
    })
})

//Traer un Evento por ID
router.get('/getEvent/:id', (req,res,next) =>{
  const {id} = req.params
  console.log(id)
  Event.findById(id)
    .then(evento=>{     
      res.status(201).json(evento)
    }).catch(e=>{
      next(e)
    })
})

//Para graficar la venta de entradas Agregar verifiToken
router.get('/event/list-for-chart/:id',(req, res) => {
  const {id} = req.params
  Event.findById(id)
  .then(evento => {
    return res.json(evento)
  }).catch(e=>next(e))
})

//Borrar un evento
router.get('/deleteEvent/:id',(req,res,next)=>{
  const {id}=req.params
  Event.findByIdAndRemove(id)
  .then(evento=>{
    return res.json(evento)
  }).catch(e=>next(e))
})


module.exports = router