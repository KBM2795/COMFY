const userModel = require('../models/user-model');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const {generateToken} = require("../utils/generateToken");
const ownerModel = require('../models/owner-model');



module.exports.registerUser =  async (req, res) => {
    try {
      let {email, password, fullname } = req.body;

     let user = await userModel.findOne({email: email});
      if(user){
         req.flash("error", "you already have an account, please login")  
         return res.redirect("/");
    }

      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, async function (err, hash){
            if (err){ 
                req.flash("error", error.message)  
                return res.redirect("/");
            } else{
                let user =await userModel.create({
                    email,
                    password: hash,
                    fullname,
                  });
            
                  let token = generateToken(user);
                  res.cookie("token", token);
                  res.redirect("/home")
            }
        })
      })

      
    } catch(err){
        res.send(err.message);
    }
}


module.exports.loginUser = async (req,res) =>{
    let { email, password } = req.body;

    let user = await userModel.findOne({ email: email});
    if(!user) {
        req.flash("error", "email or password incorrect")  
         return res.redirect("/");
    }

    bcrypt.compare(password, user.password, function (err, result){
     if(result){
        let token= generateToken(user);
        res.cookie("token", token);
        res.redirect("/home")

     }else{
        req.flash("error", "email or password incorrect")  
        return res.redirect("/");
     }
    
    })

}

module.exports.loginOwner =  async (req,res) =>{
    let { email, password } = req.body;

    let user = await ownerModel.findOne({ email: email});
    if(!user) {
        req.flash("error", "email or password incorrect")  
         return res.redirect("/owners/admin/login");
    }
    
    if(password == user.password){
        let token= generateToken(user);
        res.cookie("token", token);
        res.redirect("/owners/admin")
    }else{
        req.flash("error", "email or password incorrect")  
        return res.redirect("/owners/admin/login");
    }
    


}


module.exports.logout = (req,res) =>{
    res.cookie("token", "");
    res.redirect("/");
}