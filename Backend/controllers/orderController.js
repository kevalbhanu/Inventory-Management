const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');
const {jwtAuthMiddleware}=require('../middleware/jwt')


const checkVendorRole = async(userId)=>{
    const user = await User.findById(userId);
    if(user.role === 'vendor'){
        return true;
    }else{
        return false;
    }
};

//@desc Create Order
//@route POST /api/orders/create
router.post('/create',jwtAuthMiddleware,async (req,res)=>{

   try{const {userid,products,totalAmount,status} = req.body; 

    const orderProducts = [];
    for (let item of products){
        const product = await Product.findById(item.productId);
        if (!product){
            return res.status(400).json({message:'Product not found'});
        }
        if (product.quantity < item.quantity){
            return res.status(400).json({message:'Product quantity is not enough'});
        }
        product.quantity -= item.quantity;
        await product.save();

        orderProducts.push({
            productId:product._id,
            quantity:item.quantity,
        })
    }
    const newOrder = new Order({
        userid,
        products:orderProducts,
        totalAmount,
        status
    });
    await newOrder.save();
    res.status(200).json({message:'Order created successfully',newOrder});}
    catch(error){
        res.status(500).json({error});
    }

}); 


//@desc to get all the orders (for vendor)
//@route GET /api/orders/vendor

router.get('/vendor',jwtAuthMiddleware,async (req,res)=>{
    try {
        const orders = await Order.find().populate('products.productId');
        res.status(200).json({message:'Orders fetched successfully',orders});
    } catch (error) {
        res.status(500).json({message:'Something went wrong',error});
    }
});

//@desc to get all the orders placed by the user
//@route GET /api/orders/user/:userid

router.get('/user/:userid',jwtAuthMiddleware,async (req,res)=>{
    try {
        const userid = req.params.userid;
        const orders = await Order.find({userid:userid}).populate('products.productId');
        res.status(200).json({message:'Orders fetched successfully',orders});
    } catch (error) {
        res.status(500).json({message:'Something went wrong',error});
    }
});


//@desc to change the order status to Completed
//@route PUT /api/orders/status/:orderid

router.patch('/status/:orderid',jwtAuthMiddleware,async (req,res)=>{
    try {
        const orderid = req.params.orderid;
        const status = req.body.status;
        const order = await Order.findById(orderid);
        order.status = status;
        await order.save();
        res.status(200).json({message:'Order status updated successfully',order});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})


module.exports=router;