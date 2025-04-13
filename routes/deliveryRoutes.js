const express = require('express');
const router = express.Router();
const Delivery = require('../models/Delivery');

// Create a delivery
router.post('/', async (req, res) => {
  try {
    // Input validation (optional)
    const { order, trackingNumber, status } = req.body;
    if (!order || !trackingNumber || !status) {
      return res.status(400).json({ error: 'Order, trackingNumber, and status are required.' });
    }

    const delivery = new Delivery(req.body);
    await delivery.save();
    res.status(201).json(delivery);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error while creating delivery.' });
  }
});

// Get delivery for an order
router.get('/:orderId', async (req, res) => {
  try {
    const delivery = await Delivery.findOne({ order: req.params.orderId });
    
    if (!delivery) {
      return res.status(404).json({ error: 'Delivery not found for this order.' });
    }
    
    res.status(200).json(delivery);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error while fetching delivery.' });
  }
});

module.exports = router;
