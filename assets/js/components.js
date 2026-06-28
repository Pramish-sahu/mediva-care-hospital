/**
 * Mediva Care Hospital — Reusable Component Controller
 * Accessible behavior for accordions, tabs, dialogs, alerts, gallery,
 * pagination, loading buttons, newsletter forms, and toast feedback.
 */
(() => {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const toastRegion = document.querySelector('[data-toast-region]');

  const showToast = ({ title = 'Update', message = '', icon = 'fa-circle-check' } = {}) => {
    if (!toastRegion) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.setAttribute('role', 'status');
    toast.innerHTML = `
      <i class="toast__icon fa-solid ${icon}" aria-hidden="true"></i>
      <div class="toast__content">
        <strong class="toast__title"></strong>
        <p class="toast__message"></p>
      </div>
    `;
    toast.querySelector('.toast__title').textContent = title;
    toast.querySelector('.toast__message').textContent = message;
    toastRegion.append(toast);

    window.setTimeout(() => {
      toast.classList.add('is-leaving');
      window.setTimeout(() => toast.remove(), reduceMotion ? 0 : 250);
    }, 4200);
  };

  const closeAccordionItem = (trigger) => {
    const panel = document.getElementById(trigger.getAttribute('aria-controls'));
    trigger.setAttribute('aria-expanded', 'false');
    panel?.setAttribute('aria-hidden', 'true');
  };

  const openAccordionItem = (trigger) => {
    const panel = document.getElementById(trigger.getAttribute('aria-controls'));
    trigger.setAttribute('aria-expanded', 'true');
    panel?.setAttribute('aria-hidden', 'false');
  };

  document.querySelectorAll('[data-component-accordion]').forEach((accordion) => {
    const single = accordion.dataset.single !== 'false';
    const triggers = [...accordion.querySelectorAll('.accordion-trigger')];

    triggers.forEach((trigger) => {
      trigger.addEventListener('click', () => {
        const expanded = trigger.getAttribute('aria-expanded') === 'true';
        if (single) triggers.filter((item) => item !== trigger).forEach(closeAccordionItem);
        if (expanded) closeAccordionItem(trigger);
        else openAccordionItem(trigger);
      });
    });
  });

  document.querySelectorAll('[data-tabs]').forEach((tabs) => {
    const tabList = tabs.querySelector('[role="tablist"]');
    const tabButtons = [...tabs.querySelectorAll('[role="tab"]')];
    const panels = [...tabs.querySelectorAll('[role="tabpanel"]')];

    const selectTab = (tab, focus = true) => {
      tabButtons.forEach((button) => {
        const selected = button === tab;
        button.setAttribute('aria-selected', String(selected));
        button.tabIndex = selected ? 0 : -1;
      });

      panels.forEach((panel) => {
        panel.hidden = panel.id !== tab.getAttribute('aria-controls');
      });

      if (focus) tab.focus();
    };

    tabButtons.forEach((tab, index) => {
      tab.addEventListener('click', () => selectTab(tab, false));
      tab.addEventListener('keydown', (event) => {
        let targetIndex = index;
        if (event.key === 'ArrowRight') targetIndex = (index + 1) % tabButtons.length;
        else if (event.key === 'ArrowLeft') targetIndex = (index - 1 + tabButtons.length) % tabButtons.length;
        else if (event.key === 'Home') targetIndex = 0;
        else if (event.key === 'End') targetIndex = tabButtons.length - 1;
        else return;
        event.preventDefault();
        selectTab(tabButtons[targetIndex]);
      });
    });

    tabList?.setAttribute('aria-orientation', 'horizontal');
  });

  let modalOpener = null;

  document.querySelectorAll('[data-modal-open]').forEach((button) => {
    button.addEventListener('click', () => {
      const dialog = document.getElementById(button.dataset.modalOpen);
      if (!(dialog instanceof HTMLDialogElement)) return;
      modalOpener = button;
      dialog.showModal();
    });
  });

  document.querySelectorAll('dialog.modal').forEach((dialog) => {
    dialog.querySelectorAll('[data-modal-close]').forEach((button) => {
      button.addEventListener('click', () => dialog.close());
    });

    dialog.addEventListener('click', (event) => {
      const rectangle = dialog.getBoundingClientRect();
      const outside =
        event.clientX < rectangle.left ||
        event.clientX > rectangle.right ||
        event.clientY < rectangle.top ||
        event.clientY > rectangle.bottom;
      if (outside) dialog.close();
    });

    dialog.addEventListener('close', () => {
      if (modalOpener instanceof HTMLElement) modalOpener.focus();
    });
  });

  document.querySelectorAll('[data-alert-dismiss]').forEach((button) => {
    button.addEventListener('click', () => {
      const alert = button.closest('.alert');
      if (!alert) return;
      alert.classList.add('is-dismissing');
      window.setTimeout(() => alert.remove(), reduceMotion ? 0 : 250);
    });
  });

  const galleryDialog = document.querySelector('[data-gallery-dialog]');
  const galleryImage = galleryDialog?.querySelector('[data-gallery-dialog-image]');
  const galleryCaption = galleryDialog?.querySelector('[data-gallery-dialog-caption]');

  document.querySelectorAll('[data-gallery-open]').forEach((button) => {
    button.addEventListener('click', () => {
      if (!(galleryDialog instanceof HTMLDialogElement) || !(galleryImage instanceof HTMLImageElement)) return;
      const sourceImage = button.querySelector('img');
      if (!sourceImage) return;
      modalOpener = button;
      galleryImage.src = sourceImage.src;
      galleryImage.alt = sourceImage.alt;
      if (galleryCaption) galleryCaption.textContent = button.dataset.galleryCaption || sourceImage.alt;
      galleryDialog.showModal();
    });
  });

  document.querySelectorAll('[data-pagination]').forEach((pagination) => {
    const liveRegion = document.querySelector('[data-pagination-status]');
    const links = [...pagination.querySelectorAll('[data-page]')];

    links.forEach((link) => {
      link.addEventListener('click', () => {
        links.forEach((item) => item.removeAttribute('aria-current'));
        link.setAttribute('aria-current', 'page');
        if (liveRegion) liveRegion.textContent = `Showing demonstration page ${link.dataset.page}.`;
      });
    });
  });

  document.querySelectorAll('[data-loading-demo]').forEach((button) => {
    button.addEventListener('click', () => {
      if (button.classList.contains('is-loading')) return;
      const originalText = button.querySelector('[data-button-label]')?.textContent || 'Submit';
      const label = button.querySelector('[data-button-label]');
      button.classList.add('is-loading');
      button.disabled = true;
      if (label) label.textContent = 'Processing…';

      window.setTimeout(() => {
        button.classList.remove('is-loading');
        button.disabled = false;
        if (label) label.textContent = originalText;
        showToast({ title: 'Request processed', message: 'The loading-button demonstration completed successfully.' });
      }, 1400);
    });
  });

  document.querySelectorAll('[data-demo-form]').forEach((form) => {
    form.addEventListener('submit', (event) => event.preventDefault());
  });

  document.querySelectorAll('[data-newsletter-demo]').forEach((form) => {
    const input = form.querySelector('input[type="email"]');
    const status = form.querySelector('[data-newsletter-status]');

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!(input instanceof HTMLInputElement) || !input.checkValidity()) {
        input?.focus();
        if (status) status.textContent = 'Enter a valid email address.';
        return;
      }

      if (status) status.textContent = 'Thank you. Your subscription preference has been recorded.';
      showToast({
        title: 'Subscription confirmed',
        message: 'This demo stores no personal data and sends no network request.',
        icon: 'fa-envelope-circle-check',
      });
      form.reset();
    });
  });

  document.querySelectorAll('[data-toast-demo]').forEach((button) => {
    button.addEventListener('click', () => {
      showToast({
        title: 'Appointment saved',
        message: 'A patient support coordinator will contact you during working hours.',
      });
    });
  });
})();
