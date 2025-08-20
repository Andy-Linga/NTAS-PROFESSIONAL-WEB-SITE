// Chargement des variables d’environnement depuis .env
require('dotenv').config();

// Importation d'Express
const express = require('express');
const app = express();
const expressLayout = require('express-ejs-layouts');
const connectDB = require('./server/config/db');
const commentRoutes = require('./server/routes/commentsRoutes');

const session = require('express-session');
app.use(session({
  secret: 'secret-admin-ntas',
  resave: false,
  saveUninitialized: false
}));

// Pour traiter les données POST des formulaires
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Définition du port : depuis .env ou par défaut 5000
const PORT = process.env.PORT || 5000;

//Connecter à la base de données
connectDB();

app.use(express.static('public'));


//Templating Engine
app.use(expressLayout);
app.set('layout','layouts/main');
app.set('view engine', 'ejs');


app.use('/', require('./server/routes/main'));
app.use('/', require('./server/routes/formulaireRoutes'));
app.use('/', require('./server/routes/projectRoutes'));
app.use('/', require('./server/routes/adminRoutes'));
app.use('/', require('./server/routes/userRoutes'));


app.use('/', commentRoutes);


app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});








// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`App listening on http://localhost:${PORT}`);
});





