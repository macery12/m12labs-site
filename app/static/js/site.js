/* global site.js — mobile nav, lightbox modal, gallery filter, FAQ accordion */
(function () {
  'use strict';

  /* ── Mobile nav ──────────────────────────────────────── */
  const hamburger = document.getElementById('nav-hamburger');
  const navLinks  = document.getElementById('nav-links');

  if (hamburger && navLinks) {
    // Clone nav-actions into the mobile menu area
    const navActions = document.querySelector('.nav-actions');

    hamburger.addEventListener('click', function () {
      const open = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!open));
      navLinks.classList.toggle('open', !open);
      if (navActions) navActions.classList.toggle('open', !open);
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.nav') && hamburger.getAttribute('aria-expanded') === 'true') {
        hamburger.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('open');
        if (navActions) navActions.classList.remove('open');
      }
    });
  }

  /* ── Gallery filter ──────────────────────────────────── */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const galleryEmpty = document.getElementById('gallery-empty');

  if (filterBtns.length && galleryItems.length) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const filter = this.dataset.filter;

        // Update active state
        filterBtns.forEach(function (b) {
          b.classList.remove('active');
          b.setAttribute('aria-pressed', 'false');
        });
        this.classList.add('active');
        this.setAttribute('aria-pressed', 'true');

        // Show/hide items
        let visible = 0;
        galleryItems.forEach(function (item) {
          const match = filter === 'All' || item.dataset.category === filter;
          item.style.display = match ? '' : 'none';
          if (match) visible++;
        });

        if (galleryEmpty) galleryEmpty.hidden = visible > 0;
      });
    });
  }

  /* ── Lightbox modal ──────────────────────────────────── */
  const modal      = document.getElementById('modal');
  const modalImg   = document.getElementById('modal-img');
  const modalClose = document.getElementById('modal-close');
  const modalPrev  = document.getElementById('modal-prev');
  const modalNext  = document.getElementById('modal-next');
  const overlay    = document.getElementById('modal-overlay');

  let currentIndex = 0;
  let shots = [];
  let lastFocus = null;

  function buildShotList() {
    shots = Array.from(
      document.querySelectorAll('.gallery-item[data-src]')
    ).filter(function (el) { return el.style.display !== 'none'; });
  }

  function openModal(index) {
    buildShotList();
    if (!shots.length) return;
    currentIndex = ((index % shots.length) + shots.length) % shots.length;
    const shot = shots[currentIndex];
    modalImg.src = shot.dataset.src;
    modalImg.alt = shot.dataset.alt || '';
    modal.hidden = false;
    lastFocus = document.activeElement;
    modalClose.focus();
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.hidden = true;
    modalImg.src = '';
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }

  function navigate(dir) {
    buildShotList();
    openModal(currentIndex + dir);
  }

  if (modal) {
    // Open on gallery item click
    document.addEventListener('click', function (e) {
      const item = e.target.closest('.gallery-item[data-src]');
      if (item) {
        buildShotList();
        const idx = shots.indexOf(item);
        openModal(idx >= 0 ? idx : 0);
      }
    });

    modalClose && modalClose.addEventListener('click', closeModal);
    overlay    && overlay.addEventListener('click', closeModal);
    modalPrev  && modalPrev.addEventListener('click', function () { navigate(-1); });
    modalNext  && modalNext.addEventListener('click', function () { navigate(1); });

    document.addEventListener('keydown', function (e) {
      if (modal.hidden) return;
      if (e.key === 'Escape')      closeModal();
      if (e.key === 'ArrowLeft')   navigate(-1);
      if (e.key === 'ArrowRight')  navigate(1);
      // Trap focus inside modal
      if (e.key === 'Tab') {
        const focusable = modal.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];
        const last  = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault(); last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault(); first.focus();
        }
      }
    });
  }

  /* ── FAQ accordion ───────────────────────────────────── */
  const faqBtns = document.querySelectorAll('.faq-btn');

  faqBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const expanded = this.getAttribute('aria-expanded') === 'true';
      const answerId = this.getAttribute('aria-controls');
      const answer   = document.getElementById(answerId);

      // Collapse all others
      faqBtns.forEach(function (other) {
        if (other !== btn) {
          other.setAttribute('aria-expanded', 'false');
          const otherAnswer = document.getElementById(other.getAttribute('aria-controls'));
          if (otherAnswer) otherAnswer.hidden = true;
        }
      });

      this.setAttribute('aria-expanded', String(!expanded));
      if (answer) answer.hidden = expanded;
    });
  });

})();
