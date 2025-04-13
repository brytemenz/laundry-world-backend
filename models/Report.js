const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  reportType: {
    type: String,
    enum: ['sales', 'inventory', 'delivery'],
    required: true,
  },
  reportDate: {
    type: Date,
    default: Date.now,
  },
  data: {
    type: Object,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Report', reportSchema);
