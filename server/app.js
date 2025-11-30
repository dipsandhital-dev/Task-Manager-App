require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

connectDB();




const PORT = process.env.PORT || 3000;

const app = express();


// ! Middleware to handle CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL || '',
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// ! Parse JSON bodies
app.use(express.json());

// ! Routes (uncomment when ready)
// app.use("/api/auth", authRoutes);
// app.use("/api/tasks", taskRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/reports", reportRoutes);

// ! Root route
app.get('/', (req, res) => {
  res.send('Task Manager Server is Running');
});

// ! Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});