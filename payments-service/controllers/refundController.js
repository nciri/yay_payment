const Refund = require('../models/refundModel');

const refundController = {
    initiateRefund: async (req, res) => {
        try {
            const transactionId = req.body.transactionId;
            await Refund.initiateRefund(transactionId);
            res.status(200).json({ message: 'Refund initiated successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};

module.exports = refundController;
