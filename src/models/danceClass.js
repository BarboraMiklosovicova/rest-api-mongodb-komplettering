const mongoose = require('mongoose')
const participant = require('./participant')

const DanceClassSchema = new mongoose.Schema ({
  namn: {
    type: String,
    required: true,
  },
  dansstil: {
    type: String,
    required: true,
  },
  start: {
    type: String,
    required: true,
  },
  slutar: {
    type: String,
    required: true,
  },
  tid: {
    type: String,
    required: true,
  },
  klasstidIMinuter: {
    type: Number,
  },
  pris: {
    type: Number,
    required: true,
  },
  klassLedare: { 
    type: Array,
  },
  status: {
    type: Boolean,
    required: true,
  },

  participants: [{type: mongoose.Schema.Types.ObjectId, ref: "participant"}]
    
  

  
});

module.exports = mongoose.model('DanceClass', DanceClassSchema)