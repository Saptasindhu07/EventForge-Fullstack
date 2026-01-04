const express=require('express')
const mongoose=require('mongoose')
const { timeStamp } = require('node:console')

const Message= require('../Schemas/Message').messageModel

const messageRouter= express.Router()

messageRouter.post('/getMessageHistory',async(req, res)=>{
    try{
        const eventID=req.body.eventId
        const query = {eventId:eventID}
        const messages =await Message.find(query)
            .sort({timeStamp:-1})
            .lean()
        res.status(200).json({success:true, messages:messages})
    }catch(err){
        res.status(400).json({success:false, error:err})
    }
})

module.exports={messageRouter}