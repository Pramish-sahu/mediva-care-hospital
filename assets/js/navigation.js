/** Navigation module. Mobile menu and mega-menu behavior are implemented in Prompt 3. */
(() => {
  'use strict';

  const header = document.querySelector('[data-header]');
  if (!header) return;

  const syncHeaderState = () => {
    header.classList.toggle('site-header--scrolled', window.scrollY > 12);
  };

  syncHeaderState();
  window.addEventListener('scroll', syncHeaderState, { passive: true });
})();
