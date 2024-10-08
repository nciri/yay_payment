const express = require('express');
const paymentController = require('../controllers/paymentController');

const router = express.Router();


// Méthodes de paiement
router.post('/methods', paymentController.addPaymentMethod); // Ajouter une méthode de paiement
router.get('/methods/user/:userId', paymentController.getPaymentMethodsByUserId); // Obtenir les méthodes de paiement d'un utilisateur
router.put('/methods/:id', paymentController.updatePaymentMethod); // Mettre à jour une méthode de paiement
router.delete('/methods/:id', paymentController.deletePaymentMethod); // Supprimer une méthode de paiement


//Refund
router.post('/initiate', refundController.initiateRefund);

module.exports = router;
