/**
 * Mediva Care Hospital — Navigation Controller
 * Handles sticky state, mobile navigation, dropdowns, active links,
 * accessible site search, keyboard shortcuts, and theme persistence.
 */
(() => {
  'use strict';

  const SELECTORS = {
    header: '[data-header]',
    menu: '[data-primary-nav]',
    menuToggle: '[data-menu-toggle]',
    menuClose: '[data-menu-close]',
    menuBackdrop: '[data-menu-backdrop]',
    dropdownToggle: '[data-dropdown-toggle]',
    searchDialog: '[data-search-dialog]',
    searchOpen: '[data-search-open]',
    searchClose: '[data-search-close]',
    searchForm: '[data-site-search-form]',
    searchInput: '[data-site-search-input]',
    searchResults: '[data-site-search-results]',
    themeToggle: '[data-theme-toggle]',
  };

  const desktopQuery = window.matchMedia('(min-width: 70rem)');
  const html = document.documentElement;
  const body = document.body;
  const header = document.querySelector(SELECTORS.header);
  const menu = document.querySelector(SELECTORS.menu);
  const menuToggle = document.querySelector(SELECTORS.menuToggle);
  const menuBackdrop = document.querySelector(SELECTORS.menuBackdrop);
  const searchDialog = document.querySelector(SELECTORS.searchDialog);
  const searchInput = document.querySelector(SELECTORS.searchInput);
  const searchResults = document.querySelector(SELECTORS.searchResults);
  const themeToggle = document.querySelector(SELECTORS.themeToggle);

  const navigationScript = [...document.scripts].find((script) =>
    script.src.endsWith('/assets/js/navigation.js')
  );
  const siteRoot = navigationScript ? new URL('../../', navigationScript.src) : new URL('./', window.location.href);

  const searchIndex = [
    {
      title: 'Home',
      path: 'index.html',
      icon: 'fa-house-medical',
      description: 'Hospital overview, services, doctors, and patient care.',
      keywords: 'home hospital healthcare medical care',
    },
    {
      title: 'About Mediva',
      path: 'pages/about.html',
      icon: 'fa-hospital',
      description: 'Our values, clinical standards, leadership, and patient-first mission.',
      keywords: 'about mission values hospital leadership',
    },
    {
      title: 'Medical Departments',
      path: 'pages/departments.html',
      icon: 'fa-stethoscope',
      description: 'Explore specialist departments and coordinated clinical services.',
      keywords: 'departments specialist services treatment clinic',
    },
    {
      title: 'Cardiology',
      path: 'pages/services/cardiology.html',
      icon: 'fa-heart-pulse',
      description: 'Heart consultations, diagnostics, prevention, and treatment planning.',
      keywords: 'cardiology heart cardiac chest pain ecg',
    },
    {
      title: 'Neurology',
      path: 'pages/services/neurology.html',
      icon: 'fa-brain',
      description: 'Specialist care for the brain, spine, nerves, and neurological conditions.',
      keywords: 'neurology brain spine nerve headache stroke',
    },
    {
      title: 'Orthopedics',
      path: 'pages/services/orthopedics.html',
      icon: 'fa-bone',
      description: 'Bone, joint, mobility, sports injury, and rehabilitation services.',
      keywords: 'orthopedics bone joint knee shoulder injury',
    },
    {
      title: 'Pediatrics',
      path: 'pages/services/pediatrics.html',
      icon: 'fa-child-reaching',
      description: 'Compassionate medical care for infants, children, and adolescents.',
      keywords: 'pediatrics child children baby vaccination',
    },
    {
      title: 'Dental Care',
      path: 'pages/services/dental.html',
      icon: 'fa-tooth',
      description: 'Preventive, restorative, and cosmetic dental services.',
      keywords: 'dental dentist tooth teeth oral',
    },
    {
      title: 'Emergency Care',
      path: 'pages/services/emergency.html',
      icon: 'fa-truck-medical',
      description: 'Round-the-clock emergency assessment and coordinated critical care.',
      keywords: 'emergency urgent ambulance trauma 24 hours',
    },
    {
      title: 'Our Doctors',
      path: 'pages/doctors.html',
      icon: 'fa-user-doctor',
      description: 'Meet our experienced consultants and specialist care teams.',
      keywords: 'doctors specialists consultants physicians',
    },
    {
      title: 'Health Packages',
      path: 'pages/packages.html',
      icon: 'fa-notes-medical',
      description: 'Preventive health checks designed for individuals and families.',
      keywords: 'packages checkup screening preventive health',
    },
    {
      title: 'Patient Testimonials',
      path: 'pages/testimonials.html',
      icon: 'fa-comments',
      description: 'Patient experiences and stories from Mediva Care Hospital.',
      keywords: 'testimonials reviews patients stories',
    },
    {
      title: 'Hospital Gallery',
      path: 'pages/gallery.html',
      icon: 'fa-images',
      description: 'Explore our facilities, technology, and patient care environment.',
      keywords: 'gallery photos facility rooms technology',
    },
    {
      title: 'UI Components',
      path: 'pages/components.html',
      icon: 'fa-layer-group',
      description: 'Reusable Mediva buttons, cards, forms, modals, accordions, and interface patterns.',
      keywords: 'components design system ui buttons cards forms modal accordion',
    },
    {
      title: 'Contact & Appointments',
      path: 'pages/contact.html',
      icon: 'fa-calendar-check',
      description: 'Request an appointment or contact our patient support team.',
      keywords: 'contact appointment booking phone email location',
    },
  ];

  let lastFocusedElement = null;

  const normalizePath = (value) => {
    const path = decodeURIComponent(value).replace(/\/index\.html$/i, '/').replace(/\/$/, '');
    return path || '/';
  };

  const setScrollLock = () => {
    const menuIsOpen = menu?.classList.contains('is-open');
    const searchIsOpen = Boolean(searchDialog?.open);
    body.classList.toggle('is-scroll-locked', Boolean(menuIsOpen || searchIsOpen));
  };

  const syncHeaderState = () => {
    header?.classList.toggle('site-header--scrolled', window.scrollY > 10);
  };

  const closeDropdowns = (exception = null) => {
    document.querySelectorAll('.nav-item.is-open').forEach((item) => {
      if (item === exception) return;
      item.classList.remove('is-open');
      const toggle = item.querySelector(SELECTORS.dropdownToggle);
      toggle?.setAttribute('aria-expanded', 'false');
    });
  };

  const openMenu = () => {
    if (!menu || !menuToggle || desktopQuery.matches) return;
    lastFocusedElement = document.activeElement;
    menu.classList.add('is-open');
    menuBackdrop?.classList.add('is-visible');
    menuToggle.setAttribute('aria-expanded', 'true');
    menu.setAttribute('aria-hidden', 'false');
    menu.inert = false;
    setScrollLock();
    menu.querySelector(SELECTORS.menuClose)?.focus();
  };

  const closeMenu = ({ restoreFocus = true } = {}) => {
    if (!menu || !menuToggle) return;
    menu.classList.remove('is-open');
    menuBackdrop?.classList.remove('is-visible');
    menuToggle.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-hidden', desktopQuery.matches ? 'false' : 'true');
    menu.inert = !desktopQuery.matches;
    closeDropdowns();
    setScrollLock();
    if (restoreFocus && lastFocusedElement instanceof HTMLElement) lastFocusedElement.focus();
  };

  const toggleMenu = () => {
    if (menu?.classList.contains('is-open')) closeMenu();
    else openMenu();
  };

  const handleDropdownToggle = (toggle) => {
    const item = toggle.closest('.nav-item');
    if (!item) return;
    const willOpen = !item.classList.contains('is-open');
    closeDropdowns(item);
    item.classList.toggle('is-open', willOpen);
    toggle.setAttribute('aria-expanded', String(willOpen));
  };

  const markActiveNavigation = () => {
    const currentPath = normalizePath(window.location.pathname);
    const currentSection = body.dataset.navSection;

    document.querySelectorAll('[data-nav-link]').forEach((link) => {
      const linkPath = normalizePath(new URL(link.href, window.location.href).pathname);
      if (currentPath === linkPath) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });

    if (currentSection) {
      const sectionControl = document.querySelector(`[data-nav-key="${CSS.escape(currentSection)}"]`);
      const item = sectionControl?.closest('.nav-item');
      if (item) item.classList.add('is-current');
      else if (sectionControl) sectionControl.setAttribute('aria-current', 'page');
    }
  };

  const createSearchResult = (item) => {
    const link = document.createElement('a');
    link.className = 'site-search-result';
    link.href = new URL(item.path, siteRoot).href;

    const icon = document.createElement('span');
    icon.className = 'site-search-result__icon';
    icon.setAttribute('aria-hidden', 'true');
    icon.innerHTML = `<i class="fa-solid ${item.icon}"></i>`;

    const content = document.createElement('span');
    content.className = 'site-search-result__content';

    const title = document.createElement('span');
    title.className = 'site-search-result__title';
    title.textContent = item.title;

    const description = document.createElement('span');
    description.className = 'site-search-result__description';
    description.textContent = item.description;

    content.append(title, description);
    link.append(icon, content);
    return link;
  };

  const renderSearchResults = (query = '') => {
    if (!searchResults) return;
    const normalizedQuery = query.trim().toLowerCase();
    const matches = normalizedQuery
      ? searchIndex.filter((item) =>
          `${item.title} ${item.description} ${item.keywords}`.toLowerCase().includes(normalizedQuery)
        )
      : searchIndex.filter((item) =>
          ['Medical Departments', 'Our Doctors', 'Health Packages', 'Contact & Appointments'].includes(item.title)
        );

    searchResults.replaceChildren();

    const heading = document.createElement('p');
    heading.className = 'site-search-results__heading';
    heading.textContent = normalizedQuery ? `Results for “${query.trim()}”` : 'Popular destinations';
    searchResults.append(heading);

    if (!matches.length) {
      const empty = document.createElement('div');
      empty.className = 'site-search-empty';
      empty.innerHTML = '<i class="fa-regular fa-face-frown-open" aria-hidden="true"></i><p>No matching page was found. Try a department, doctor, package, or appointment.</p>';
      searchResults.append(empty);
      return;
    }

    matches.slice(0, 7).forEach((item) => searchResults.append(createSearchResult(item)));
  };

  const openSearch = () => {
    if (!searchDialog) return;
    closeMenu({ restoreFocus: false });
    lastFocusedElement = document.activeElement;
    if (typeof searchDialog.showModal === 'function') searchDialog.showModal();
    else searchDialog.setAttribute('open', '');
    renderSearchResults(searchInput?.value || '');
    setScrollLock();
    window.requestAnimationFrame(() => searchInput?.focus());
  };

  const closeSearch = () => {
    if (!searchDialog?.open) return;
    searchDialog.close();
    setScrollLock();
    if (lastFocusedElement instanceof HTMLElement) lastFocusedElement.focus();
  };

  const getStoredTheme = () => {
    try {
      return window.localStorage.getItem('mediva-theme');
    } catch {
      return null;
    }
  };

  const storeTheme = (theme) => {
    try {
      window.localStorage.setItem('mediva-theme', theme);
    } catch {
      // Storage can be unavailable in privacy modes; the theme still works for this page.
    }
  };

  const applyTheme = (theme) => {
    html.dataset.theme = theme;
    const isDark = theme === 'dark';
    themeToggle?.setAttribute('aria-pressed', String(isDark));
    themeToggle?.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', isDark ? '#08111f' : '#0f4c81');
  };

  const initializeTheme = () => {
    const storedTheme = getStoredTheme();
    const preferredTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    applyTheme(storedTheme === 'dark' || storedTheme === 'light' ? storedTheme : preferredTheme);
  };

  const toggleTheme = () => {
    const nextTheme = html.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
    storeTheme(nextTheme);
  };

  const handleDesktopChange = (event) => {
    closeMenu({ restoreFocus: false });
    if (menu) {
      menu.setAttribute('aria-hidden', event.matches ? 'false' : 'true');
      menu.inert = !event.matches;
    }
    closeDropdowns();
  };

  initializeTheme();
  syncHeaderState();
  markActiveNavigation();
  renderSearchResults();

  if (menu) {
    menu.setAttribute('aria-hidden', desktopQuery.matches ? 'false' : 'true');
    menu.inert = !desktopQuery.matches;
  }

  window.addEventListener('scroll', syncHeaderState, { passive: true });
  desktopQuery.addEventListener('change', handleDesktopChange);

  menuToggle?.addEventListener('click', toggleMenu);
  menuBackdrop?.addEventListener('click', () => closeMenu());
  document.querySelectorAll(SELECTORS.menuClose).forEach((button) => {
    button.addEventListener('click', () => closeMenu());
  });

  document.querySelectorAll(SELECTORS.dropdownToggle).forEach((toggle) => {
    toggle.addEventListener('click', () => handleDropdownToggle(toggle));
  });

  document.querySelectorAll(`${SELECTORS.menu} a`).forEach((link) => {
    link.addEventListener('click', () => {
      if (!desktopQuery.matches) closeMenu({ restoreFocus: false });
    });
  });

  document.querySelectorAll(SELECTORS.searchOpen).forEach((button) => {
    button.addEventListener('click', openSearch);
  });
  document.querySelectorAll(SELECTORS.searchClose).forEach((button) => {
    button.addEventListener('click', closeSearch);
  });

  searchDialog?.addEventListener('click', (event) => {
    if (event.target === searchDialog) closeSearch();
  });
  searchDialog?.addEventListener('cancel', (event) => {
    event.preventDefault();
    closeSearch();
  });
  searchDialog?.addEventListener('close', setScrollLock);
  searchInput?.addEventListener('input', (event) => renderSearchResults(event.target.value));

  document.querySelector(SELECTORS.searchForm)?.addEventListener('submit', (event) => {
    event.preventDefault();
    const firstResult = searchResults?.querySelector('.site-search-result');
    if (firstResult instanceof HTMLAnchorElement) window.location.assign(firstResult.href);
  });

  themeToggle?.addEventListener('click', toggleTheme);

  document.addEventListener('click', (event) => {
    if (!(event.target instanceof Element)) return;
    if (!event.target.closest('.nav-item')) closeDropdowns();
  });

  document.addEventListener('keydown', (event) => {
    const target = event.target;
    const isTyping = target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target instanceof HTMLSelectElement || target?.isContentEditable;

    if ((event.key === '/' && !isTyping) || ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k')) {
      event.preventDefault();
      openSearch();
      return;
    }

    if (event.key === 'Escape') {
      if (searchDialog?.open) closeSearch();
      else if (menu?.classList.contains('is-open')) closeMenu();
      else closeDropdowns();
    }
  });
})();
