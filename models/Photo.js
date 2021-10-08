const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// CREATE SCHEMA
const PhotoSchema = new Schema({
  title: String,
  description: String,
  image: String,
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

// CREATE MODEL
const Photo = mongoose.model("Photo", PhotoSchema);

module.exports = Photo;
