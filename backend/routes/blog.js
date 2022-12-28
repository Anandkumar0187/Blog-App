const express = require('express');
const router = express.Router();
const Blogs = require('../model/blogs');

router.post("/",async(req,res)=>{
    
    const blogs = await Blogs.create({
        title : req.body.title,
        description : req.body.description,
        user : req.user
    })
    res.status(200).json({
        status : "success",
        blogs
    })
})

router.get("/",async(req,res)=>{
    const data = await Blogs.find();
    res.status(200).json({
        status : "success",
        data
    })
})

module.exports = router;