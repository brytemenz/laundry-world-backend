const express = require('express');
const router = express.Router();
const OrderItem = require('../models/OrderItem');

// Create an OrderItem
router.post('/create', async (req, res) => {
  try {
    const { order, name, quantity, price } = req.body;
    const totalPrice = quantity * price;

    const orderItem = new OrderItem({ order, name, quantity, price, totalPrice });
    await orderItem.save();

    res.status(201).json(orderItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get OrderItems by Order ID
router.get('/order/:orderId', async (req, res) => {
  try {
    const items = await OrderItem.find({ order: req.params.orderId });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
