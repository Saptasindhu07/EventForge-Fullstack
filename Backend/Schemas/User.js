const express=require('express')
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true }, // hashed
  avatar: { type: String },
  role: {
    type: String,
    enum: ['user', 'organizer', 'admin'],
    default: 'user'
  },
  eventsJoined: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event'
  }],
}, { timestamps: true });

const userModel = mongoose.model('User', userSchema);
module.exports={userModel}