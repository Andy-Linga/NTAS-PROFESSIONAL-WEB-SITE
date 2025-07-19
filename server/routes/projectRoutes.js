const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

// Route dynamique pour chaque projet
router.get('/projets/:slug', commentController.getComments);

// Route POST pour les commentaires
router.post('/comment', commentController.submitComment);

module.exports = router;
