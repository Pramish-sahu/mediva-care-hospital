/**
 * Mediva Care Hospital — Production Motion Controller
 * AOS, counters, parallax, smooth scrolling, micro-interactions, loader,
 * back-to-top feedback, active sticky navigation, and reduced-motion support.
 */
(() => {
  'use strict';

  const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
  const html = document.documentElement;
  const body = document.body;
  let prefersReducedMotion = reducedMotionQuery.matches;
  let ticking = false;
  let interfaceTicking = false;

  const clamp = (value, minimum, maximum) => Math.min(Math.max(value, minimum), maximum);

  const createMotionInterface = () => {
    const progress = document.createElement('div');
    progress.className = 'scroll-progress';
    progress.setAttribute('aria-hidden', 'true');
    progress.innerHTML = '<span class="scroll-progress__bar"></span>';

    const backToTop = document.createElement('button');
    backToTop.className = 'back-to-top';
    backToTop.type = 'button';
    backToTop.setAttribute('aria-label', 'Back to top');
    backToTop.setAttribute('data-back-to-top', '');
    backToTop.innerHTML = '<i class="fa-solid fa-arrow-up" aria-hidden="true"></i>';

    body.prepend(progress);
    body.append(backToTop);

    return { progress, backToTop };
  };

  const createPageLoader = (force = false) => {
    if (prefersReducedMotion || document.querySelector('[data-page-loader]')) return null;

    if (!force) {
      try {
        if (window.sessionStorage.getItem('mediva-loader-shown') === 'true') return null;
        window.sessionStorage.setItem('mediva-loader-shown', 'true');
      } catch (error) {
        // Storage can be unavailable in privacy modes; the loader still remains safe.
      }
    }

    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.setAttribute('data-page-loader', '');
    loader.setAttribute('role', 'status');
    loader.setAttribute('aria-live', 'polite');
    loader.innerHTML = `
      <div class="page-loader__content">
        <span class="page-loader__mark"><i class="fa-solid fa-heart-pulse" aria-hidden="true"></i></span>
        <span class="page-loader__label">Preparing your experience</span>
      </div>
    `;
    body.append(loader);
    return loader;
  };

  const finishPageLoader = (loader) => {
    if (!loader) return;
    window.setTimeout(() => {
      loader.classList.add('is-complete');
      loader.addEventListener('animationend', () => loader.remove(), { once: true });
      window.setTimeout(() => loader.remove(), 700);
    }, 260);
  };

  const autoAssignAos = () => {
    const selectors = [
      '.section-heading:not([data-aos])',
      '.page-section__header:not([data-aos])',
      '.component-section__header:not([data-aos])',
      '.service-section__header:not([data-aos])',
    ];

    document.querySelectorAll(selectors.join(',')).forEach((element) => {
      element.dataset.aos = 'fade-up';
    });

    const groupedSelectors = [
      '.department-card',
      '.doctor-card',
      '.package-card',
      '.pricing-card',
      '.testimonial-card',
      '.feature-card',
      '.facility-card',
      '.treatment-card',
      '.value-card',
      '.gallery-card',
      '.motion-demo-card',
    ];

    document.querySelectorAll(groupedSelectors.join(',')).forEach((element, index) => {
      if (!element.dataset.aos) element.dataset.aos = 'fade-up';
      if (!element.dataset.aosDelay) element.dataset.aosDelay = String((index % 4) * 65);
    });
  };

  const initAos = () => {
    autoAssignAos();

    if (prefersReducedMotion) {
      document.querySelectorAll('[data-aos]').forEach((element) => element.classList.add('aos-animate'));
      return;
    }

    if (window.AOS) {
      window.AOS.init({
        duration: 720,
        easing: 'ease-out-cubic',
        offset: 54,
        once: true,
        mirror: false,
        anchorPlacement: 'top-bottom',
        disableMutationObserver: false,
      });
      window.setTimeout(() => window.AOS.refreshHard(), 120);
      return;
    }

    document.querySelectorAll('[data-aos]').forEach((element) => element.classList.add('aos-animate'));
  };

  const formatCounter = (value, decimals, locale) =>
    new Intl.NumberFormat(locale, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(value);

  const animateCounter = (element) => {
    if (element.dataset.counterAnimated === 'true') return;
    element.dataset.counterAnimated = 'true';

    const target = Number.parseFloat(element.dataset.counter || '0');
    if (!Number.isFinite(target)) return;

    const decimals = Number.parseInt(element.dataset.counterDecimals || '0', 10);
    const duration = Number.parseInt(element.dataset.counterDuration || '1500', 10);
    const prefix = element.dataset.counterPrefix || '';
    const suffix = element.dataset.counterSuffix || '';
    const locale = element.dataset.counterLocale || 'en-IN';

    if (prefersReducedMotion) {
      element.textContent = `${prefix}${formatCounter(target, decimals, locale)}${suffix}`;
      return;
    }

    const startedAt = performance.now();
    const startValue = Number.parseFloat(element.dataset.counterStart || '0');

    const update = (timestamp) => {
      const progress = clamp((timestamp - startedAt) / duration, 0, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = startValue + (target - startValue) * eased;
      element.textContent = `${prefix}${formatCounter(current, decimals, locale)}${suffix}`;

      if (progress < 1) window.requestAnimationFrame(update);
    };

    window.requestAnimationFrame(update);
  };

  const initCounters = () => {
    const counters = [...document.querySelectorAll('[data-counter]')];
    if (!counters.length) return;

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      counters.forEach(animateCounter);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.35, rootMargin: '0px 0px -8% 0px' }
    );

    counters.forEach((counter) => observer.observe(counter));
  };

  const getHeaderOffset = () => {
    const header = document.querySelector('[data-header]');
    return (header?.getBoundingClientRect().height || 0) + 16;
  };

  const scrollToElement = (element, updateHistory = false) => {
    if (!(element instanceof HTMLElement)) return;
    const top = element.getBoundingClientRect().top + window.scrollY - getHeaderOffset();
    window.scrollTo({ top: Math.max(0, top), behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    if (updateHistory && element.id) history.pushState(null, '', `#${element.id}`);
  };

  const initSmoothScroll = () => {
    document.addEventListener('click', (event) => {
      const link = event.target.closest('a[href^="#"]');
      if (!link) return;
      const targetId = decodeURIComponent(link.getAttribute('href').slice(1));
      if (!targetId) return;
      const target = document.getElementById(targetId);
      if (!target) return;
      event.preventDefault();
      scrollToElement(target, true);
    });
  };

  const initRevealObserver = () => {
    const elements = [...document.querySelectorAll('[data-reveal]')];
    if (!elements.length) return;

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-in-view'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-in-view');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.18, rootMargin: '0px 0px -8% 0px' }
    );

    elements.forEach((element) => observer.observe(element));
  };

  const initParallax = () => {
    const elements = [...document.querySelectorAll('[data-parallax]')];
    if (!elements.length || prefersReducedMotion) return;

    const update = () => {
      const viewportHeight = window.innerHeight || 1;
      elements.forEach((element) => {
        const bounds = element.getBoundingClientRect();
        if (bounds.bottom < -100 || bounds.top > viewportHeight + 100) return;
        const speed = clamp(Number.parseFloat(element.dataset.parallaxSpeed || '0.12'), -0.35, 0.35);
        const centerDistance = bounds.top + bounds.height / 2 - viewportHeight / 2;
        const movement = clamp(centerDistance * speed * -1, -72, 72);
        element.style.setProperty('--parallax-y', `${movement.toFixed(2)}px`);
      });
    };

    const requestUpdate = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        update();
        ticking = false;
      });
    };

    update();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate, { passive: true });
  };

  const initTilt = () => {
    if (!finePointerQuery.matches || prefersReducedMotion) return;

    document.querySelectorAll('[data-tilt]').forEach((element) => {
      const limit = clamp(Number.parseFloat(element.dataset.tilt || '6'), 2, 10);

      element.addEventListener('pointermove', (event) => {
        const bounds = element.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - 0.5;
        const y = (event.clientY - bounds.top) / bounds.height - 0.5;
        element.style.setProperty('--tilt-x', `${(-y * limit).toFixed(2)}deg`);
        element.style.setProperty('--tilt-y', `${(x * limit).toFixed(2)}deg`);
      });

      element.addEventListener('pointerleave', () => {
        element.style.setProperty('--tilt-x', '0deg');
        element.style.setProperty('--tilt-y', '0deg');
      });
    });
  };

  const initMagneticElements = () => {
    if (!finePointerQuery.matches || prefersReducedMotion) return;

    document.querySelectorAll('[data-magnetic]').forEach((element) => {
      element.addEventListener('pointermove', (event) => {
        const bounds = element.getBoundingClientRect();
        const strength = clamp(Number.parseFloat(element.dataset.magnetic || '0.16'), 0.05, 0.25);
        const x = (event.clientX - (bounds.left + bounds.width / 2)) * strength;
        const y = (event.clientY - (bounds.top + bounds.height / 2)) * strength;
        element.style.setProperty('--magnetic-x', `${x.toFixed(2)}px`);
        element.style.setProperty('--magnetic-y', `${y.toFixed(2)}px`);
      });

      element.addEventListener('pointerleave', () => {
        element.style.setProperty('--magnetic-x', '0px');
        element.style.setProperty('--magnetic-y', '0px');
      });
    });
  };

  const initRipple = () => {
    document.addEventListener('pointerdown', (event) => {
      if (prefersReducedMotion) return;
      const trigger = event.target.closest('.button--ripple, [data-ripple]');
      if (!trigger) return;

      const bounds = trigger.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'motion-ripple';
      ripple.style.left = `${event.clientX - bounds.left}px`;
      ripple.style.top = `${event.clientY - bounds.top}px`;
      trigger.append(ripple);
      ripple.addEventListener('animationend', () => ripple.remove(), { once: true });
    });
  };

  const initStickyObservers = () => {
    const stickyElements = [...document.querySelectorAll('[data-sticky]')];
    if (!stickyElements.length || !('IntersectionObserver' in window)) return;

    stickyElements.forEach((element) => {
      const sentinel = document.createElement('span');
      sentinel.setAttribute('aria-hidden', 'true');
      sentinel.className = 'sticky-sentinel';
      element.before(sentinel);

      const observer = new IntersectionObserver(
        ([entry]) => element.classList.toggle('is-stuck', !entry.isIntersecting),
        { rootMargin: `-${Math.round(getHeaderOffset())}px 0px 0px 0px`, threshold: 0 }
      );
      observer.observe(sentinel);
    });
  };

  const initSectionNavigation = () => {
    const nav = document.querySelector('[data-motion-nav]');
    if (!nav || !('IntersectionObserver' in window)) return;

    const links = [...nav.querySelectorAll('a[href^="#"]')];
    const sections = links
      .map((link) => document.getElementById(link.getAttribute('href').slice(1)))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        links.forEach((link) => {
          link.classList.toggle('is-active', link.getAttribute('href') === `#${visible.target.id}`);
        });
      },
      { rootMargin: '-30% 0px -58% 0px', threshold: [0.05, 0.25, 0.5] }
    );

    sections.forEach((section) => observer.observe(section));
  };

  const initLoaderDemo = () => {
    document.querySelectorAll('[data-loader-demo]').forEach((button) => {
      button.addEventListener('click', () => {
        const loader = createPageLoader(true);
        if (!loader) return;
        window.setTimeout(() => finishPageLoader(loader), 900);
      });
    });
  };

  const initialize = () => {
    html.classList.add('motion-ready');
    const interfaceElements = createMotionInterface();
    const loader = window.MEDIVA_CONFIG?.performance?.enableInitialLoader
      ? createPageLoader()
      : null;

    initAos();
    initCounters();
    initSmoothScroll();
    initRevealObserver();
    initParallax();
    initTilt();
    initMagneticElements();
    initRipple();
    initStickyObservers();
    initSectionNavigation();
    initLoaderDemo();

    const updateScrollInterface = () => {
      const scrollTop = window.scrollY;
      const scrollable = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      const progress = clamp(scrollTop / scrollable, 0, 1);
      interfaceElements.progress.style.setProperty('--scroll-progress', progress.toFixed(4));
      interfaceElements.backToTop.classList.toggle('is-visible', scrollTop > 520);
      body.classList.toggle('is-scrolled', scrollTop > 10);
    };

    interfaceElements.backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    });

    const requestInterfaceUpdate = () => {
      if (interfaceTicking) return;
      interfaceTicking = true;
      window.requestAnimationFrame(() => {
        updateScrollInterface();
        interfaceTicking = false;
      });
    };

    window.addEventListener('scroll', requestInterfaceUpdate, { passive: true });
    window.addEventListener('resize', requestInterfaceUpdate, { passive: true });
    updateScrollInterface();

    if (document.readyState === 'complete') finishPageLoader(loader);
    else window.addEventListener('load', () => finishPageLoader(loader), { once: true });

    reducedMotionQuery.addEventListener?.('change', (event) => {
      prefersReducedMotion = event.matches;
      if (prefersReducedMotion) {
        document.querySelectorAll('[data-parallax]').forEach((element) => {
          element.style.removeProperty('--parallax-y');
        });
      }
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize, { once: true });
  } else {
    initialize();
  }
})();
