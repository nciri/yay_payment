const Transaction = require('../models/transactionModel');
const PaymentMethod = require('../models/paymentMethodModel');

const paymentController = {
    // Transactions
    getTransactions: async (req, res) => {
        try {
            const filters = req.query; // Récupérer les filtres
            const transactions = await Transaction.getAllTransactions(filters);
            res.status(200).json(transactions);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    downloadReport: async (req, res) => {
        // Implémentez la logique pour générer et télécharger le PDF
    },
    createTransaction: async (req, res) => {
        try {
            const transaction = await Transaction.createTransaction(req.body);
            res.status(201).json(transaction);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getTransactionById: async (req, res) => {
        try {
            const transaction = await Transaction.getTransactionById(req.params.id);
            res.status(200).json(transaction);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Méthodes de paiement
    addPaymentMethod: async (req, res) => {
        try {
            const paymentMethod = await PaymentMethod.addPaymentMethod(req.body);
            res.status(201).json(paymentMethod);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getPaymentMethodsByUserId: async (req, res) => {
        try {
            const methods = await PaymentMethod.getPaymentMethodsByUserId(req.params.userId);
            res.status(200).json(methods);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    updatePaymentMethod: async (req, res) => {
        try {
            const updatedMethod = await PaymentMethod.updatePaymentMethod(req.params.id, req.body);
            res.status(200).json(updatedMethod);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    deletePaymentMethod: async (req, res) => {
        try {
            await PaymentMethod.deletePaymentMethod(req.params.id);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};

module.exports = paymentController;
