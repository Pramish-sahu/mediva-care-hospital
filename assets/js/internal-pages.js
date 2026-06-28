/**
 * Mediva Care Hospital — Internal Page Interactions
 * Searchable/filterable content collections, gallery lightbox, legal navigation,
 * newsletter feedback, and small progressive enhancements.
 */
(() => {
  'use strict';

  const normalize = (value = '') => value.toLowerCase().trim();

  const initializeFilters = () => {
    document.querySelectorAll('[data-filter-group]').forEach((group) => {
      const controls = [...group.querySelectorAll('[data-filter-button]')];
      const searchInput = group.querySelector('[data-filter-search]');
      const items = [...document.querySelectorAll(`[data-filter-target="${group.dataset.filterGroup}"]` )];
      const emptyState = document.querySelector(`[data-filter-empty="${group.dataset.filterGroup}"]`);
      let activeFilter = 'all';

      const applyFilters = () => {
        const query = normalize(searchInput?.value);
        let visibleCount = 0;

        items.forEach((item) => {
          const categories = normalize(item.dataset.filterCategory).split(/\s+/);
          const searchable = normalize(item.dataset.filterText || item.textContent);
          const matchesCategory = activeFilter === 'all' || categories.includes(activeFilter);
          const matchesSearch = !query || searchable.includes(query);
          const isVisible = matchesCategory && matchesSearch;

          item.hidden = !isVisible;
          if (isVisible) visibleCount += 1;
        });

        if (emptyState) {
          emptyState.classList.toggle('is-visible', visibleCount === 0);
        }
      };

      controls.forEach((control) => {
        control.addEventListener('click', () => {
          activeFilter = normalize(control.dataset.filterButton) || 'all';
          controls.forEach((button) => {
            const isActive = button === control;
            button.classList.toggle('is-active', isActive);
            button.setAttribute('aria-pressed', String(isActive));
          });
          applyFilters();
        });
      });

      searchInput?.addEventListener('input', applyFilters);
      applyFilters();
    });
  };

  const initializeGallery = () => {
    const dialog = document.querySelector('[data-gallery-lightbox]');
    if (!dialog) return;

    const image = dialog.querySelector('[data-lightbox-image]');
    const title = dialog.querySelector('[data-lightbox-title]');
    const description = dialog.querySelector('[data-lightbox-description]');
    const closeButton = dialog.querySelector('[data-lightbox-close]');
    let trigger = null;

    const close = () => {
      dialog.close();
      trigger?.focus();
    };

    document.querySelectorAll('[data-gallery-open]').forEach((button) => {
      button.addEventListener('click', () => {
        trigger = button;
        if (image) {
          image.src = button.dataset.gallerySrc || '';
          image.alt = button.dataset.galleryAlt || '';
        }
        if (title) title.textContent = button.dataset.galleryTitle || 'Hospital gallery';
        if (description) description.textContent = button.dataset.galleryDescription || '';
        dialog.showModal();
        closeButton?.focus();
      });
    });

    closeButton?.addEventListener('click', close);
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) close();
    });
  };

  const initializeNewsletter = () => {
    document.querySelectorAll('[data-newsletter-form]').forEach((form) => {
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        const input = form.querySelector('input[type="email"]');
        const status = form.parentElement?.querySelector('[data-newsletter-status]');

        if (!input?.reportValidity()) return;
        if (status) {
          status.textContent = 'Thank you. Your email has been added to the demo subscriber list.';
        }
        form.reset();
      });
    });
  };

  const initializeSmoothSectionLinks = () => {
    document.querySelectorAll('[data-section-link]').forEach((link) => {
      link.addEventListener('click', () => {
        document.querySelectorAll('[data-section-link]').forEach((item) => {
          item.removeAttribute('aria-current');
        });
        link.setAttribute('aria-current', 'location');
      });
    });
  };

  initializeFilters();
  initializeGallery();
  initializeNewsletter();
  initializeSmoothSectionLinks();
})();
