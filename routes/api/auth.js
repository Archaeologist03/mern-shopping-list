const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

// User model
const User = require('../../models/User');

const jwtSecret = process.env.JWT_SECRET || config.get('jwtSecret');

// @route   POST api/auth
// @desc  auth users
// @access  Public
router.post('/', async (req, res) => {
  const { email, password } = req.body;

  // simple validation
  if (!email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  // check for existing user
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ msg: 'User does not exist' });

  // validate password
  // comparing plain text(password) to hashed password (user.password)
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

  jwt.sign({ id: user.id }, jwtSecret, { expiresIn: 3600 }, (err, token) => {
    if (err) throw err;
    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  });
});

// @route  GET api/auth/user
// @desc Get user data (without password)
// @access  Private(protected)
router.get('/user', auth, async (req, res, next) => {
  const user = await User.findById(req.user.id)
    // disregard(dont send) password
    .select('-password');
  res.json(user);
});

module.exports = router;
