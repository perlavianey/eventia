const mongoose = require('mongoose')
const Schema = mongoose.Schema


const orderSchema = new Schema({
  event:{
    type:Schema.Types.ObjectId,
    ref:'Event'
  },
  user:{
    type:Schema.Types.ObjectId,
    ref:'User'
  },
  boletos:{
    quantity:Number,
    price:Number
  },
  total:Number,
  articles:[
    {
      quantity:Number,
      product:{
        type:Schema.Types.ObjectId,
        ref:'Article'
      }      
    }
  ]
},{
  timestamps:{
    createdAt:'created_at',
    updatedAt:'updated_at'
  }
})

module.exports = mongoose.model('Order',orderSchema)