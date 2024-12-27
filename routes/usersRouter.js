const express = require('express');
const router = express.Router();
const {
    registerUser,
     loginUser,
     logout,
    } = require("../controllers/authControler");
const isLoggedin = require('../middlewares/isLoggedin');
const userModel = require('../models/user-model');
const ownerModel = require('../models/owner-model');





router.post('/register',registerUser);

router.post('/login', loginUser);

router.get('/logout', logout);
 
router.get('/addcart/:id' ,isLoggedin, async (req, res) => {
    let user = await userModel.findOne({email: req.user.email})
    user.cart.push(req.params.id);
    await user.save();
    req.flash("success" , "Added to cart");
    res.redirect('/shop')
})

router.get('/removecart/:id' ,isLoggedin, async (req, res) => {
    let user = await userModel.findOne({email: req.user.email})
    user.cart.remove(req.params.id);
    await user.save();
    req.flash("error" , "removed from cart");
    res.redirect('/cart')
})

router.get('/placeorder',isLoggedin, async (req, res) => {
    const user = await userModel.findOne({email: req.user.email}).populate('cart').populate('orders');
    const owner = await ownerModel.findOne();
    
    
   

    if (user.cart.length === 0) {
        req.flash("success" , "Cart is empty");
        return res.redirect('/cart');
    }

     // Move products from cart to orders
     const orderItems = user.cart.map((productId) => ({
        type: productId // Default quantity as 1
    }));

    // Add cart items to user's orders
    user.orders.push(...user.cart);
    await user.save();

    var subtotal = 0; 
    user.orders.forEach(product => {
         subtotal += (product.price-product.discount);
     });

    // Add the user's order to the owner's orders
    owner.orders.push({
        userId: user._id,
        products: orderItems,
        subtotal: subtotal,
    });

    // Save the updated user and owner data
    await owner.save();

    user.cart = []; // Clear the cart
    await user.save();

    req.flash("success" , "Order placed successfully.");
    res.redirect('/orders')
    
    
   
})

router.get('/cancel' ,isLoggedin, async (req, res) => {
    let owner= await ownerModel.findOne().populate("orders");
    let user = await userModel.findOne({email: req.user.email})

    const {userId} = user._id;
    
    user.orders = [];
    await user.save();
    

    const index = owner.orders.findIndex((order) => order.userId.toString() === userId);
    
    owner.orders.splice(index, 1);

    await owner.save();
   
    

    req.flash("error" , "order cancelled");
    res.redirect('/orders');


})

module.exports = router; 
