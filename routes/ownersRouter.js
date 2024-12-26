const express = require('express');
const router = express.Router();
const ownerModel = require("../models/owner-model");
const isLoggedin = require('../middlewares/isLoggedin');
const {loginOwner} = require('../controllers/authControler')


router.post('/create', async (req, res) => {
    let owners = await ownerModel.find();
    if(owners.length > 0){
        return res
        .status(500)
        .send("you have no permission");
    }

   let createdOwner = await ownerModel.create({
    fullname : "koshik",
    email : "koshik@abc.com",
    password : "abcd",
    })

    res.status(201).send("created");
})

router.get('/admin/login', (req, res) => {
    let error = req.flash('error');
    res.render("adminIndex",{error});
})

router.get('/admin', isLoggedin, (req, res) => {
    let success = req.flash('success');
    res.render("admin", {success});
})

router.get('/admin/orders', isLoggedin, async (req, res) => {
    const owner = await ownerModel.findOne().populate({
        path: 'orders.products.type', // Populate product details
         // Include specific fields from the product schema
    }).populate({
        path: 'orders.userId', // Populate user details
        select: 'fullname email', // Include specific fields from the user schema
    });


      
      

    // Pass the orders to the EJS template
    res.render('adminOrders', { orders: owner.orders });

   });
    
    

    



router.post('/login', loginOwner)



module.exports = router;