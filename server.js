const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables
dotenv.config();

// Initialize app
const app = express();

// CORS options to allow frontend URL (you can customize this as per your needs)
const corsOptions = {
  origin: process.env.CLIENT_URL || 'http://localhost:3000',  // Replace with your actual frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,  // Allow credentials (if needed for cookies or auth)
};

// Middleware
app.use(cors(corsOptions));  // Apply CORS middleware with specific options
app.use(express.json());     // Middleware to parse JSON request bodies

// Import routes after app initialization
const orderRoutes = require('./routes/orderRoutes');
const orderItemRoutes = require('./routes/orderItemRoutes');
const deliveryRoutes = require('./routes/deliveryRoutes');
const reportRoutes = require('./routes/reportRoutes');
const authRoutes = require('./routes/authRoutes');

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/order-items', orderItemRoutes);
app.use('/api/deliveries', deliveryRoutes);
app.use('/api/reports', reportRoutes);

// MongoDB connection
const mongoURI = process.env.MONGO_URI || 'your_fallback_uri_here'; // Use the URI from environment variables or fallback
console.log('Mongo URI:', mongoURI);

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
  });

// Root route (for testing the server)
app.get('/', (req, res) => {
  res.send('Xivha Laundry World API is running...');
});

// Server listen
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
