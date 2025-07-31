const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Page d'accueil admin
router.get('/admin', adminController.dashboard);

// Commentaires
router.get('/admin/comments', adminController.getAllComments);
router.get('/admin/comments/delete/:id', adminController.deleteComment);

// Contacts
router.get('/admin/contacts', adminController.getAllContacts);
router.get('/admin/contacts/delete/:id', adminController.deleteContact);

module.exports = router;
