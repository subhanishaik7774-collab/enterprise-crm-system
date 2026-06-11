const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  company: String,
  email: String,
  phone: String,
  stage: { type: String, enum: ['new', 'contacted', 'qualified', 'proposal', 'won', 'lost'], default: 'new' },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  value: Number,
  notes: String,
}, { timestamps: true });

module.exports = mongoose.model('Lead', leadSchema);
