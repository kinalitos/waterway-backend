const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const contaminationReportSchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4 },
  title: { type: String, required: true, maxLength: 200 },
  description: { type: String, required: true, maxLength: 200 },
  created_by: { type: String, ref: 'User', required: true },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['pendiente', 'validado', 'falso'], 
    default: 'pendiente', 
    maxLength: 50 
  },
  images: [{
    image_key: { type: String, required: true, maxLength: 200 },
    uploaded_at: { type: Date, default: Date.now }
  }],
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = mongoose.model('ContaminationReport', contaminationReportSchema);