const express = require('express');
const router = express.Router();
const upload = require('../config/multer-config');
const productModal = require('../models/product-model')

router.post('/create',upload.single("image") , async (req, res) => {
    try{
         
      let {name, price, discount, bgcolor, textcolor, panelcolor } = req.body;
         
        let product = await productModal.create({
            image: req.file.buffer,
            name,
            price,
            discount,
            bgcolor,
            textcolor,
            panelcolor,
        })
        
        req.flash("success", "Product created successfully.")
        res.redirect('/owners/admin');
    }catch(err){
        res.send(err.message);
    }
})

module.exports = router;