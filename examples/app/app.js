import express from 'express';
import log from './logger.js';
import auth from './auth.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to log incoming requests
app.use((req, res, next) => {
  log.info({ req });
  next();
});

// Authentication middleware
app.use(auth);

// Basic route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Error handling middleware
app.use((err, req, res, next) => {
  log.error({ err, req }, 'Unhandled error');
  res.status(500).send('Internal Server Error');
});

// Start the server
app.listen(PORT, () => {
  log.info(`Example app listening on port ${PORT}!`);
});
