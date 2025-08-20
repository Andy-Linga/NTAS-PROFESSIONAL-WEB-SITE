const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Affichage des vues
router.get('/user/login', userController.showLoginForm);
router.get('/user/register', userController.showRegisterForm);
router.get('/user/logout', userController.logout);

//Traitement des formulaires
router.post('/user/login', userController.login);
router.post('/user/register', userController.register);

module.exports = router;
