const { v4: uuidv4 } = require('uuid');
const User = require('../model/user');
const bcrypt = require("bcrypt");

exports.createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      _id: uuidv4(),
      name,
      email,
      password: hashedPassword,
      role
    });

    await user.save();

    res.status(201).json({
      message: 'User created',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    res.status(500).json({ error: 'Server error' });
  }
};

// Obtener todos los usuarios
exports.getAllUsers = async (req, res) => {
  try {
    const { q, role, page, pageSize, } = req.query
    const filter = q ? {
      $or: [
        { name: { $regex: q, $options: 'i' } },
        { last_name: { $regex: q, $options: 'i' } },
        { email: { $regex: q, $options: 'i' } },
      ]
    } : {}
    if (role) {
      filter.role = role;
    }
    // filter.page = page || 1;
    // filter.pageSize = pageSize || 10;

    const users = await User.find(filter)
      .limit(pageSize || 10)
      .skip((page - 1) * pageSize)
      .select('-password');

    const totalUsersCount = await User.countDocuments(filter);
    res.status(200).json({
      totalPages: Math.ceil(totalUsersCount / pageSize),
      currentPage: page,
      pageSize: pageSize,
      results: users,
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Obtener usuario por ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Actualizar usuario
exports.updateUser = async (req, res) => {
  try {
    const { name, email, role, password } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (role) user.role = role;
    if (password) user.password = await bcrypt.hash(password, 10);

    await user.save();

    res.status(200).json({
      message: 'User updated',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      }
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    res.status(500).json({ error: 'Server error' });
  }
};

// Eliminar usuario
exports.deleteUser = async (req, res) => {
  try {
    const result = await User.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ message: 'User Deleted Successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};