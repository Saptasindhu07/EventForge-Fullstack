const express=require('express')
const mongoose=require('mongoose')

const Category = require("../Schemas/Category").CategoryModel
const addCategories = express.Router()

addCategories.post("/addCategories", async(req,res)=>{
    try{
        await Category.insertMany([
            {
                name: "Tech Conference",
                slug: "tech",
                icon: "💻",
                gradient: "linear-gradient(180deg, #1E293B 0%, #334155 50%, #475569 100%)"
            },
            {
                name: "Music Festival",
                slug: "music",
                icon: "🎵",
                gradient: "linear-gradient(135deg, #FDBA74 0%, #FD9248 40%, #F9A8D4 100%)"
            },
            {
                name: "Art Workshop",
                slug: "art",
                icon: "🎨",
                gradient: "linear-gradient(180deg, #6EE7B7 0%, #34D399 50%, #A7F3D0 100%)"
            },
            {
                name: "Party",
                slug: "party",
                icon: "🎉",
                gradient: "linear-gradient(135deg, #EC4899 0%, #F43F5E 50%, #FB923C 100%)"
            }
        ]);
        res.status(200).json({success:true, message:"Data Added Successfully"})
    }catch(err){
        res.status(400).json({success:false, message:"Cannot add data", error: err})
    }
})

module.exports={addCategories}