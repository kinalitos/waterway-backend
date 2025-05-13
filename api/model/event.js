const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const eventImageSchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4 },
  image_key: { type: String, required: true, maxLength: 200 },
  uploaded_at: { type: Date, default: Date.now }
}, { _id: false });

const participantSchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4 },
  user_id: { type: String, ref: 'User', required: true },
  inscription_date: { type: Date, default: Date.now }
}, { _id: false });

const eventSchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4 },
  title: { type: String, maxLength: 200 },
  description: { type: String, required: true, maxLength: 2000 },
  date_start: { type: Date, required: true },
  date_end: { type: Date },
  location: { type: String, maxLength: 300 },
  status: { type: String, default: 'active', maxLength: 50 },
  created_by: { type: String, ref: 'User' },
  images: [eventImageSchema],
  participants: [participantSchema]
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = mongoose.model('Event', eventSchema);