// server/controllers/userController.js
const User = require('../models/user');
const bcrypt = require('bcrypt');

// Affiche la page d'inscription
exports.showRegisterForm = (req, res) => {
  res.render('user/register', {
    title: 'Créer un compte utilisateur',
    stylesheet: ['login']
  });
};

// Affiche la page de login
exports.showLoginForm = (req, res) => {
  res.render('user/login', {
    title: 'Connexion',
    stylesheet: ['login']
  });
};


// Traitement inscription
exports.register = async (req, res) => {
  try {
    const { prenom, nom, email, password } = req.body;

    // Vérifier si email existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.render('user/register', {
  error: 'Email déjà utilisé',
  stylesheet: ['login'],
  title: 'Créer un compte'
});

    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      prenom,
      nom,
      email,
      password: hashedPassword,
    });

    await user.save();

    req.session.userId = user._id;
    res.redirect('/');
  } catch (error) {
    console.error('Erreur inscription :', error);
 res.render('user/register', {
  error: 'Erreur lors de l\'inscription',
  stylesheet: ['login'],
  title: 'Créer un compte'
});

  }
};

// Traitement login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.render('user/login', {
        error: 'Email ou mot de passe incorrect',
        stylesheet: ['login'],
        title: 'Connexion utilisateur'
      });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.render('user/login', {
        error: 'Email ou mot de passe incorrect',
        stylesheet: ['login'],
        title: 'Connexion utilisateur'
      });
    }

    req.session.userId = user._id;
    res.redirect('/projects');
  } catch (error) {
    console.error('Erreur connexion :', error);
    res.render('user/login', {
      error: 'Erreur lors de la connexion',
      stylesheet: ['login'],
      title: 'Connexion utilisateur'
    });
  }
};


// Déconnexion
exports.logout = (req, res) => {
  req.session.destroy(err => {
    if (err) console.error('Erreur déconnexion :', err);
    res.redirect('/');
  });
};
