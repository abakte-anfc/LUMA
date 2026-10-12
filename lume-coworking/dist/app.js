(() => {
  'use strict';
  const config = window.LUME_CONFIG || {};
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const compact = window.matchMedia('(max-width: 900px)');
  const header = document.querySelector('.header');
  const menu = document.getElementById('menu');
  const toggle = document.querySelector('.menu-toggle');
  const contactNote = document.getElementById('dados-contato');
  document.getElementById('year').textContent = new Date().getFullYear();
  function setMenu(open, restoreFocus = false) {
    toggle.setAttribute('aria-expanded', String(open));
    menu.hidden = compact.matches && !open;
    if (restoreFocus) toggle.focus();
  }
  function syncMenu() {
    const wasInside = menu.contains(document.activeElement);
    toggle.hidden = !compact.matches;
    setMenu(false, compact.matches && wasInside);
  }
  document.body.classList.add('js-menu');
  syncMenu();
  compact.addEventListener('change', syncMenu);
  toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  menu.addEventListener('click', event => {
    const link = event.target.closest('a');
    if (!link) return;
    setMenu(false);
    const destination = document.querySelector(link.getAttribute('href'));
    if (destination && compact.matches) {
      destination.setAttribute('tabindex', '-1');
      destination.focus({ preventScroll: true });
    }
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') setMenu(false, true);
  });
  window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 35), { passive: true });
  header.classList.toggle('scrolled', window.scrollY > 35);

  const phone = String(config.whatsapp || '').replace(/[^0-9]/g, '');
  const validPhone = /^55[0-9]{10,11}$/.test(phone);
  document.querySelectorAll('[data-contact]').forEach(link => {
    if (validPhone) {
      const message = config.messages?.[link.dataset.contact] || config.messages?.geral || 'Olá! Gostaria de conhecer o Lume.';
      link.href = 'https://wa.me/' + phone + '?text=' + encodeURIComponent(message);
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    } else {
      link.setAttribute('aria-describedby', 'dados-contato');
      link.addEventListener('click', () => {
        requestAnimationFrame(() => contactNote.focus({ preventScroll: true }));
      });
    }
  });
  if (validPhone) contactNote.hidden = true;
  const locationDetails = document.getElementById('location-details');
  if (config.address || config.hours) {
    locationDetails.replaceChildren();
    [config.address, config.hours].filter(Boolean).forEach(text => {
      const p = document.createElement('p');
      p.className = 'pending-inline';
      p.textContent = text;
      locationDetails.append(p);
    });
    try {
      const route = new URL(config.mapsUrl);
      if (route.protocol === 'https:' && /(^|\.)(google\.com|google\.com\.br|maps\.app\.goo\.gl)$/.test(route.hostname)) {
        const a = document.createElement('a');
        a.className = 'text-link';
        a.textContent = 'Traçar rota ↗';
        a.href = route.href;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        locationDetails.append(a);
      }
    } catch (_) { /* O endereço continua visível sem rota validada. */ }
  }

  const dialog = document.getElementById('lightbox');
  const gallery = Array.from(document.querySelectorAll('[data-gallery]'));
  const image = document.getElementById('lightbox-image');
  const caption = document.getElementById('lightbox-caption');
  const count = document.getElementById('lightbox-count');
  let active = 0;
  let opener = null;
  function showPhoto(index) {
    active = (index + gallery.length) % gallery.length;
    const source = gallery[active];
    const label = source.querySelector('img').alt;
    image.src = source.href;
    image.alt = label;
    caption.textContent = label;
    count.textContent = String(active + 1).padStart(2, '0') + ' / ' + String(gallery.length).padStart(2, '0');
  }
  if (typeof dialog.showModal === 'function') {
    gallery.forEach((link, index) => link.addEventListener('click', event => {
      event.preventDefault();
      opener = link;
      showPhoto(index);
      dialog.showModal();
      document.body.style.overflow = 'hidden';
      document.getElementById('lightbox-close').focus();
    }));
    document.getElementById('lightbox-close').addEventListener('click', () => dialog.close());
    document.getElementById('lightbox-prev').addEventListener('click', () => showPhoto(active - 1));
    document.getElementById('lightbox-next').addEventListener('click', () => showPhoto(active + 1));
    dialog.addEventListener('keydown', event => {
      if (event.key === 'ArrowRight') { event.preventDefault(); showPhoto(active + 1); }
      if (event.key === 'ArrowLeft') { event.preventDefault(); showPhoto(active - 1); }
    });
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const bounds = dialog.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
    });
    dialog.addEventListener('close', () => {
      document.body.style.overflow = '';
      if (opener) opener.focus({ preventScroll: true });
      image.removeAttribute('src');
    });
  }

  let observer;
  function revealAll() {
    if (observer) observer.disconnect();
    document.querySelectorAll('.pending-reveal').forEach(element => element.classList.remove('pending-reveal'));
  }
  function setupReveals() {
    revealAll();
    if (reduced.matches || !('IntersectionObserver' in window)) return;
    try {
      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.classList.remove('pending-reveal');
          entry.target.dataset.revealed = 'true';
          observer.unobserve(entry.target);
        });
      }, { threshold: 0.08 });
      document.querySelectorAll('.reveal').forEach(element => {
        if (element.dataset.revealed || element.contains(document.activeElement)) return;
        if (element.getBoundingClientRect().top <= window.innerHeight) {
          element.dataset.revealed = 'true';
          return;
        }
        observer.observe(element);
        element.classList.add('pending-reveal');
      });
    } catch (_) { revealAll(); }
  }
  document.addEventListener('focusin', event => {
    const block = event.target.closest('.pending-reveal');
    if (block) {
      block.classList.remove('pending-reveal');
      block.dataset.revealed = 'true';
      if (observer) observer.unobserve(block);
    }
  });
  reduced.addEventListener('change', () => {
    if (reduced.matches) revealAll();
    else setupReveals();
  });
  setupReveals();
})();
