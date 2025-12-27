const PORT = 8000
const cors=require('cors')
require('dotenv').config()
const express=require('express')
const server = express()

server.use(cors())
server.use(express.json())
const mongoose=require('mongoose')
const MongoDB ="mongodb+srv://suklapalit7:Saptasindhu1@eventforge.prfedvv.mongodb.net/"
mongoose.connect(MongoDB)
const { addCategories } = require('./Routers/AddCategory')
const {addUser} = require('./Routers/AddUser')
const {loginUser} = require('./Routers/Login')
const {addEvent} = require('./Routers/AddEvent')

server.use(addCategories)
server.use(addUser)
server.use(addEvent)
server.use(loginUser)

console.log("Events router:", addEvent ? "Loaded" : "NOT LOADED")


server.listen(8000,()=>{
    console.log("Server running on PORT 8000")
})