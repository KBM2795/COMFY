
const mongoose = require('mongoose');
const config = require('config');
const dbgr = require("debug")("development:moongose");


mongoose
.connect(`${config.get("MONGODB_URI")}/COMFY`)
.then(function(){
    dbgr("Connected");
})
.catch(function(err){
    console.log("err");
});

module.exports = mongoose.connection;