const express = require('express');
const router = express.Router();
const formulaireController = require('../controllers/formulaireController');

// Route d’affichage du formulaire
router.get('/contact', formulaireController.renderFormulaire);

// Route de traitement du formulaire
router.post('/contact', formulaireController.submitFormulaire);

module.exports = router;
