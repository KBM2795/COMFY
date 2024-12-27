
const mongoose = require('mongoose');
const config = require('config');
const dbgr = require("debug")("development:moongose");


mongoose
.connect(`mongodb+srv://koshikmehta2795:koshikmehta%402795@koshik-projects.x41ns.mongodb.net/COMFY`)
.then(function(){
    dbgr("Connected");
})
.catch(function(err){
    console.log("err");
});

module.exports = mongoose.connection;
