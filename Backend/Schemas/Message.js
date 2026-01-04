// models/Message.js
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',  // your existing Event model
    required: true,
    index: true    // Crucial for performance!
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  userName: String,  // denormalized for fast display (no need to populate user every time)
  message: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
    index: -1      // Compound index with eventId for sorting newest first
  },
}, {
  timestamps: true
});

// Compound index: most important for queries
messageSchema.index({ eventId: 1, timestamp: -1 });

const messageModel = mongoose.model('Message', messageSchema);
module.exports={messageModel}
