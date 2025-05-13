const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const publicationSchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4 },
  title: { type: String, maxLength: 200 },
  content: { type: String, required: true, maxLength: 2000 },
  created_by: { type: String, ref: 'User' },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = mongoose.model('Publication', publicationSchema);