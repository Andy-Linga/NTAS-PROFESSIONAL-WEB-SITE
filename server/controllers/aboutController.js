// controllers/aboutController.js
const Comment = require('../models/comment'); // modèle mongoose

exports.renderAboutPage = async (req, res) => {
  try {
    const comments = await Comment.find();

   const details = [
  {
    icon: "🛡️",
    title: "Site industriel et Seveso ",
    items: [
      "Sécurité maximale est nécessaire pour les sites sensibles et industriels, incluant :",
      "Filtrage des accès.",
      "Détection de fumée, départ de feu, asservissement et extinction."
    ],
    image: "https://images.pexels.com/photos/247763/pexels-photo-247763.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    icon: "⚙️",
    title: "Bâtiments tertiaires",
    items: [
      "Contrôle d'accès centralisé pour les sites locaux et distants",
      "Vidéosurveillance et Alarme intrusion",
      "Poste Centrale de supervision (PCS), live view et traçabilité complète"
    ],
    image: "https://images.pexels.com/photos/257856/pexels-photo-257856.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    icon: "🔒",
    title: "Hôtellerie",
    items: [
      "Couverture Internet totale en Wi-Fi 6 : plage, piscine, espaces communs et chambres.",
      "TVIP, Remplacement des solutions TV classiques par une solution IP assurant plus d’interactivité et IOT."
    ],
    image: "https://images.pexels.com/photos/70441/pexels-photo-70441.jpeg?w=800&h=600&fit=crop"

  }
];

    res.render('about', {
      title: 'À Propos',
      description: 'En savoir plus sur NTAS',
      stylesheet: ['about', 'commentaires', 'formulaire','intervention'],
      currentPage: 'about',
      comments,
      details // ✅ on ajoute details ici
    });
  } catch (err) {
    console.error("Erreur lors du chargement de la page About :", err);
    res.status(500).send("Erreur serveur");
  }
};