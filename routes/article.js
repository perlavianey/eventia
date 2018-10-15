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

//Crear un artículo nuevo
router.post('/newArticle',verifyToken,uploadCloud.single('imageURL'),(req,res,next) =>{
  console.log(req.body)
  if(req.file)req.body.imageURL = req.file.url
  Article.create(req.body)
  .then(article=>{
    res.status(201).json(article)
  })
  .catch(e=>next(e))
})

//Traer los artículos de un evento en partícular
router.get('/getArticles/:eventId', verifyToken,(req,res,next) =>{
  const {eventId} = req.params
  Article.find({event:(eventId)})
    .then(articles=>{        
      res.status(201).json(articles)
    }).catch(e=>{
      next(e)
    })
})

//Traer un artículo en partícular
router.get('/getArticle/:id', (req,res,next) =>{
  const {id} = req.params
  console.log(id)
  Article.findById(id)
    .then(article=>{     
      res.status(201).json(article)
    }).catch(e=>{
      next(e)
    })
})

//Actualizar Evento por ID
router.post('/updateArticle/:id',verifyToken,uploadCloud.single('imageURL'),(req,res,next) =>{
  const {id} = req.params
  if(req.file)req.body.imageURL = req.file.url
  Article.findByIdAndUpdate(id,{$set:req.body},{new:true})
  .then(article=>{
    res.status(201).json(article)
  })
  .catch(e=>next(e))
})

//Borrar un evento
router.get('/deleteArticle/:id',(req,res,next)=>{
  const {id}=req.params
  Article.findByIdAndRemove(id)
  .then(article=>{
    return res.json(article)
  }).catch(e=>next(e))
})


module.exports = router