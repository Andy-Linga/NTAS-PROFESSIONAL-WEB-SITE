const Comment = require('../models/comment');
const Formulaire = require('../models/formulaire');

// Dashboard
exports.dashboard = (req, res) => {
  res.render('admin/dashboard', {
    title: 'Admin - Tableau de bord',
    currentPage: 'admin',
    stylesheet: ['dashboard'],
  });
};

// --- Commentaires ---
exports.getAllComments = async (req, res) => {
  const comments = await Comment.find().sort({ date: -1 });
  res.render('admin/comments', { 
    comments,
    title: 'Admin - Gestion des commentaires',
    currentPage: 'admin-comments',
    stylesheet: ['adminComments']

   });
};

exports.deleteComment = async (req, res) => {
  await Comment.findByIdAndDelete(req.params.id);
  res.redirect('/admin/comments');
};

// --- Contacts ---
exports.getAllContacts = async (req, res) => {
  const contacts = await Formulaire.find().sort({ date: -1 });
  res.render('admin/contacts', {
    contacts,
    title: 'Admin - Gestion des contacts',
    currentPage: 'admin-contacts',
    stylesheet: ['adminContacts'] // ← ici tu indiques ton fichier CSS
  });
};

exports.deleteContact = async (req, res) => {
  await Formulaire.findByIdAndDelete(req.params.id);
  res.redirect('/admin/contacts');
};