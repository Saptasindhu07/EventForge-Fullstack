const express=require('express')
const mongoose = require('mongoose')


const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String },
  date: { type: Date, required: true },
  time: { type: String },                   // "19H" or "20:00"
  location: { type: String, required: true },
  venue: { type: String },
  img: {type:String},
  description: { type: String },
  price: { type: Number, default: 0 },      // 0 = free
  capacity: { type: Number },

  // Visuals
  gradient: { type: String },               // custom per event (optional override)
  icon: { type: String },                   // optional override

  // Relationships
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  attendees: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],

  isPublic: { type: Boolean, default: true }
}, { timestamps: true });

// Indexes for fast queries
eventSchema.index({ date: 1 });
eventSchema.index({ category: 1 });
eventSchema.index({ organizer: 1 });

const eventModel = mongoose.model('Event', eventSchema);
module.exports={eventModel}