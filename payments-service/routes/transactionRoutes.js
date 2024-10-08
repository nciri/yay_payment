const express = require('express');
const paymentController = require('../controllers/paymentController');


const router = express.Router();

// Transactions
router.post('/', paymentController.createTransaction);
router.get('/:id', paymentController.getTransactionById);
router.get('/', paymentController.getTransactions);
router.get('/download', paymentController.downloadReport); // Pour télécharger le PDF

module.exports = router;
