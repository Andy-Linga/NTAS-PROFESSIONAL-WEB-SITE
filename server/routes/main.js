const express = require('express');
const router = express.Router();


// Page d'accueil
router.get('/', (req, res) => {
  const locals = {
    title: 'NTAS',
    description: 'Welcome to our website!'
  };

  res.render('index', {
    locals,
    stylesheet: ['style','formulaire'],  // ici ton tableau de CSS (par exemple 'style.css')
    currentPage: 'home'
  });
});



// Page Services
router.get('/services', (req, res) => {
  res.render('services', {
    title: 'Nos Services',
    description: 'Découvrez les services offerts par NTAS',
    stylesheet: 'services',
    currentPage: 'services'
  });
});

// Page À propos (avec commentaires.css en plus)
router.get('/about', (req, res) => {
  res.render('about', {
    title: 'À Propos',
    description: 'En savoir plus sur NTAS',
    stylesheet: ['about', 'commentaires','formulaire'], // <- plusieurs CSS si besoin
    currentPage: 'about'
  });
});

// Page Projets génerals
router.get('/projects', (req, res) => {
  res.render('projects', {
    title: 'Projets',
    description: 'Découvrez nos projets récents',
    stylesheet: 'projects',
    currentPage: 'projects'
  });
});
/************** Details projets (proj) ******************************************* */
router.get('/visteon', (req, res) => {
  res.render('projets/visteon', {
    title: 'visteon',
    description: 'visteon',
    stylesheet: ['proj','comment'],
    currentPage: 'projects',
  });
});

/*router.get('/autoliv', (req, res) => {
  console.log('Route /autoliv appelée'); // Pour debug
  res.render('projets/autoliv', {
    title: 'autoliv',
    description: 'autoliv',
    stylesheet: ['proj','comment'],
    currentPage: 'projects',
  });
});*/
router.get('/yazaki', (req, res) => {
  res.render('projets/yazaki', {
    title: 'yazaki',
    description: 'yazaki',
    stylesheet: ['proj','comment'],
    currentPage: 'projects',
  });
});

router.get('/sebn', (req, res) => {
  res.render('projets/sebn', {
    title: 'sebn',
    description: 'sebn',
    stylesheet: ['proj','comment'],
    currentPage: 'projects',
  });
});

router.get('/lakebay', (req, res) => {
  res.render('projets/lakebay', {
    title: 'lakebay',
    description: 'lakebay',
    stylesheet: ['proj','comment'],
    currentPage: 'projects',
  });
});

router.get('/hekma', (req, res) => {
  res.render('projets/hekma', {
    title: 'hekma',
    description: 'hekma',
    stylesheet: ['proj','comment'],
    currentPage: 'hekma',
  });
});

router.get('/ey', (req, res) => {
  res.render('projets/ey', {
    title: 'ey',
    description: 'ey',
    stylesheet: ['proj','comment'],
    currentPage: 'projects',
  });
});

router.get('/sews', (req, res) => {
  res.render('projets/sews', {
    title: 'sews',
    description: 'sews',
    stylesheet: ['proj','comment'],
    currentPage: 'projects',
  });
});

router.get('/tunisie', (req, res) => {
  res.render('projets/tunisie', {
    title: 'Tunisie',
    description: 'Projet Tunisie',
    stylesheet: ['proj','comment'],
    currentPage: 'projects',
  });
});

/***************** Galerie *****************************************/
router.get('/projects/galerie', (req, res) => {
  res.render('galerie', {
    title: 'galerie',
    description: 'Découvrez la galerie de nos projets récents',
    stylesheet: 'galerie',
    currentPage: 'projects'
  });
});
/**********************************************************/


/******************* proj_galerie ************************************** */

router.get('/gal/autoliv_galerie', (req, res) => {
  res.render('gal/autoliv_galerie', {
    title: 'autoliv_galerie',
    description: 'Découvrez la galerie de nos projets récents',
    stylesheet: 'proj_galerie',
    currentPage: 'projects'
  });
});

router.get('/gal/visteon_galerie', (req, res) => {
  res.render('gal/visteon_galerie', {
    title: 'visteon_galerie',
    description: 'Découvrez la galerie de Visteon',
    stylesheet: 'proj_galerie',
    currentPage: 'projects'
  });
});

router.get('/gal/yazaki_galerie', (req, res) => {
  res.render('gal/yazaki_galerie', {
    title: 'yazaki_galerie',
    description: 'Découvrez la galerie de Yazaki',
   stylesheet: 'proj_galerie',
    currentPage: 'projects'
  });
});

router.get('/gal/sebn_galerie', (req, res) => {
  res.render('gal/sebn_galerie', {
    title: 'sebn_galerie',
    description: 'Découvrez la galerie de SEBN',
    stylesheet: 'proj_galerie',
    currentPage: 'projects'
  });
});

router.get('/gal/lakebay_galerie', (req, res) => {
  res.render('gal/lakebay_galerie', {
    title: 'lakebay_galerie',
    description: 'Découvrez la galerie de Lakebay',
     stylesheet: 'proj_galerie',
    currentPage: 'projects'
  });
});

router.get('/gal/hekma_galerie', (req, res) => {
  res.render('gal/hekma_galerie', {
    title: 'hekma_galerie',
    description: 'Découvrez la galerie de Orange',
    stylesheet: 'proj_galerie',
    currentPage: 'projects'
  });
});

router.get('/gal/ey_galerie', (req, res) => {
  res.render('gal/ey_galerie', {
    title: 'ey_galerie',
    description: 'Découvrez la galerie de EY',
   stylesheet: 'proj_galerie',
    currentPage: 'projects'
  });
});

router.get('/gal/sews_galerie', (req, res) => {
  res.render('gal/sews_galerie', {
    title: 'sews_galerie',
    description: 'Découvrez la galerie de SEWS',
     stylesheet: 'proj_galerie',
    currentPage: 'projects'
  });
});
555
router.get('/gal/tunisie_galerie', (req, res) => {
  res.render('gal/tunisie_galerie', {
    title: 'tunisie_galerie',
    description: 'Découvrez la galerie du projet Tunisie',
   stylesheet: 'proj_galerie',
    currentPage: 'projects'
  });
});
module.exports = router;

// ---------------------------- projets en cours (current projects) -------------------- //
router.get('/projects/current_projects', (req, res) => {
  res.render('current_projects', {
    title: 'current_projects',
    description: 'Découvrez  nos projets en cours',
    stylesheet: 'Current_projects',
    currentPage: 'projects'
  });
});
