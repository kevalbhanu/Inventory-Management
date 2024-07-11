const mongoose = require ('mongoose');

const OrderSchema = new mongoose.Schema({
    userid:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    products:[{
        productId:{
            type: mongoose.Schema.Types.ObjectId,
            ref : 'Product',
            required:true
        },
        quantity:{
            type:Number,
            required:true
        }
    }],
    totalAmount:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        default:'pending',
        enum:['pending','delivered']
    }
})

const Order = mongoose.model('Order',OrderSchema);
module.exports = Order;