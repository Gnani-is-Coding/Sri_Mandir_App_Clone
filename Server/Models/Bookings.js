const mongoose = require("mongoose")
require("dotenv").config()

mongoose.connect(process.env.MONGODB_CONNECT_URL).then(() => console.log("connected to mongoose db"))

const bookingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    puja: { type: mongoose.Schema.Types.ObjectId, ref: 'Puja' },
    package: {
      name: String,
      price: Number,
    },
    personalDetails: {
      fullName: String,
      dob: Date,
      gothra: String,
      // Add more fields as needed
    },
    bookingDate: { type: Date, default: Date.now },
    status: { type: String, default: 'Pending' },
  });
  
  const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking