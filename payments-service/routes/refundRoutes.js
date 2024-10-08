const express = require('express');
const refundController = require('../controllers/refundController');

const router = express.Router();

//Refund
router.post('/initiate', refundController.initiateRefund);

module.exports = router;
