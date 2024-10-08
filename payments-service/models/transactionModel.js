const pool = require('../db');

const Transaction = {
    getAllTransactions: async (filters) => {
        // Implémentez la logique pour récupérer les transactions en fonction des filtres
    },
    createTransaction: async (transactionData) => {
        const { user_id, payment_method_id, amount, currency, status } = transactionData;
        const result = await pool.query(
            'INSERT INTO transactions (user_id, payment_method_id, amount, currency, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [user_id, payment_method_id, amount, currency, status]
        );
        return result.rows[0];
    },
    getTransactionById: async (transactionId) => {
        const result = await pool.query('SELECT * FROM transactions WHERE transaction_id = $1', [transactionId]);
        return result.rows[0];
    },
    // Ajoutez d'autres méthodes selon vos besoins
};

module.exports = Transaction;
