
// HEADER ANIMATIONS ET INTERACTIONS

// Animation au scroll - VERSION CORRIGÉE POUR THÈME CLAIR
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (header) {
        if (window.scrollY > 50) {
            // Quand on scroll, garder le thème clair mais avec une ombre plus prononcée
            header.style.background = '#F1F3F4';
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
            header.style.padding = '0';
        } else {
            // Position normale
            header.style.background = '#F1F3F4';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    }
});

// Effet hover sur les liens de navigation
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.textShadow = '0 0 10px rgba(238, 124, 0, 0.5)'; // Changé pour s'adapter au thème clair
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.textShadow = 'none';
        });
    });

    // Gestion du menu mobile (optionnel)
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('mobile-active');
        });
    }

    // Animation de chargement du logo
    const logoIcon = document.querySelector('.logo-icon');
    if (logoIcon) {
        setTimeout(() => {
            logoIcon.style.transform = 'scale(1.1)';
            setTimeout(() => {
                logoIcon.style.transform = 'scale(1)';
            }, 200);
        }, 500);
    }

    // Smooth scroll pour les ancres (si vous avez des liens internes)
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Script à ajouter dans votre header ou footer
document.addEventListener('DOMContentLoaded', function() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('nav a');
  
  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active');
    }
  });
});

/****************************Acceeuil*********************/

  function scrollSlider(direction) {
            const slider = document.getElementById('slider');
            const scrollAmount = 320; // largeur d'une carte + gap
            slider.scrollBy({
                left: direction * scrollAmount,
                behavior: 'smooth'
            });
        }

        // Smooth scrolling pour les liens d'ancrage
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Animation au scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observer tous les éléments avec animation
        document.querySelectorAll('.service-card, .portfolio-card').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'all 0.6s ease';
            observer.observe(el);
        });


/************************************************************************************************ */

//pour test card testimony (commentaires.ejs)
const cards = document.querySelectorAll('.testimonial-card');
let currentIndex = 0;

function showCard(index) {
  cards.forEach((card, i) => {
    card.style.display = i === index ? 'block' : 'none';
  });
}

document.querySelector('.arrow.right').addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % cards.length;
  showCard(currentIndex);
});

document.querySelector('.arrow.left').addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + cards.length) % cards.length;
  showCard(currentIndex);
});

setInterval(() => {
  currentIndex = (currentIndex + 1) % cards.length;
  showCard(currentIndex);
}, 30000); // 30 sec

// Initial
showCard(currentIndex);
/*------------------------------------------------------------------------------------------------*/

//pour la photo là sur about.ejs

document.addEventListener('DOMContentLoaded', function() {
    const aboutImage = document.getElementById('aboutImage');
    if (!aboutImage) return; // Éviter les erreurs si l'élément n'existe pas
    
    const imageContainer = aboutImage.parentElement;
    
    let isMouseOver = false;
    
    // Fonction pour calculer la distance entre deux points
    function getDistance(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    }
    
    // Fonction pour l'effet de répulsion
    function handleMouseMove(e) {
        if (!isMouseOver) return;
        
        const rect = aboutImage.getBoundingClientRect();
        const imageCenterX = rect.left + rect.width / 2;
        const imageCenterY = rect.top + rect.height / 2;
        
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        // Calculer la distance entre la souris et le centre de l'image
        const distance = getDistance(mouseX, mouseY, imageCenterX, imageCenterY);
        const maxDistance = 200; // Distance maximale d'influence
        
        if (distance < maxDistance) {
            // Calculer l'angle de répulsion
            const angle = Math.atan2(imageCenterY - mouseY, imageCenterX - mouseX);
            
            // Calculer l'intensité de la répulsion (plus proche = plus fort)
            const intensity = (maxDistance - distance) / maxDistance;
            const maxMove = 20; // Distance maximale de déplacement
            
            // Calculer le déplacement
            const moveX = Math.cos(angle) * intensity * maxMove;
            const moveY = Math.sin(angle) * intensity * maxMove;
            
            // Appliquer la transformation
            aboutImage.style.transform = `translate(${moveX}px, ${moveY}px)`;
        } else {
            // Revenir à la position normale si la souris est loin
            aboutImage.style.transform = 'translate(0px, 0px)';
        }
    }
    
    // Event listeners
    imageContainer.addEventListener('mouseenter', function() {
        isMouseOver = true;
    });
    
    imageContainer.addEventListener('mouseleave', function() {
        isMouseOver = false;
        // Revenir à la position normale quand la souris quitte la zone
        aboutImage.style.transform = 'translate(0px, 0px)';
    });
    
    imageContainer.addEventListener('mousemove', handleMouseMove);
});

//--------------------------- Equipe ------------------------//

function toggleAccordion(header) {
    const content = header.nextElementSibling;
    const isActive = header.classList.contains('active');
    
    // Fermer tous les autres accordéons
    document.querySelectorAll('.accordion-header').forEach(h => {
        h.classList.remove('active');
        h.nextElementSibling.classList.remove('active');
    });
    
    // Si l'élément n'était pas actif, l'ouvrir
    if (!isActive) {
        header.classList.add('active');
        content.classList.add('active');
    }
}

// Animation d'entrée
document.addEventListener('DOMContentLoaded', function() {
    const items = document.querySelectorAll('.accordion-item');
    items.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        setTimeout(() => {
            item.style.transition = 'all 0.6s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 150);
    });
});

// ---------------------------- Pour projects.ejs -------------------- //

// ---------------------------- Effet de défilement des galeries -------------------- //

// Effet defilage scroll des galeries
  window.addEventListener('scroll', () => {
    const figure = document.querySelector('.scroll-figure');
    const track = figure.querySelector('.scroll-track');
    const sectionTop = figure.getBoundingClientRect().top;
    const scrollY = window.scrollY;

    // Ajuste la vitesse ici
    if (sectionTop < window.innerHeight && sectionTop > -track.offsetHeight + window.innerHeight) {
      const scrollAmount = Math.min(track.offsetHeight - window.innerHeight, -sectionTop);
      track.style.transform = `translateY(-${scrollAmount}px)`;
    }
  });
