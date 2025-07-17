const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

router.get('/projects/:slug', commentController.getComments);
router.post('/comment', commentController.submitComment);

module.exports = router;
