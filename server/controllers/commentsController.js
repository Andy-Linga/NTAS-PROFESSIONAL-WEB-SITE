

const express = require('express');
const router = express.Router();
const { requireUserAuth } = require('../middlewares/auth');
const Comment = require('../models/comment');

router.post('/projects/:project/comments', requireUserAuth, async (req, res) => {
  try {
    await Comment.create({
      message: req.body.message,
      project: req.params.project,
      userId: req.session.userId
    });
    res.redirect(`/projects/${req.params.project}`);
  } catch (error) {
    console.error('Erreur lors de la création du commentaire :', error);
    res.status(500).send('Erreur serveur');
  }
});

module.exports = router;
