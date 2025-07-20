document.addEventListener('DOMContentLoaded', function() {
    const testimonialContainer = document.querySelector('.testimonial-container');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const leftArrow = document.querySelector('.arrow.left');
    const rightArrow = document.querySelector('.arrow.right');
    
    if (!testimonialCards || testimonialCards.length === 0) {
        console.log('Aucun témoignage trouvé');
        return;
    }

    let currentIndex = 0;
    let autoSlideInterval;
    const autoSlideDelay = 4000; // 4 secondes
    const isAutoSlideEnabled = true; // Mettre à false pour désactiver le défilement auto

    // Masquer toutes les cartes sauf la première
    function showCard(index) {
        testimonialCards.forEach((card, i) => {
            if (i === index) {
                card.style.display = 'flex';
                card.style.opacity = '0';
                // Animation d'apparition
                setTimeout(() => {
                    card.style.transition = 'opacity 0.5s ease-in-out';
                    card.style.opacity = '1';
                }, 50);
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Fonction pour aller au témoignage suivant
    function nextTestimonial() {
        currentIndex = (currentIndex + 1) % testimonialCards.length;
        showCard(currentIndex);
    }

    // Fonction pour aller au témoignage précédent
    function prevTestimonial() {
        currentIndex = currentIndex === 0 ? testimonialCards.length - 1 : currentIndex - 1;
        showCard(currentIndex);
    }

    // Démarrer le défilement automatique
    function startAutoSlide() {
        if (isAutoSlideEnabled && testimonialCards.length > 1) {
            autoSlideInterval = setInterval(nextTestimonial, autoSlideDelay);
        }
    }

    // Arrêter le défilement automatique
    function stopAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
        }
    }

    // Redémarrer le défilement automatique après interaction
    function restartAutoSlide() {
        stopAutoSlide();
        setTimeout(startAutoSlide, 2000); // Redémarrer après 2 secondes
    }

    // Event listeners pour les flèches
    if (rightArrow) {
        rightArrow.addEventListener('click', function() {
            nextTestimonial();
            restartAutoSlide();
        });
    }

    if (leftArrow) {
        leftArrow.addEventListener('click', function() {
            prevTestimonial();
            restartAutoSlide();
        });
    }

    // Pause au survol de la carte
    testimonialContainer.addEventListener('mouseenter', stopAutoSlide);
    testimonialContainer.addEventListener('mouseleave', startAutoSlide);

    // Support du clavier
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight') {
            nextTestimonial();
            restartAutoSlide();
        } else if (e.key === 'ArrowLeft') {
            prevTestimonial();
            restartAutoSlide();
        }
    });

    // Gestion tactile pour mobile
    let touchStartX = 0;
    let touchEndX = 0;

    testimonialContainer.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoSlide();
    });

    testimonialContainer.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        restartAutoSlide();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe gauche - aller au suivant
                nextTestimonial();
            } else {
                // Swipe droite - aller au précédent
                prevTestimonial();
            }
        }
    }

    // Indicateurs de pagination (optionnel)
    function createPaginationDots() {
        if (testimonialCards.length <= 1) return;

        const paginationContainer = document.createElement('div');
        paginationContainer.className = 'testimonial-pagination';
        paginationContainer.style.cssText = `
            display: flex;
            justify-content: center;
            margin-top: 30px;
            gap: 10px;
        `;

        testimonialCards.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = 'pagination-dot';
            dot.style.cssText = `
                width: 12px;
                height: 12px;
                border-radius: 50%;
                border: none;
                background-color: #bdc3c7;
                cursor: pointer;
                transition: background-color 0.3s ease;
            `;
            
            if (index === currentIndex) {
                dot.style.backgroundColor = '#ff6b35';
            }

            dot.addEventListener('click', function() {
                currentIndex = index;
                showCard(currentIndex);
                updatePaginationDots();
                restartAutoSlide();
            });

            paginationContainer.appendChild(dot);
        });

        testimonialContainer.parentNode.appendChild(paginationContainer);
    }

    function updatePaginationDots() {
        const dots = document.querySelectorAll('.pagination-dot');
        dots.forEach((dot, index) => {
            dot.style.backgroundColor = index === currentIndex ? '#ff6b35' : '#bdc3c7';
        });
    }

    // Initialisation
    showCard(currentIndex);
    createPaginationDots();
    startAutoSlide();

    // Log pour debug
    console.log(`Carrousel initialisé avec ${testimonialCards.length} témoignages`);
});