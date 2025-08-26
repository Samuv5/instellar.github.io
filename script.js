// Espera a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
  // === 1. Animación de entrada para tarjetas y elementos ===
  const fadeElements = document.querySelectorAll(
    '.feature-card, .compare-table, .links a, .gallery img'
  );

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
        entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      }
    });
  }, { threshold: 0.1 });

  fadeElements.forEach((el, i) => {
    // Aplica un delay progresivo para efecto de cascada
    el.style.opacity = 0;
    el.style.transform = 'translateY(30px)';
    el.style.transitionDelay = (i * 0.1) + 's';
    observer.observe(el);
  });

  // === 2. Botón de descarga con barra de progreso ===
  const downloadBtn = document.getElementById('downloadBtn');
  const progressContainer = document.getElementById('progressContainer');
  const progressFill = document.getElementById('progressFill');
  const progressPercent = document.getElementById('progressPercent');

  if (downloadBtn) {
    downloadBtn.addEventListener('click', (e) => {
      e.preventDefault();

      // Desactiva el botón
      downloadBtn.disabled = true;
      downloadBtn.innerHTML = 'Starting...';

      // Muestra la barra de progreso
      progressContainer.style.display = 'block';
      setTimeout(() => {
        progressContainer.style.opacity = 1;
      }, 10);

      // Simula progreso de descarga
      let progress = 0;
      const interval = setInterval(() => {
        // Incrementa progresivamente con variación natural
        progress += Math.random() * 7 + 1;

        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);

          // Mensaje final
          setTimeout(() => {
            alert('✅ Download started! Your Instellar OS ISO is ready.');
            downloadBtn.innerHTML = 'Download Now';
            downloadBtn.disabled = false;

            // Oculta la barra suavemente
            progressContainer.style.opacity = 0;
            setTimeout(() => {
              progressContainer.style.display = 'none';
            }, 500);
          }, 600);
        }

        // Actualiza UI
        progressFill.style.width = progress + '%';
        progressPercent.textContent = Math.round(progress);
      }, 180);
    });
  }

  // === 3. Opcional: Efecto de brillo en hover de botones ===
  const buttons = document.querySelectorAll('.btn-primary, .btn-download');
  buttons.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      if (!btn.style.originalShadow) {
        btn.style.originalShadow = btn.style.boxShadow || '0 6px 25px rgba(157, 78, 221, 0.5)';
      }
      btn.style.boxShadow = '0 10px 35px rgba(157, 78, 221, 0.8)';
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.boxShadow = btn.style.originalShadow;
    });
  });
});
