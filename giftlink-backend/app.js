/* jshint esversion: 8 */
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pinoLogger = require('./logger');
const pinoHttp = require('pino-http');

const connectToDatabase = require('./models/db');
const { loadData } = require("./util/import-mongo/index");

const app = express();
const port = 3060;

// ----------------------------
// Middleware
// ----------------------------
app.use("*", cors());
app.use(express.json());

const logger = pinoLogger;
app.use(pinoHttp({ logger }));

// ----------------------------
// Database Connection
// ----------------------------
connectToDatabase()
  .then(() => {
    logger.info('Connected to DB');
  })
  .catch((e) => console.error('Failed to connect to DB', e));

// ----------------------------
// Route Imports
// ----------------------------

// Gift API
const giftroutes = require('./routes/giftRoutes');

// Search API
const searchRoutes = require('./routes/searchRoutes');

// Auth API (NEW)
const authRoutes = require('./routes/authRoutes');

// ----------------------------
// Route Usage
// ----------------------------

// Gift routes
app.use('/api/gifts', giftroutes);

// Search routes
app.use('/api/search', searchRoutes);

// Auth routes (REGISTER / LOGIN)
app.use('/api/auth', authRoutes);

// ----------------------------
// Health Check Route
// ----------------------------
app.get("/", (req, res) => {
  res.send("Inside the server");
});

// ----------------------------
// Global Error Handler
// ----------------------------
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Internal Server Error');
});

// ----------------------------
// Start Server
// ----------------------------
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
