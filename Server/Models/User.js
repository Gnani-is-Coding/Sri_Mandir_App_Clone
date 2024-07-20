const mongoose = require("mongoose")
require("dotenv").config()


console.log(process.env.MONGODB_CONNECT_URL, "url")
mongoose.connect(process.env.MONGODB_CONNECT_URL).then(() => console.log("connected to mongoose db"))

const userSchema = new mongoose.Schema({
    username: String,
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    generalInfo: {
      fullName: String,
      dob: Date,
      gender: String,
      placeOfBirth: String,
      occupation: String,
    },
    contactInfo: {
      phone: String,
      address: String,
    },
})

const User = mongoose.model("users", userSchema)

module.exports = User

