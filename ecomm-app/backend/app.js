const express = require('express');
const connectDB = require('./config/db');  // MongoDB connection function
const dotenv = require('dotenv');

// Loads environment variables and adds them to process.env
dotenv.config();

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Simple route to check if the server is running
app.get("/", (req, resp) => {
    resp.send("Hello World")
});

module.exports = app;  // Export app for use in server.js
