
const mongoose = require('mongoose');

const batterySchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true 
  },
  battery: {
    type: Number,
    required: true
  }
});

const Battery = mongoose.model('Battery', batterySchema, 'battery');

module.exports = Battery;
