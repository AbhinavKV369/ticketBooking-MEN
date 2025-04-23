const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({
  from: {
    type: String,
    required: true,
    trim: true
  },
  to: {
    type: String,
    required: true,
    trim: true
  },
  distanceKm: {
    type: Number,
    default: 0
  },
  price: { 
    type: Number,
    required: true
  },
  estimatedDuration: {
    type: String,
    default: "N/A" // e.g., "4h 30m"
  }
}, {
  timestamps: true
});

const Route = mongoose.model('Route', routeSchema);

module.exports = Route;
