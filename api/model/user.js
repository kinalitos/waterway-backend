const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const userSchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4 },
  name: { type: String, required: true, maxLength: 200 },
  email: { type: String, required: true, unique: true, maxLength: 200 },
  password: { type: String, required: true, maxLength: 200 },
  location: { type: String, maxLength: 200 },
  role: {
    type: String,
    enum: ['usuario', 'investigador', 'moderador', 'administrador'],
    required: true,
  },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = mongoose.model('User', userSchema);