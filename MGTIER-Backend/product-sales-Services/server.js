const express = require('express');
require('dotenv').config();

const router = require('./routes/userroutes')
const server = express();

server.use(express.urlencoded({extended:true}))
server.use(express.json())


 server.use(router) 
  


const port = 6050;
server.listen(port, ()=>{
    console.log(`sever runing`)
})
