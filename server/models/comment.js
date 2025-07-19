const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  prenom: { type: String, required: true }, // Ajout du champ preno
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  project: { type: String }, // pour savoir à quel projet appartient le commentaire (ex: "autoliv")
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Comment', commentSchema);
