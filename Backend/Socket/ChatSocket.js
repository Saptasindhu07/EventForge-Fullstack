const { Server } = require('socket.io');

const Message= require('../Schemas/Message').messageModel

function initializeSocket(httpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:5173", // your frontend
      methods: ["GET", "POST"]
    }
  });

  io.on('connection', (socket) => {

    socket.on('joinEventChat', (event_id)=>{
      console.log("User joined room ",event_id)
      socket.join(event_id)
    })
    socket.on('leaveEventChat',(event_id)=>{
      console.log("User left from ",event_id)
      socket.leave(event_id)
    })
    socket.on('sendMessage', async({ eventId, message, userName, userId }) => {
      try{
        console.log(message)
        const messageNew = new Message({
          eventId,
          userId,
          userName,
          message
        })
        await messageNew.save()
        io.to(eventId).emit('newMessage', {
          eventId,
          message,
          userName,
          userId,
          timestamp: new Date(),
        });
      }catch(err){
        console.log(err)
      }
    });
  });

  // Optional: make io accessible elsewhere if needed
  // return io;
}

module.exports = initializeSocket;