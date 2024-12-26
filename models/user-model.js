const mongoose = require('mongoose');


const userSchema = mongoose.Schema({

      fullname : String,
      email : String,
      password : String,
      cart: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"products",
      }],
      
      orders : [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"products",
      }],
      contact: Number,
      picture: String,

});

module.exports = mongoose.model("users",userSchema);