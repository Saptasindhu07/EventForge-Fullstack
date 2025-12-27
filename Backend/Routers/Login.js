const express=require('express')
const mongoose=require('mongoose')
const bcrypt = require('bcrypt')
const Jwt= require('jsonwebtoken')
const loginUser= express.Router()
const userModel= require('../Schemas/User').userModel
loginUser.post('/login', async(req,res)=>{
    console.log(req.body.email)
    try{
        const user= await userModel.findOne({email:req.body.email})
            .select('_id name email avatar role')
        const password= await userModel.findOne({email: req.body.email})
            .select('password')
        console.log(user)
        if(bcrypt.compareSync(req.body.password,password.password)){
            const token = Jwt.sign({user},process.env.ACCESS_TOKEN_SECRET)
            res.status(200).json({success:true, token, user, message:"User has Logged in Successfully"})
        }
        else{
            res.status(400).json({success:false, message:"Invalid Password"})
        }
    }catch(err){
        console.log(err)
        res.status(400).json({success:false, message:"Invalid Username", error: err})
    }
})

module.exports={loginUser}