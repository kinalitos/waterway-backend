const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const contaminationImageSchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4 },
  image_key: { type: String, required: true, maxLength: 200 },
  uploaded_at: { type: Date, default: Date.now }
}, { _id: false });

const contaminationReportSchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4 },
  title: { type: String, maxLength: 200 },
  description: { type: String, maxLength: 200 },
  created_by: { type: String, ref: 'User' },
  lat: { type: Number },
  lng: { type: Number },
  status: { type: String, default: 'pending', maxLength: 50 },
  images: [contaminationImageSchema]
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = mongoose.model('ContaminationReport', contaminationReportSchema);