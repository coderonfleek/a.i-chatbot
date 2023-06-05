// Import the necessary libraries
const express = require('express');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Create the Express app
const app = express();

// Create an index route which returns a welcome message
app.get('/', (req, res) => {
  res.send('Welcome to our Express app!');
});

// Create a "message" route which returns a JSON response
app.get('/message', (req, res) => {
  res.json({ message: 'Hello from the message route!' });
});

// The port the app will listen on
const PORT = process.env.PORT || 1337;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
