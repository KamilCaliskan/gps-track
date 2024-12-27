const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Route to handle location data
app.post('/location', (req, res) => {
  const { latitude, longitude, speed } = req.body;

  // Validate received data
  if (!latitude || !longitude || !speed) {
    return res.status(400).send('Invalid data');
  }

  // Log the received data (you can replace this with database storage)
  console.log(`Received location: Latitude = ${latitude}, Longitude = ${longitude}, Speed = ${speed} m/s`);

  // Respond to acknowledge receipt of the data
  res.status(200).send({ message: 'Location received successfully' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
