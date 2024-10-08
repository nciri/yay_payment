const pool = require('../db');
const bcrypt = require('bcrypt');

const PaymentMethod = {
    // Hachage des informations de compte
    encryptAccountInfo: async (accountInfo) => {
        const hashedAccountInfo = await bcrypt.hash(JSON.stringify(accountInfo), 10);
        return hashedAccountInfo;
    },
    addPaymentMethod: async (methodData) => {
        const { user_id, method_type, provider, account_info } = methodData;
        const encryptedAccountInfo = await PaymentMethod.encryptAccountInfo(account_info);
        const result = await pool.query(
            'INSERT INTO payment_methods (user_id, method_type, provider, account_info) VALUES ($1, $2, $3, $4) RETURNING *',
            [user_id, method_type, provider, encryptedAccountInfo]
        );
        return result.rows[0];
    },
    getPaymentMethodsByUserId: async (userId) => {
        const result = await pool.query('SELECT * FROM payment_methods WHERE user_id = $1', [userId]);
        return result.rows.map(method => ({
            ...method,
            account_info: JSON.parse(method.account_info),  // Déchiffre l'information lors de la récupération
        }));
    },
    updatePaymentMethod: async (paymentMethodId, methodData) => {
        const { method_type, provider, account_info } = methodData;
        const encryptedAccountInfo = await PaymentMethod.encryptAccountInfo(account_info);
        const result = await pool.query(
            'UPDATE payment_methods SET method_type = $1, provider = $2, account_info = $3, updated_at = CURRENT_TIMESTAMP WHERE payment_method_id = $4 RETURNING *',
            [method_type, provider, encryptedAccountInfo, paymentMethodId]
        );
        return result.rows[0];
    },
    deletePaymentMethod: async (paymentMethodId) => {
        await pool.query('DELETE FROM payment_methods WHERE payment_method_id = $1', [paymentMethodId]);
    },
};

module.exports = PaymentMethod;
