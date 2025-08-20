// server/middlewares/auth.js
exports.requireAuth = (req, res, next) => {
  if (req.session && req.session.admin) {
    return next();
  }
  res.redirect('/admin/login');
};

// Protection utilisateur connecté
exports.requireUserAuth = (req, res, next) => {
  if (req.session && req.session.userId) {
    return next();
  }
  res.redirect('/user/login');
};


