const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const companyImageSchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4 },
  image_key: { type: String, required: true, maxLength: 200 },
  uploaded_at: { type: Date, default: Date.now }
}, { _id: false });

const companySchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4 },
  owner_id: { type: String, ref: 'User', required: true },
  name: { type: String, maxLength: 100 },
  description: { type: String, maxLength: 400 },
  images: [companyImageSchema]
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = mongoose.model('Company', companySchema);