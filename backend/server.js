require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db.js') 
const routes = require('./routes/userRoutes.js')

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json())
app.use('/api',routes);


connectDB();

app.listen(PORT,()=>{
    console.log(`server running on localhost:${process.env.PORT}`);
})