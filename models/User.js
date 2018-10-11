const mongoose = require ('mongoose') 
const Schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose')

const UserSchema = new Schema ({
  email:String,
  name:{type:String,required:true},
  lastName:{type:String,required:true},
  photoURL:{type:String,default:'https://png.icons8.com/android/1600/user.png'},
  city:String,
  role: {
    type: String,
    enum : ['Usuario','Organizador'],
    default: 'Usuario'
  }
},{
  timestamps:{
    createdAt:'created_at',
    updatedAt:'updated_at'
  }
})

UserSchema.plugin(passportLocalMongoose,{usernameField:'email'})

module.exports = mongoose.model('User',UserSchema)