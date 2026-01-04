const PORT = 8000
const http= require('http')
const cors=require('cors')
require('dotenv').config()
const express=require('express')
const app = express()
const server = http.createServer(app)
app.use(cors())
app.use(express.json())
const mongoose=require('mongoose')
const MongoDB ="mongodb+srv://suklapalit7:Saptasindhu1@eventforge.prfedvv.mongodb.net/"
mongoose.connect(MongoDB)
const { addCategories } = require('./Routers/AddCategory')
const {addUser} = require('./Routers/AddUser')
const {loginUser} = require('./Routers/Login')
const {addEvent} = require('./Routers/AddEvent')
const {messageRouter}= require('./Routers/Message')

const initializeSocket = require('./Socket/ChatSocket');
initializeSocket(server);  // Pass the http server

app.use(addCategories)
app.use(addUser)
app.use(addEvent)
app.use(loginUser)
app.use(messageRouter)

console.log("Events router:", addEvent ? "Loaded" : "NOT LOADED")


server.listen(8000,()=>{
    console.log("Server running on PORT 8000")
})