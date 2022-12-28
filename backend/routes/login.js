const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = 'ANAND';
const {body, validationResult} = require('express-validator');
const User = require('../model/user');

router.post('/register',body("email").isEmail(),(req,res)=>{
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(501).json({
                errors : errors.array()
            })
        }
        const {email,password} = req.body;
        bcrypt.hash(password, 10, async(err,hash)=>{
            if(err){
                res.status(500).json({
                    status : 'failed',
                    message : err.message
                })
            }else{
                const emailid = await User.findOne({email : email})
                if(emailid){
                    res.status(500).json({
                        status : 'failed',
                        message : "User already registered try with different emailid"
                    })
                }else{
                    const data = await User.create({
                        email,
                        password : hash
                    })
                    res.status(200).json({
                        status: "success",
                        data
                    })
                }
            }
        })
    } catch (error) {
        res.status(500).json({
            status : "failed",
            message : error.message
        })
    }
})

router.post('/login',body('email').isEmail(), async (req,res)=>{
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(500).json({
                errors : errors.array()
            })
        }
        const {email,password} = req.body;
        const data = await User.findOne({email});

        if(!data){
            return res.status(500).json({
                status : 'failed',
                message : "User not registered "
            })
        }
        bcrypt.compare(password,data.password,(err,result)=>{
            if(err){
                res.status(500).json({
                    status : "failed",
                    message : err.message
                })
            }
            if(result){
                const token = jwt.sign({
                    exp : Math.floor(Date.now()/1000)+(60*60),
                    data : data._id
                },secret);
                res.status(200).json({
                    status : "success",
                    token
                })
            }
        })
    } catch (error) {
        res.status(500).json({
            status : "failed",
            message : error.message
        })   
    }
})
module.exports = router;