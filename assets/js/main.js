/** Global application bootstrap. */
(() => {
  'use strict';

  const yearNode = document.querySelector('[data-current-year]');
  if (yearNode) yearNode.textContent = new Date().getFullYear();
})();
