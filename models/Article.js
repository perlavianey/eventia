const mongoose = require ('mongoose') 
const Schema = mongoose.Schema

const ArticleSchema = new Schema ({
  name:{type:String,required:true},
  imagesURL:[],
  size:[],
  color:[],
  price:Number,
  otherFeatures:String,
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