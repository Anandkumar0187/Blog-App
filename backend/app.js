const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const jwt = require('jsonwebtoken');
const port = 8080;
const cors = require('cors');
const secret = 'ANAND';
const loginRoutes = require('./routes/login');
const blogRoutes = require('./routes/blog')
const User = require('./model/user');

mongoose.connect('mongodb://localhost/BlogApp',()=>{
    console.log('database connected');
})
app.use(cors());
app.use(bodyparser.json());

app.use("/blogs",async(req,res,next)=>{
    if(req.headers.authorization){
        const token = req.headers.authorization;
        jwt.verify(token, secret, async(err,decoded)=>{
            if(err){
                res.status(500).json({
                    status : "failed",
                    message : "User not authenticated"
                })
            }
            const user = await User.findOne({_id : decoded.data})
            req.user = user._id;
            next();
        })
    }
    else{
        return res.status(500).json({
            status : "failed",
            message : "Invaild token"
        })
    }
})

app.use("/",loginRoutes);
app.use("/blogs",blogRoutes);

app.listen(port,()=>{
    console.log(`server is running at port ${port}`);
})