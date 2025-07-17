// controllers/formulaireController.js

const Formulaire = require('../models/formulaire');

// 👉 Affiche la page du formulaire
exports.renderFormulaire = (req, res) => {
  const success = req.query.success === '1';
  const error = req.query.error === '1';
    res.render('contact', {
    title: 'Contact',
    description: 'Page de contact de NTAS',
    stylesheet: ['contact', 'formulaire'],
    currentPage: 'contact',
    success,
    error
  });

};
// 👉 Traite l’envoi du formulaire
exports.submitFormulaire = async (req, res) => {
  try {
    const { nom, prenom, email, sujet, message, domaine } = req.body;

    // Création d’un nouveau document en base
    await Formulaire.create({
      nom,
      prenom,
      email,
      sujet,
      message,
      domaine,
    });

    res.redirect('/contact?success=1');
  } catch (err) {
    console.error('Erreur lors de la soumission du formulaire :', err);
    res.status(500).send('Une erreur est survenue.');
  }
};

// 👉 (Optionnel) Lister tous les messages reçus pour le back-office
exports.getAllMessages = async (req, res) => {
  try {
    const messages = await Formulaire.find().sort({ date: -1 });
    res.render('admin/messages', { messages });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur serveur');
  }
};
