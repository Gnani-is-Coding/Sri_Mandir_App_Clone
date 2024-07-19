const mongoose = require("mongoose")
require("dotenv").config()

mongoose.connect(process.env.MONGODB_CONNECT_URL).then(() => console.log("connected to mongoose db"))


const pujaSchema = new mongoose.Schema({
    name: String,
    description: String,
    packages: [{
      name: String,
      price: Number,
      description: String,
    }],
  });
  
  const Puja = mongoose.model('Puja', pujaSchema);

  module.exports = Puja