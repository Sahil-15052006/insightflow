const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

  verificationId:String,

  name: {
    type: String,
    trim: true,
  },


  surname :{
    type:String,
    trim : true,
  },

  email: {
    type: String,
    unique: true,
    sparse: true,
    lowercase: true,
  },

  password: {
    type: String,
  },

  provider: {
    type : String,
    enum :["local","gAuth"],
  },

  isVerified : {
    type: Boolean,
    default:false
  },

},
{
  timestamps: true
});

module.exports = mongoose.model('Users', userSchema);
