const express=require('express');
const app=express();
const port=process.env.PORT||3002;
const cors=require('cors');
require('dotenv').config();
app.use(cors());
app.use(express.json());



app.listen(3000,()=>{
    console.log('Server is listening to port 3002')
})