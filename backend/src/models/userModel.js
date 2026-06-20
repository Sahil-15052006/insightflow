const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

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
    enum :["local","google"],
  },

  isVerified : {
    type: Boolean,
    default:false
  },

  googleId : {
    type:String
  },

},
{
  timestamps: true
});

module.exports = mongoose.model('Users', userSchema);
