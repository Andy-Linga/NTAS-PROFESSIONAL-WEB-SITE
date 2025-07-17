const Comment = require('../models/comment');

// 👇 TRAITEMENT DU FORMULAIRE (POST)
exports.submitComment = async (req, res) => {
  try {
    const { name, email, comment, project } = req.body; // ← on récupère le projet dynamiquement

    await Comment.create({
      name,
      email,
      message: comment,
      project // 👈 dynamique (autoliv, yazaki, ey...)
    });

    res.redirect(`/projects/${project}?success=1`);
  } catch (err) {
    console.error('Erreur commentaire :', err);
    res.redirect(`/projects/${project}?error=1`);
  }
};

// 👇 AFFICHAGE DES COMMENTAIRES (GET)
exports.getComments = async (req, res) => {
  const projectSlug = req.params.slug;

  try {
    const comments = await Comment.find({ project: projectSlug }).sort({ date: -1 });

    res.render(`projets/${projectSlug}`, {
      comments,
      projectSlug,
      currentPage: 'projects-' + projectSlug,
      title: `Projet ${projectSlug}`,
      stylesheet: ['projet', 'commentaire']
    });
  } catch (err) {
    console.error(err);
    res.status(404).send('Projet introuvable.');
  }
};
