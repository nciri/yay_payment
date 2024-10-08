const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.post('/', userController.createUser);
router.post('/:id/roles', userController.assignRole); // Pour attribuer un rôle à un utilisateur

router.get('/', userController.getAllUsers); // Pour obtenir tous les utilisateurs
router.get('/:id', userController.getUserById);
router.get('/:id/roles', userController.getUserRoles); // Pour récupérer les rôles d'un utilisateur
// Ajoutez d'autres routes selon vos besoins

module.exports = router;
