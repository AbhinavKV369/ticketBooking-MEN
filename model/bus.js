const mongoose = require('mongoose');

const busSchema = new mongoose.Schema({
  busName: String,
  busNumber: String,
  type: {
    type: String,
    enum: ['AC', 'Non-AC', 'Sleeper', 'Seater', 'Volvo'],
    default: 'Seater'
  },
  totalSeats: {
    type: Number,
    required: true
  },
  availableSeats: Number,
  route: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Route',
    required: true
  },
  departureTime: String,
  arrivalTime: String,
  daysAvailable: [String] 
});

const Bus = mongoose.model('Bus', busSchema);

module.exports = Bus
