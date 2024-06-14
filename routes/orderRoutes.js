const express = require('express');
const router = express.Router();
const { placeOrder } = require('../controllers/orderController');

router.post('/checkout', placeOrder);

module.exports = router;