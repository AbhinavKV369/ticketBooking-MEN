const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
    required: true,
  },
  bus: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"Bus",
    required: true,
  },
  seatsBooked: {
    type: Number,
    required: true,
  },
  journeyDate: {
    type: Date,
    required: true,
  },
  bookingDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["Booked", "Cancelled"],
    default: "Booked",
  },
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
