const mongoose = require('mongoose');

const formulaireSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  email: { type: String, required: true },
  sujet: { type: String, required: true },
  message: { type: String, required: true },
  domaine: {
    type: String,
    enum: ['Commercial', 'Technique', 'Support', 'Ressources Humaines'],
    required: true
  },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Formulaire', formulaireSchema);
