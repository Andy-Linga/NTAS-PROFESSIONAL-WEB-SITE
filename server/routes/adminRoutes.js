const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { requireAuth } = require('../middlewares/auth');


// Page de login
router.get('/admin/login', adminController.loginPage);
router.post('/admin/login', adminController.handleLogin);

// Page de signin
router.get('/admin/signin', adminController.signinPage);
router.post('/admin/signin', adminController.handleSignin

);

//deconnexion
router.post('/admin/logout', adminController.logout);


// Dashboard (protégé)
router.get('/admin', requireAuth, adminController.dashboard);




// Commentaires (protégés)
router.get('/admin/comments', requireAuth, adminController.getAllComments);
router.get('/admin/comments/delete/:id', requireAuth, adminController.deleteComment);

// Contacts (protégés)
router.get('/admin/contacts', requireAuth, adminController.getAllContacts);
router.get('/admin/contacts/delete/:id', requireAuth, adminController.deleteContact);

module.exports = router;
