// Route pour la page About
app.get('/about', (req, res) => {
  const details = [
    {
      id: 1,
      title: "Sécurité maximale",
      items: [
        "Sécurité maximale est nécessaire pour les sites sensibles et industriels, incluant :",
        "Filtrage des accès.",
        "Détection de fumée, départ de feu, asservissement et extinction."
      ],
      image: "https://images.pexels.com/photos/430208/pexels-photo-430208.jpeg?auto=compress&cs=tinysrgb&w=800",
      icon: "🛡️"
    },
    {
      id: 2,
      title: "Contrôle d'accès centralisé",
      items: [
        "Contrôle d'accès centralisé pour les sites locaux et distants",
        "Vidéosurveillance et Alarme intrusion",
        "Poste Centrale de supervision (PCS), live view et traçabilité complète"
      ],
      image: "https://images.pexels.com/photos/2449665/pexels-photo-2449665.jpeg?auto=compress&cs=tinysrgb&w=800",
      icon: "👁️"
    },
    {
      id: 3,
      title: "Couverture Internet totale",
      items: [
        "Couverture Internet totale en Wi-Fi 6 : plage, piscine, espaces communs et chambres.",
        "TVIP, Remplacement des solutions TV classiques par une solution IP assurant plus d'interactivité et IOT."
      ],
      image: "https://images.pexels.com/photos/159304/network-cable-ethernet-computer-159304.jpeg?auto=compress&cs=tinysrgb&w=800",
      icon: "📶"
    }
  ];

  res.render('about', { details });
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});