const mongoose = require ('mongoose') 
const Schema = mongoose.Schema

const EventSchema = new Schema ({
  name:{type:String,required:true},
  description:{type:String},
  imageURL:String,
  place:String,
  date:String,
  availableSeats:Number,
  schedule:[],
  typeEvent:{
    type: String,
    enum : ['Presentación de Libro',
    'Inauguración',
    'Conferencia',
    "Exposición",
    "Firma de libros",
    "Otro"],
    default: 'Presentación de Libro'
  },
  priceTicket:Number,
  city:String,
  manager:{
    type:Schema.Types.ObjectId,
    ref:'User'
  },
  article:{
    type:Schema.Types.ObjectId,
    ref:'Article'
  }
},{
  timestamps:{
    createdAt:'created_at',
    updatedAt:'updated_at'
  }
})

module.exports = mongoose.model('Event',EventSchema)