const express = require('express');
const app = express();
const CORS = require('cors');
//const env = require('dotenv').config({path:'./config/env'});
//console.log(env);
require('./config/db');
const userController = require('./controllers/UserController');
const productController = require('./controllers/productController');
const orderController = require('./controllers/orderController');
//const port = 5000;
const port = process.env.PORT || 5000 ;

app.use(CORS());
app.use(express.json());
app.use('/api/users',userController);
app.use('/api/products',productController);
app.use('/api/orders',orderController);

app.listen(port,()=>{
    console.log(`>>Server is running on port ${port}`);
});
