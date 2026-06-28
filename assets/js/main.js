/** Mediva Care Hospital — production bootstrap and safe global fallbacks. */
(() => {
  'use strict';

  const body = document.body;

  const updateCurrentYear = () => {
    document.querySelectorAll('[data-current-year]').forEach((node) => {
      node.textContent = new Date().getFullYear();
    });
  };

  const secureExternalLinks = () => {
    document.querySelectorAll('a[target="_blank"]').forEach((link) => {
      const rel = new Set((link.getAttribute('rel') || '').split(/\s+/).filter(Boolean));
      rel.add('noopener');
      rel.add('noreferrer');
      link.setAttribute('rel', [...rel].join(' '));
    });
  };

  const restoreFromHistory = () => {
    body.classList.remove('is-scroll-locked');
    document.querySelectorAll('[aria-busy="true"]').forEach((element) => {
      element.setAttribute('aria-busy', 'false');
      if ('disabled' in element) element.disabled = false;
    });
  };

  updateCurrentYear();
  secureExternalLinks();
  document.documentElement.classList.add('site-ready');

  window.addEventListener('pageshow', restoreFromHistory);
})();
