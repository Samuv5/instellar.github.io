// Animación de entrada de tarjetas
document.addEventListener('DOMContentLoaded', () => {
  const featureCards = document.querySelectorAll('.feature-card');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeInUp 0.8s forwards';
        entry.target.style.opacity = 1;
      }
    });
  }, { threshold: 0.1 });

  featureCards.forEach((card, i) => {
    card.style.animationDelay = (0.3 + i * 0.15) + 's';
    observer.observe(card);
  });

  // Botón de descarga
  const btn = document.getElementById('downloadBtn');
  const progressContainer = document.getElementById('progressContainer');
  const progressFill = document.getElementById('progressFill');
  const progressPercent = document.getElementById('progressPercent');

  btn.addEventListener('click', (e) => {
    e.preventDefault();

    btn.disabled = true;
    btn.innerHTML = 'Starting...';
    progressContainer.style.display = 'block';
    progressContainer.style.opacity = 0;
    setTimeout(() => { progressContainer.style.opacity = 1; }, 10);

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 8 + 1;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => {
          alert('✅ Download started! (Simulated)');
          btn.innerHTML = 'Download Now';
          btn.disabled = false;
          progressContainer.style.opacity = 0;
          setTimeout(() => { progressContainer.style.display = 'none'; }, 500);
        }, 600);
      }
      progressFill.style.width = progress + '%';
      progressPercent.textContent = Math.round(progress);
    }, 180);
  });
});
