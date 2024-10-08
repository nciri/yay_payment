const Notification = require('../models/notificationModel');

const notificationController = {
    createNotification: async (req, res) => {
        try {
            const notification = await Notification.createNotification(req.body);
            res.status(201).json(notification);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getNotificationsByUserId: async (req, res) => {
        try {
            const notifications = await Notification.getNotificationsByUserId(req.params.id);
            res.status(200).json(notifications);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};

module.exports = notificationController;
