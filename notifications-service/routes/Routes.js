const express = require('express');
const notificationController = require('../controllers/notificationController');
const router = express.Router();

router.post('/', notificationController.createNotification);
router.get('/user/:id', notificationController.getNotificationsByUserId);
// Ajoutez d'autres routes selon vos besoins

module.exports = router;
