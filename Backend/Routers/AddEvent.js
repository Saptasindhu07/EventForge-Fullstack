const express=require('express')
const mongoose=require('mongoose')

const Event = require("../Schemas/Event").eventModel

const addEvent = express.Router()

addEvent.post("/addEvent", async(req,res)=>{
    try{
        const title = req.body.title
        const subtitle = req.body.subtitle
        const date =  req.body.date
        const time = req.body.time
        const location = req.body.location
        const venue = req.body.venue
        const img= req.body.img
        const description = req.body.description
        const price = req.body.price
        const capacity = req.body.capacity
        const gradient = req.body.gradient
        const icon= req.body.icon
        const category = req.body.category
        const organizer = req.body.organizer
        const attendees = []
        const isPublic = req.body.isPublic
        
        const event = new Event({
            title,
            subtitle,
            date,
            time,
            location,
            venue,
            img,
            description,
            price,
            capacity,
            gradient,
            icon,
            category,
            organizer,
            attendees,
            isPublic
        })

        await event.save()
        res.status(200).json({success:true, message:"Add Successful"})

    }catch(err){
        console.log(err)
        res.status(400).json({success:false, message:"Cannot Add", error: err})
        
    }
})

addEvent.get("/getAllEvents", async(req,res)=>{
    try{
        const events= await Event.find()
            .populate('category')
            .populate('organizer')
            .populate('attendees')
        res.status(200).json({success:true, events: events})
    }catch(err){
        res.status(400).json({success:false, message:"Cannot fetch events", error: err})
    }
})

addEvent.post("/addAttendee", async(req,res)=>{
    try{
        const EventId= req.body._id
        const updatedEvent = await Event.findByIdAndUpdate(
            EventId,
            {$addToSet : {attendees: req.body.userId}},
            {new:true}
        )
        if(!updatedEvent){
            res.status(404).json({success:false, message:"Event not Found"})
        }
        else{
            res.status(200).json({success:true, message:"Joined Successfully"})
            console.log("Hui aa")
        }
    }catch(err){
        res.status(400).json({success:false, message:"Cannot add Attendee", error: err})
    }
})
module.exports={addEvent}