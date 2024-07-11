const mongoose = require('mongoose');
//require('dotenv').config('./env');
//console.log(process.env.DB_URL);
const DB_URL = 'mongodb://localhost:27017/Inventory_Management';
mongoose.connect (DB_URL);
const db = mongoose.connection;

db.on('connected',()=>{
    console.log('Connected to database');
});

db.on('error',(err)=>{
    console.log('Error:',err);
})