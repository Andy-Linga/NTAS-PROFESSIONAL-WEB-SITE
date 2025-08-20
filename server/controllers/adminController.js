const Comment = require('../models/comment');
const Formulaire = require('../models/formulaire');
// controllers/adminController.js
const Admin = require('../models/admin');


exports.signinPage = (req, res) => {
  res.render('admin/signin', {
    title: 'Créer un compte Admin',
    stylesheet: ['login']
  });
};

// 👤 Traitement du formulaire d'inscription admin

exports.handleSignin = async (req, res) => {
  try {
    const { username, password, nom, prenom } = req.body;

    const exists = await Admin.findOne({ username });
    if (exists) {
      return res.render('admin/signin', {
        error: 'Ce nom d’utilisateur existe déjà.',
        title: 'Créer un compte Admin',
        stylesheet: ['login'] // <= tu dois le redonner ici aussi
      });
    }

const newAdmin = new Admin({ username, password, nom, prenom });
    await newAdmin.save();
    req.session.admin = newAdmin._id;
    res.redirect('/admin');
  } catch (err) {
    console.error('Erreur création admin :', err);
    res.render('admin/signin', { error: 'Erreur interne.' });
  }
};
/**************************************************************** */

// 👉 Page de login
exports.loginPage = (req, res) => {
    res.render('admin/login', {
    title: 'Connexion Admin',
    currentPage: '',
    stylesheet: ['login'] // ← nom du fichier CSS sans `.css`
  });

};


exports.handleLogin = async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username });

  if (admin && await admin.comparePassword(password)) {
    req.session.admin = admin._id;
    return res.redirect('/admin');
  }

  res.render('admin/login', {
  title: 'Connexion Admin',
   error: 'Identifiants incorrects',
  title: 'Connexion Admin',
  currentPage: '',
   stylesheet: ['login'] 
});
};

// 🔒 Déconnexion admin
exports.logout = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Erreur déconnexion :', err);
      return res.redirect('/admin');
    }
    res.redirect('/');
  });
};


// Dashboard
exports.dashboard = (req, res) => {
  res.render('admin/dashboard', {
    title: 'Admin - Tableau de bord',
    currentPage: 'admin',
    stylesheet: ['dashboard'],
  });
};

// middlewares/auth.js
exports.requireAuth = (req, res, next) => {
console.log('Session actuelle:', req.session); // ← regarde si elle contient "admin"
  if (req.session && req.session.admin) {
    return next();
  }
  res.redirect('/admin/login');
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