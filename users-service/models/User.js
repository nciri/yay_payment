const pool = require('../db');

const User = {
    createUser: async (userData) => {
        const { username, email, password_hash, full_name } = userData;
        const result = await pool.query(
            'INSERT INTO users (username, email, password_hash, full_name) VALUES ($1, $2, $3, $4) RETURNING *',
            [username, email, password_hash, full_name]
        );
        return result.rows[0];
    },
    getAllUsers: async () => {
        const result = await pool.query('SELECT * FROM users'); // Assurez-vous que la requête est correcte
        return result.rows; // Retourne tous les utilisateurs
    },
    getUserById: async (userId) => {
        const result = await pool.query('SELECT * FROM users WHERE user_id = $1', [userId]);
        return result.rows[0];
    },
    assignRole: async (userId, roleId) => {
        const result = await pool.query(
            'INSERT INTO user_roles (user_id, role_id) VALUES ($1, $2) RETURNING *',
            [userId, roleId]
        );
        return result.rows[0];
    },
    getUserRoles: async (userId) => {
        const result = await pool.query(
            'SELECT r.role_name FROM user_roles ur JOIN roles r ON ur.role_id = r.role_id WHERE ur.user_id = $1',
            [userId]
        );
        return result.rows;
    },
    // Ajoutez d'autres méthodes selon vos besoins
};

module.exports = User;
