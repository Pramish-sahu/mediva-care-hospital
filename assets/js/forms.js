/** Shared form module. Appointment and contact handlers are added with their forms. */
(() => {
  'use strict';

  const config = window.MEDIVA_CONFIG?.emailjs;
  if (window.emailjs && config?.publicKey) {
    window.emailjs.init({ publicKey: config.publicKey });
  }
})();
