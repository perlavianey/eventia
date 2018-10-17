const express = require ('express')
const router = express.Router()
const Order = require('../models/Order')
const {verifyToken} = require('../helpers/jwt')

//Crear Orden
router.post('/newOrder',verifyToken,(req,res,next) =>{  
  Order.create(req.body)
  .then(event=>{
    res.status(201).json(event)
  })
  .catch(e=>next(e))
})


//Traer todos las órdenes de un usuario
router.get('/getOrders/:id',verifyToken,(req,res,next) =>{
  const {id} = req.params
  Order.find({user:(id)}).populate('user').populate('event').populate('articles.product')
    .then(ordenes=>{       
      res.status(201).json(ordenes)
    }).catch(e=>{
      next(e)
    })
})

module.exports = router