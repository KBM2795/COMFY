const mongoose = require('mongoose');

const ownerSchema = mongoose.Schema({

      fullname : String,
      email : String,
      password : String,
      products : {
        type: Array,
        default: []
      },
      orders: [
        {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
            products: [
                {
                    type: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
                   
                }
            ],
            subtotal: {type: Number},
            orderDate: { type: Date, default: Date.now },
        },
    ],
      picture: String,
      gstin: String,
      
});

module.exports = mongoose.model("owner",ownerSchema);