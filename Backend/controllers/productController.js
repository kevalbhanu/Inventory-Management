const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Product  = require('../models/Product');
const {jwtAuthMiddleware} = require('../middleware/jwt');

const checkVendorRole = async (userId)=>{
    const user = await User.findById(userId);
    if(user.role === 'vendor'){
        return true;
    }else{
        return false;
    }
}

//@desc Add Product
//@route /api/products/add-product
router.post('/add-product',jwtAuthMiddleware,async (req,res)=>{
   try {const isVendor = await checkVendorRole(req.user.id);
    if(!isVendor){
        return res.status(401).json({message:'Only vendor can add product'});
    }
    const data = req.body;
    const product = new Product(data);
    const response= await product.save();
    res.status(200).json({message:'Product added successfully',response});
} catch (error) {
    res.status(500).json({message:'Something went wrong',error});
}
});

//@desc Get Product List
//@route /api/products/get-productList
router.get('/get-productList',jwtAuthMiddleware,async (req,res)=>{
    try {
        const products = await Product.find();
        res.send(products.length>0?products:[{message:'No product found'}]);

    } catch (error) {
        res.status(500).json({message:'Something went wrong',error}); 
    }
});

//@desc Get Single Product
//@route /api/products/get-product/:id
router.get('/get-product/:id',jwtAuthMiddleware,async (req,res)=>{
    try {
        console.log(req.params.id);

        const products = await Product.findById(req.params.id);
        console.log(products)
        res.send(products ? products : {message:'No product found'});


    } catch (error) {
        res.status(500).json({message:'Something went wrong',error}); 
    }
});

//@desc Delete Product
//@route /api/products/delete-product/:id
router.delete('/delete-product/:id',jwtAuthMiddleware,async (req,res)=>{
    try {
        const result = await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({message:'Product deleted successfully',result});
    } catch (error) {
        res.status(500).json({message:'Something went wrong',error}); 
    }
});

//@desc Update Product
//@route /api/products/update-product/:id
router.put('/update-product/:id',jwtAuthMiddleware,async (req,res)=>{
    try {
        const data = req.body;
        const result = await Product.findByIdAndUpdate(req.params.id,data,{new:true,runValidators:true});
        res.status(200).json({message:'Product updated successfully',result});
        
    } catch (error) {
        res.status(500).json({message:'Something went wrong',error});
    }
});

//@desc Search Product
//@route /api/products/search-product/:key
router.get('/search-product/:key',jwtAuthMiddleware,async (req,res)=>{
    try {
        const products = await Product.find({name:{$regex:req.params.key,$options:'i'}});
        res.send(products);
        
    } catch (error) {
        res.status(500).json({message:'Something went wrong',error});
    }
});

module.exports=router;