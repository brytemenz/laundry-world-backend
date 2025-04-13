const mongoose = require('mongoose');

const deliverySchema = new mongoose.Schema({
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true,
  },
  deliveryDate: {
    type: Date,
    required: true,
  },
  deliveryStatus: {
    type: String,
    enum: ['pending', 'shipped', 'delivered'],
    default: 'pending',
  },
  deliveryAddress: {
    type: String,
    required: true,
  },
  deliveryContact: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Delivery', deliverySchema);
