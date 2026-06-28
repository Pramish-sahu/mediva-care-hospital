/**
 * Mediva Care Hospital — Form Controller
 * Sends forms through EmailJS when configured. Without credentials, it opens
 * a prefilled email draft so the static demo remains functional and honest.
 */
(() => {
  'use strict';

  const config = window.MEDIVA_CONFIG || {};
  const emailConfig = config.emailjs || {};

  if (window.emailjs && emailConfig.publicKey) {
    window.emailjs.init({ publicKey: emailConfig.publicKey });
  }

  const setFormState = (form, state, message) => {
    const status = form.querySelector('[data-form-status]');
    const submitButton = form.querySelector('button[type="submit"]');

    if (status) {
      status.classList.remove('is-success', 'is-error');
      if (state === 'success') status.classList.add('is-success');
      if (state === 'error') status.classList.add('is-error');
      status.textContent = message;
    }

    if (submitButton) {
      submitButton.disabled = state === 'loading';
      submitButton.setAttribute('aria-busy', String(state === 'loading'));
    }
  };

  const getTemplateId = (formType) => {
    if (formType === 'appointment') return emailConfig.appointmentTemplateId;
    return emailConfig.contactTemplateId;
  };

  const buildMailto = (form, formType) => {
    const data = new FormData(form);
    const hospitalEmail = config.hospitalEmail || 'care@medivahospital.com';
    const subject = formType === 'appointment' ? 'Appointment request from website' : 'Website enquiry';
    const lines = [];

    data.forEach((value, key) => {
      if (key === 'consent') return;
      const label = key.replaceAll('_', ' ').replace(/\b\w/g, (character) => character.toUpperCase());
      lines.push(`${label}: ${value || 'Not provided'}`);
    });

    return `mailto:${hospitalEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
  };

  const submitWithEmailJS = async (form, templateId) => {
    await window.emailjs.sendForm(emailConfig.serviceId, templateId, form);
  };

  document.querySelectorAll('[data-emailjs-form]').forEach((form) => {
    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      if (!form.reportValidity()) {
        setFormState(form, 'error', 'Please complete the required fields before submitting.');
        return;
      }

      const formType = form.dataset.emailjsForm || 'contact';
      const templateId = getTemplateId(formType);
      const emailJsReady = Boolean(
        window.emailjs &&
        emailConfig.publicKey &&
        emailConfig.serviceId &&
        templateId
      );

      if (!emailJsReady) {
        setFormState(form, 'success', 'Your email app is opening with the request details. Review and send the message to complete your request.');
        window.location.href = buildMailto(form, formType);
        return;
      }

      try {
        setFormState(form, 'loading', 'Sending your request securely…');
        await submitWithEmailJS(form, templateId);
        form.reset();
        setFormState(form, 'success', 'Thank you. Your request has been sent and our care team will contact you shortly.');
      } catch (error) {
        console.error('EmailJS submission failed:', error);
        setFormState(form, 'error', 'We could not send the request. Please call +91 11 4567 8900 or try again.');
      }
    });
  });
})();
