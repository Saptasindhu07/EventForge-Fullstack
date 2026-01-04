const express=require('express')
const mongoose=require('mongoose')
const bcrypt = require('bcrypt')
const User = require("../Schemas/User").userModel
const addUser = express.Router()

addUser.post("/addUser", async(req,res)=>{
    try{
        console.log(req.body)
        const name =req.body.name
        const email= req.body.email
        const password=await bcrypt.hashSync(req.body.password,10)
        const avatar = req.body.avatar
        const role= req.body.role

        const user = new User({
            name,
            email,
            password,
            avatar,
            role
        })
        await user.save()
        res.status(200).json({success:true, message:"Added successfully"})
    }catch(err){
        res.status(400).json({success:false, message:"Cannot add", error: err})
    }
})


addUser.post("/eventJoined", async(req,res)=>{
    try{
        console.log(req.body.eventId)
        const updatedUser= await User.findByIdAndUpdate(
            req.body.userId,
            {$addToSet : {eventsJoined:req.body.eventId}},
            {new:true}
        )
        if(!updatedUser){
            res.status(404).json({success:false, message:"User not found or User not logged in"})
        }
        else{
            console.log("Chi huu")
            res.status(200).json({success:true, message:"Successfully Joined Event"})
        }
    }catch(err){
        res.status(400).json({success:false, message:"Server Error", error: err})
    }
})


addUser.post("/getEventsForUser", async (req,res)=> {
    try{
        const userEvents= await User.findOne({_id:req.body.userId})
            .populate('eventsJoined')
        console.log(userEvents.eventsJoined)
        console.log(req.body.userId)
        if(userEvents){
            res.status(200).json({success:true, eventsForUser:userEvents})
        }
        else{
            res.status(404).json({success:false, message:"Cannot find User"})
        }
    }catch(err){
        res.status(400).json({success:false, error:err})
    }
})
module.exports={addUser}