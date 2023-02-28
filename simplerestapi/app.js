const express=require('express');
const bodyParser=require('body-parser');
const app=express();    
const postRoute=require('./routes/posts');
const userRoute=require('./routes/user');
app.use(bodyParser.json());
app.use("/posts",postRoute)
app.use("/user",userRoute)
module.exports=app
