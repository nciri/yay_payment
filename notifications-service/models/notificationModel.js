const pool = require('../db');

const Notification = {
    createNotification: async (notificationData) => {
        const { user_id, message, notification_type } = notificationData;
        const result = await pool.query(
            'INSERT INTO notifications (user_id, message, notification_type) VALUES ($1, $2, $3) RETURNING *',
            [user_id, message, notification_type]
        );
        return result.rows[0];
    },
    getNotificationsByUserId: async (userId) => {
        const result = await pool.query('SELECT * FROM notifications WHERE user_id = $1', [userId]);
        return result.rows;
    },
    // Ajoutez d'autres méthodes selon vos besoins
};

module.exports = Notification;
