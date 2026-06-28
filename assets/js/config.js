/** Shared project configuration. Replace demo values before a real deployment. */
window.MEDIVA_CONFIG = Object.freeze({
  hospitalEmail: 'care@medivahospital.com',
  hospitalPhone: '+91 11 4567 8900',
  performance: Object.freeze({
    enableInitialLoader: false,
  }),
  emailjs: Object.freeze({
    publicKey: '',
    serviceId: '',
    appointmentTemplateId: '',
    contactTemplateId: '',
  }),
});
