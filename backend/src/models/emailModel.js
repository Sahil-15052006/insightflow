const mongoose = require('mongoose')

const emailSchema = new mongoose.Schema({
  verificationId:String,
  email:{
    type : String,
    unique: true,
    lowercase: true
  },
  otp:{
    type : String
  },
  expiresAt:{
    type : Date
  }
},{
  timestamps : true
})

module.exports = mongoose.model('emails',emailSchema)
