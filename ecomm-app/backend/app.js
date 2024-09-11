const express = require('express');
const connectDB = require('./config/db');  // MongoDB connection function

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Simple route to check if the server is running
app.get("/", (req, resp) => {
    resp.send("Hello World")
});

module.exports = app;  // Export app for use in server.js
