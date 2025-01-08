
const mongoose = require('mongoose');
const config = require('config');
const dbgr = require("debug")("development:moongose");


mongoose
.connect(``)
.then(function(){
    dbgr("Connected");
})
.catch(function(err){
    console.log("err");
});

module.exports = mongoose.connection;
