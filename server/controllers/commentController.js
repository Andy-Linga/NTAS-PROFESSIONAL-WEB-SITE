const fs = require('fs');
const path = require('path');
const Comment = require('../models/comment');

// 📨 Enregistrement du commentaire
exports.submitComment = async (req, res) => {
  try {
    const { prenom, name, email, comment, project } = req.body;

    await Comment.create({
      prenom,
      name,
      email,
      message: comment,
      project
    });

    res.redirect(`/projets/${project}?success=1`);
  } catch (err) {
    console.error('Erreur commentaire :', err);
    res.redirect(`/projets/${project}?error=1`);
  }
};

// 📄 Affichage dynamique d’un projet + ses commentaires
exports.getComments = async (req, res) => {
  const projectSlug = req.params.slug;

  try {
    console.log('Project demandé :', projectSlug);

    // 1. Vérifier si la vue existe
    const viewPath = path.join(__dirname, '..', '..', 'views', 'projets', `${projectSlug}.ejs`);
    if (!fs.existsSync(viewPath)) {
      console.error('Vue introuvable :', viewPath);
      return res.status(404).send('Vue introuvable : ' + projectSlug);
    }

    // 2. Récupérer les commentaires liés à ce projet
    const comments = await Comment.find({ project: projectSlug }).sort({ date: -1 });

    // 3. Rendre la bonne vue avec les données
    res.render(`projets/${projectSlug}`, {
      comments,
      projectSlug,
      currentPage: `projects-${projectSlug}`,
      title: `Projet ${projectSlug}`,
     stylesheet: ['proj','comment'],
    });
  } catch (err) {
    console.error('Erreur affichage projet :', err);
    res.status(500).send('Erreur serveur.');
  }
};
