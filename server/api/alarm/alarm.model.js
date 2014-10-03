'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AlarmSchema = new Schema({
  name: String,
  lat: String,
  lng: String,
  username: String,
  time: Date,
  minsAhead: Number,
  info: String
});

module.exports = mongoose.model('Alarm', AlarmSchema);