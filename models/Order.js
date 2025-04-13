const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true,
  },
  customerPhone: {
    type: String,
    required: true,
  },
  customerAddress: {
    type: String,
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid'],
    default: 'pending',
  },
  orderStatus: {
    type: String,
    enum: ['processing', 'completed', 'cancelled'],
    default: 'processing',
  },
  totalAmount: {
    type: Number,
    default: 0,
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
