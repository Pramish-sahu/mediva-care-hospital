/**
 * Mediva Care Hospital — Service Page Controller
 * Handles specialty FAQs, in-page navigation, and appointment date limits.
 */
(() => {
  'use strict';

  const faqItems = [...document.querySelectorAll('[data-service-faq-item]')];

  faqItems.forEach((item) => {
    const button = item.querySelector('[data-service-faq-button]');
    const panel = item.querySelector('[data-service-faq-panel]');

    if (!button || !panel) return;

    button.addEventListener('click', () => {
      const willOpen = button.getAttribute('aria-expanded') !== 'true';

      faqItems.forEach((otherItem) => {
        const otherButton = otherItem.querySelector('[data-service-faq-button]');
        if (!otherButton) return;
        otherItem.classList.remove('is-open');
        otherButton.setAttribute('aria-expanded', 'false');
        const otherPanel = otherItem.querySelector('[data-service-faq-panel]');
        if (otherPanel) otherPanel.setAttribute('aria-hidden', 'true');
      });

      item.classList.toggle('is-open', willOpen);
      button.setAttribute('aria-expanded', String(willOpen));
      panel.setAttribute('aria-hidden', String(!willOpen));
    });
  });

  const sectionLinks = [...document.querySelectorAll('[data-service-section-link]')];
  const observedSections = sectionLinks
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  const setActiveLink = (sectionId) => {
    sectionLinks.forEach((link) => {
      const isActive = link.getAttribute('href') === `#${sectionId}`;
      link.classList.toggle('is-active', isActive);
      if (isActive) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  };

  if ('IntersectionObserver' in window && observedSections.length) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry?.target?.id) setActiveLink(visibleEntry.target.id);
      },
      {
        rootMargin: '-28% 0px -60% 0px',
        threshold: [0.05, 0.2, 0.5]
      }
    );

    observedSections.forEach((section) => sectionObserver.observe(section));
  }

  sectionLinks.forEach((link) => {
    link.addEventListener('click', () => {
      const sectionId = link.getAttribute('href')?.slice(1);
      if (sectionId) setActiveLink(sectionId);
    });
  });

  const today = new Date();
  const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
    .toISOString()
    .split('T')[0];

  document.querySelectorAll('[data-future-date]').forEach((input) => {
    input.min = localToday;
  });
})();
