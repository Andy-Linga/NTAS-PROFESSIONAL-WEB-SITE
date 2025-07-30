// Script pour la section intervention
document.addEventListener('DOMContentLoaded', function() {
    // Données des détails (à définir dans la page qui inclut ce script)
    if (typeof details === 'undefined') {
        console.error('Les données "details" ne sont pas définies. Assurez-vous de les passer depuis le serveur.');
        return;
    }
    
    // Variables globales
    let currentIndex = 0;
    const totalDetails = details.length;

    // Éléments DOM
    const detailImage = document.getElementById('detailImage');
    const detailIcon = document.getElementById('detailIcon');
    const detailTitle = document.getElementById('detailTitle');
    const detailItems = document.getElementById('detailItems');
    const currentCounter = document.getElementById('currentCounter');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const progressDots = document.querySelectorAll('.progress-dot');

    // Fonction pour mettre à jour le contenu
    function updateContent(index) {
        const detail = details[index];
        
        // Mise à jour de l'image avec transition
        if (detailImage) {
            detailImage.style.opacity = '0';
            setTimeout(() => {
                detailImage.src = detail.image;
                detailImage.alt = detail.title;
                detailImage.style.opacity = '1';
            }, 150);
        }
        
        // Mise à jour de l'icône et du titre
        if (detailIcon) {
    detailIcon.src = detail.icon;
    detailIcon.alt = detail.title || "Icône";
}

        if (detailTitle) detailTitle.textContent = detail.title;
        
        // Mise à jour des items avec animation
        if (detailItems) {
            detailItems.innerHTML = '';
            detail.items.forEach((item, itemIndex) => {
                const itemElement = document.createElement('div');
                itemElement.className = 'detail-item';
                itemElement.style.animationDelay = `${itemIndex * 0.1}s`;
                
                itemElement.innerHTML = `
                    <div class="bullet"></div>
                    <p>${item}</p>
                `;
                
                detailItems.appendChild(itemElement);
            });
        }
        
        // Mise à jour du compteur
        if (currentCounter) currentCounter.textContent = index + 1;
        
        // Mise à jour des indicateurs de progression
        progressDots.forEach((dot, dotIndex) => {
            dot.classList.toggle('active', dotIndex === index);
        });
    }

    // Fonction pour aller au détail suivant
    function nextDetail() {
        currentIndex = (currentIndex + 1) % totalDetails;
        updateContent(currentIndex);
    }

    // Fonction pour aller au détail précédent
    function prevDetail() {
        currentIndex = (currentIndex - 1 + totalDetails) % totalDetails;
        updateContent(currentIndex);
    }

    // Fonction pour aller à un détail spécifique
    function goToDetail(index) {
        currentIndex = index;
        updateContent(currentIndex);
    }

    // Event listeners
    if (prevBtn) prevBtn.addEventListener('click', prevDetail);
    if (nextBtn) nextBtn.addEventListener('click', nextDetail);

    // Event listeners pour les indicateurs de progression
    progressDots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToDetail(index));
    });

    // Navigation au clavier
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevDetail();
        } else if (e.key === 'ArrowRight') {
            nextDetail();
        }
    });

    // Gestion du swipe sur mobile
    let startX = 0;
    let endX = 0;

    const detailsCard = document.querySelector('.details-card');
    if (detailsCard) {
        detailsCard.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });

        detailsCard.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            handleSwipe();
        });
    }

    function handleSwipe() {
        const threshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                nextDetail();
            } else {
                prevDetail();
            }
        }
    }

    // Initialisation
    updateContent(0);
});