const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const ACCESS_SECRET = process.env.ACCESS_SECRET;
const REFRESH_SECRET = process.env.REFRESH_SECRET;

exports.signupUser = async (req, res) => {
  try {
    const { email, name, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'This email is already registered.',
      });
    }

    const newUser = new User({
      _id: uuidv4(),
      name,
      email,
      password,
      role: role || 'usuario',
    });

    await newUser.save();

    return res.status(201).json({
      success: true,
      message: 'User registered successfully.',
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Something went wrong during signup.',
      error: err.message,
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    const isMatch = user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    const accessToken = jwt.sign(
      { id: user._id },
      ACCESS_SECRET,
      { expiresIn: '15m' }
    );

    const refreshToken = jwt.sign(
      { id: user._id },
      REFRESH_SECRET,
      { expiresIn: '7d' } // Suggest longer refresh expiry
    );

    return res.status(200).json({
      success: true,
      message: 'Login successful.',
      data: {
        accessToken,
        refreshToken,
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Login failed due to a server error.',
      error: err.message,
    });
  }
};

exports.refreshToken = async (req, res) => {
  try {
    const { token: refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        message: 'Refresh token is required.',
      });
    }

    // @TODO: Check if token is blacklisted

    let payload;
    try {
      payload = jwt.verify(refreshToken, REFRESH_SECRET);
    } catch (err) {
      return res.status(403).json({
        success: false,
        message: 'Refresh token is invalid or expired.',
      });
    }

    const user = await User.findById(payload.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User associated with this token no longer exists.',
      });
    }

    const newAccessToken = jwt.sign(
      { id: user._id },
      ACCESS_SECRET,
      { expiresIn: '15m' }
    );

    return res.status(200).json({
      success: true,
      message: 'Access token refreshed successfully.',
      data: {
        accessToken: newAccessToken,
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Token refresh failed due to a server error.',
      error: err.message,
    });
  }
};
