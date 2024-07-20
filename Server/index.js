// File: app.js
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require("./Models/User")
const Booking = require("./Models/Bookings")
const Puja = require("./Models/Puja")
const cors = require("cors")

const app = express();

// Middleware
app.use(express.json());
app.use(cors())

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Authentication Middleware
const auth = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ error: 'Access denied' });

  try {
    const verified = jwt.verify(token, 'your_jwt_secret');
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token' });
  }
};

app.get("/users", async(req,res) => {
  try {
    const users = await User.find({})
    if (!users) return res.json("No users Present in DB")
    res.json(users)
  } catch(e) {
    console.error(e.message)
  }
})
// User registration
app.post('/register', async (req, res, next) => {
    try {
      const { username, email, password } = req.body;

      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ error: 'Username already exists' });
      }
  
      const existingEmail = await User.findOne({ email });
      if (existingEmail) {
        return res.status(400).json({ error: 'Email already exists' });
      }
      
      const saltString = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, saltString);
      
      const user = new User({ username, email, password: hashedPassword });
      await user.save();
      
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      next(error);
    }
  });
  

// User login
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password)

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'User not found' });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ error: 'Invalid password' });

    const token = jwt.sign({ _id: user._id }, 'your_jwt_secret');
    res.header('Authorization', token).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update user info
app.put('/user', auth, async (req, res) => {
  try {
    const updates = req.body;
    const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get available pujas
app.get('/pujas', auth, async (req, res) => {
  try {
    const pujas = await Puja.find();
    res.json(pujas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Book a puja
app.post('/book', auth, async (req, res) => {
  try {
    const { pujaId, packageName, personalDetails } = req.body;
    const puja = await Puja.findById(pujaId);
    if (!puja) return res.status(404).json({ error: 'Puja not found' });

    const package = puja.packages.find(p => p.name === packageName);
    if (!package) return res.status(404).json({ error: 'Package not found' });

    const booking = new Booking({
      user: req.user._id,
      puja: pujaId,
      package: {
        name: package.name,
        price: package.price,
      },
      personalDetails,
    });

    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get booking history
app.get('/bookings', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).populate('puja');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

