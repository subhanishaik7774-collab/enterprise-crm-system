const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  company: String,
  email: String,
  phone: String,
  status: { type: String, enum: ['active', 'inactive', 'prospect'], default: 'prospect' },
  industry: String,
  revenue: Number,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  notes: String,
}, { timestamps: true });

module.exports = mongoose.model('Customer', customerSchema);
