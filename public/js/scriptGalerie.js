// ** Script pour la galerie d'images et vidéos avec modal **/
// 🎯 Sélection des éléments du DOM
const modal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const modalVideo = document.getElementById('modalVideo');
const modalVideoSource = document.getElementById('modalVideoSource');
const closeBtn = document.querySelector('.modal-close');

const galleryImages = document.querySelectorAll('.galery img');
const galleryVideos = document.querySelectorAll('.galery video');

// 🖼️ Clic sur image
galleryImages.forEach(img => {
    img.addEventListener('click', () => {
        modal.classList.add('active');
        modalImage.src = img.src;
        modalImage.alt = img.alt;
        modalImage.style.display = 'block';
        modalVideo.style.display = 'none';
    });
});

// 🎥 Clic sur vidéo
galleryVideos.forEach(video => {
    video.addEventListener('click', () => {
        const source = video.querySelector('source');
        modal.classList.add('active');
        modalImage.style.display = 'none';
        modalVideo.style.display = 'block';
        modalVideoSource.src = source.src;
        modalVideo.load();
        modalVideo.play();
    });
});

// ❌ Fermer le modal
function closeModal() {
    modal.classList.remove('active');
    modalImage.src = '';
    modalImage.alt = '';
    modalImage.style.display = 'none';
    modalVideo.pause();
    modalVideo.currentTime = 0;
    modalVideoSource.src = '';
    modalVideo.style.display = 'none';
}

closeBtn.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});


function scrollSlider(direction) {
  const slider = document.getElementById('slider');
  const scrollAmount = 120; // distance à faire défiler

  slider.scrollBy({
    left: scrollAmount * direction,
    behavior: 'smooth'
  });
}
