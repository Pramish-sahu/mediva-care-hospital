/**
 * Mediva Care Hospital — Homepage Controller
 * Initializes homepage sliders, FAQ behavior, appointment date constraints,
 * and the newsletter mail fallback. Shared motion is handled by animations.js.
 */
(() => {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const initSwipers = () => {
    if (!window.Swiper) return;

    const doctorsElement = document.querySelector('[data-doctors-swiper]');
    if (doctorsElement) {
      new window.Swiper(doctorsElement, {
        slidesPerView: 1,
        spaceBetween: 20,
        speed: prefersReducedMotion ? 0 : 650,
        grabCursor: true,
        watchOverflow: true,
        navigation: {
          nextEl: '.doctors-next',
          prevEl: '.doctors-prev',
        },
        pagination: {
          el: '.doctors-pagination',
          clickable: true,
        },
        breakpoints: {
          576: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1200: { slidesPerView: 3.25 },
        },
      });
    }

    const testimonialsElement = document.querySelector('[data-testimonials-swiper]');
    if (testimonialsElement) {
      new window.Swiper(testimonialsElement, {
        slidesPerView: 1,
        spaceBetween: 24,
        speed: prefersReducedMotion ? 0 : 700,
        autoHeight: true,
        grabCursor: true,
        watchOverflow: true,
        autoplay: prefersReducedMotion
          ? false
          : {
              delay: 6500,
              disableOnInteraction: true,
              pauseOnMouseEnter: true,
            },
        navigation: {
          nextEl: '.testimonials-next',
          prevEl: '.testimonials-prev',
        },
        pagination: {
          el: '.testimonials-pagination',
          clickable: true,
        },
      });
    }
  };


  const initAccordion = () => {
    document.querySelectorAll('[data-accordion]').forEach((accordion) => {
      const items = [...accordion.querySelectorAll('.accordion__item')];

      items.forEach((item) => {
        const button = item.querySelector('.accordion__button');
        if (!button) return;

        button.addEventListener('click', () => {
          const willOpen = !item.classList.contains('is-open');

          items.forEach((otherItem) => {
            otherItem.classList.remove('is-open');
            otherItem.querySelector('.accordion__button')?.setAttribute('aria-expanded', 'false');
          });

          if (willOpen) {
            item.classList.add('is-open');
            button.setAttribute('aria-expanded', 'true');
          }
        });
      });
    });
  };


  const initDateInputs = () => {
    const today = new Date();
    const timezoneOffset = today.getTimezoneOffset() * 60_000;
    const localDate = new Date(today.getTime() - timezoneOffset).toISOString().split('T')[0];

    document.querySelectorAll('[data-min-date]').forEach((input) => {
      input.min = localDate;
      if (!input.value) input.value = localDate;
    });
  };

  const initNewsletter = () => {
    const form = document.querySelector('[data-newsletter-form]');
    if (!form) return;

    const status = form.querySelector('[data-newsletter-status]');
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;

      const email = new FormData(form).get('email');
      const hospitalEmail = window.MEDIVA_CONFIG?.hospitalEmail || 'care@medivahospital.com';
      const subject = encodeURIComponent('Newsletter subscription request');
      const body = encodeURIComponent(`Please add ${email} to the Mediva Care Hospital health newsletter.`);

      if (status) status.textContent = 'Opening your email app to confirm the subscription…';
      window.location.href = `mailto:${hospitalEmail}?subject=${subject}&body=${body}`;
    });
  };

  const initialize = () => {
    initSwipers();
    initAccordion();
    initDateInputs();
    initNewsletter();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize, { once: true });
  } else {
    initialize();
  }
})();
