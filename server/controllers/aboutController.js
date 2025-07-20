// controllers/aboutController.js
const Comment = require('../models/comment'); // modèle mongoose

exports.renderAboutPage = async (req, res) => {
  try {
    const comments = await Comment.find(); // récupération des commentaires
    res.render('about', {
      title: 'À Propos',
      description: 'En savoir plus sur NTAS',
      stylesheet: ['about', 'commentaires', 'formulaire'],
      currentPage: 'about',
      comments
    });
  } catch (err) {
    console.error("Erreur lors du chargement de la page About :", err);
    res.status(500).send("Erreur serveur");
  }
};
