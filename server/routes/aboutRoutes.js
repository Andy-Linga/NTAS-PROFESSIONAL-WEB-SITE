// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Route GET pour afficher le formulaire de création
router.get('/admin/signin', adminController.signinPage);

// Route POST pour enregistrer un nouvel admin
router.post('/admin/signin', adminController.handleSignin);

module.exports = router;
