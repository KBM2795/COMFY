const express = require("express");
const router = express.Router();
const isloggedin = require("../middlewares/isLoggedin");
const productModel = require("../models/product-model");
const userModel = require("../models/user-model");

router.get('/', function (req, res){
    let error = req.flash('error');
    res.render("index", { error });
})

router.get('/home', isloggedin, function (req, res){
    res.render("home");
})

router.get('/shop', isloggedin,async function (req, res){
    let success = req.flash('success');
    let products =await productModel.find()
    res.render("shop", {products, success});
})

router.get('/cart', isloggedin, async function (req, res){
    let success = req.flash('success');
    let error = req.flash('error');
    let user = await userModel
    .findOne({email: req.user.email})
    .populate("cart");
      
    let subtotal = 0; 
    user.cart.forEach(product => {
         subtotal += (product.price-product.discount);
     });

    res.render("cart",{user, subtotal, success, error} );
})

router.get('/orders', isloggedin, async function (req, res){
    let success = req.flash('success');
    let error = req.flash('error');
    let user = await userModel
    .findOne({email: req.user.email})
    .populate("orders");
      
    let subtotal = 0; 
    user.orders.forEach(product => {
         subtotal += (product.price-product.discount);
     });

    res.render("usersOrders",{user, subtotal, success, error} );
})


module.exports = router;
