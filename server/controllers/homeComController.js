const Comment = require('../models/comment');

exports.renderHome = async (req, res) => {
  try {
    const comments = await Comment.find().sort({ date: -1 }).limit(10); // ou plus

    res.render('index', {
      comments, // à utiliser dans commentaires.ejs
      stylesheet: ['style','formulaire','commentaires'],  // ici ton tableau de CSS (par exemple 'style.css')
      currentPage: 'home',
      title: 'NTAS',
      description: 'Welcome to our website!'
    });
  } catch (err) {
    console.error('Erreur chargement commentaires:', err);
    res.render('index', { comments: [] });
  }
};
