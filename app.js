const express = require('express');
const cors = require('cors');
const db = require('./db/connect');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

app.use(cors());
app.use(express.json());

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to database');
});

app.use('/api', orderRoutes);

module.exports = app;