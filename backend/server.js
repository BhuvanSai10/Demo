const express = require('express');
require('dotenv').config();
const connectDB = require('./config/db.js') 

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json())

connectDB();
app.listen(PORT,()=>{
    console.log(`server running on localhost:${process.env.PORT}`);
})