const express = require('express');
const bodyParser = require('body-parser');
const employeeRoutes = require('./routes');
const errorMiddleware = require('./middleware/errorMiddleware');

const app = express();
const port = process.env.PORT || 3000;

// Middleware for parsing JSON requests
app.use(bodyParser.json());

// Use employee routes
app.use('/', employeeRoutes);

// Error handling middleware
app.use(errorMiddleware);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
