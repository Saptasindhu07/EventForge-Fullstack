const express=require('express')
const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },     // "Music Festival"
  slug: { type: String, required: true, unique: true },     // "music"
  icon: { type: String, required: true },                   // "🎵" (emoji!)
  gradient: { type: String, required: true }                 // default gradient
}, { timestamps: true });

const CategoryModel= mongoose.model('Category', categorySchema);
module.exports={CategoryModel}