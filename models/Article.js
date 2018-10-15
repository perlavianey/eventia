const mongoose = require ('mongoose') 
const Schema = mongoose.Schema

const ArticleSchema = new Schema ({
  name:{type:String,required:true},
  description:String,
  imageURL:String,
  size:[],
  color:String,
  price:Number,
  stock:Number,
  vendor:{
    type:Schema.Types.ObjectId,
    ref:'User'
  },
  event:{
    type:Schema.Types.ObjectId,
    ref:'Event'
  }
},{
  timestamps:{
    createdAt:'created_at',
    updatedAt:'updated_at'
  }
})

module.exports = mongoose.model('Article',ArticleSchema)