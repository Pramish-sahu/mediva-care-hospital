/** Initializes optional motion libraries only when they are available. */
(() => {
  'use strict';

  window.addEventListener('load', () => {
    if (window.AOS) {
      window.AOS.init({ duration: 650, once: true, offset: 40 });
    }
  });
})();
