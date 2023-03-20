const mongoose = require('mongoose')
const danceClass = require('../models/danceClass');

const ParticipantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  dance: {
    //type: mongoose.Schema.Types.ObjectId,
    //ref: 'Danceclass',
    type: String,
    required: true,
  },
  danceRole: {
    type: String,
    enum: ["LEAD", "FOLLOW"],
    required: true,
  },
  paymentStatus: {
    type: String,
  }
});

module.exports = mongoose.model('participant', ParticipantSchema)