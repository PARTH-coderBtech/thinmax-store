const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ msg: 'User already exists' });

    const isAdmin = email === 'parthagrawal2006asr@gmail.com';

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      isAdmin, // ✅ Set isAdmin here
    });

    await newUser.save();

    const token = jwt.sign(
      {
        id: newUser._id,
        email: newUser.email,
        isAdmin: newUser.isAdmin, // ✅ Include in token
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        isAdmin: newUser.isAdmin, // ✅ Send back
      },
      token,
    });
  } catch (err) {
    console.error('Signup Error:', err);
    res.status(500).json({ msg: 'Server Error' });
  }
});


router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ Step 1: Find user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    // ✅ Step 2: Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    // ✅ Step 3: Send token and user info
    const token = jwt.sign(
      { id: user._id, email: user.email, isAdmin: user.isAdmin },
      process.env.JWT_SECRET
    );
    res.json({ token, user });

  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
});
module.exports = router;