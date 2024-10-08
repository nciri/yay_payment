const express = require('express');
const reportController = require('../controllers/reportController');
const router = express.Router();

router.post('/', reportController.createReport);
router.get('/user/:id', reportController.getReportsByUserId);
// Ajoutez d'autres routes selon vos besoins

module.exports = router;
