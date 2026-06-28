# Mediva Care Hospital

A premium, responsive healthcare website developed as a portfolio project for **Pramish Web Studio**.

## Technology

- Semantic HTML5
- Modern CSS3
- Vanilla JavaScript (ES6)
- Font Awesome
- Google Fonts
- AOS
- Swiper.js
- EmailJS

No framework, backend, Bootstrap, Tailwind, or React is used.

## Local preview

Run a local static server from the project root:

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000` in a browser.

## Project phases

1. Project setup
2. Design system
3. Navigation
4. Homepage
5. Internal pages
6. Service pages
7. Reusable components
8. Animation and interaction
9. SEO and accessibility
10. Final optimization and polish

## Deployment

The project is structured for GitHub Pages. Before using a custom production domain, update all canonical sitemap URLs and the sitemap URL in `robots.txt`.

## EmailJS

Add production EmailJS values only in `assets/js/config.js`. Never commit private service credentials.

## Asset rules

- Prefer AVIF or WebP for content images.
- Include meaningful `alt` text for informative images.
- Use lowercase, hyphen-separated filenames.
- Compress images before committing.
- Add explicit image `width` and `height` in HTML to reduce layout shift.

## Design system

Prompt 2 adds a complete reusable CSS design system:

- Brand, neutral, and feedback color tokens
- Fluid typography scale using Poppins and Inter
- Consistent spacing, radius, border, shadow, motion, and z-index tokens
- Responsive containers and a 12-column grid
- Reusable buttons, cards, badges, icons, forms, alerts, and section headings
- Utility classes and reduced-motion-safe animation helpers
- Mobile-first breakpoints at 576px, 768px, 1024px, and 1200px

Open the visual reference page at:

```text
http://localhost:8000/pages/design-system.html
```

## Navigation system

Prompt 3 adds the complete shared hospital navigation experience:

- Premium 24/7 information top bar
- Sticky desktop and mobile header
- Accessible medical-department mega menu
- Responsive off-canvas mobile navigation
- Emergency and appointment calls to action
- Search dialog with keyboard shortcut and live page filtering
- Persistent light/dark theme control
- Automatic active-page highlighting
- Escape-key, outside-click, focus-return, and reduced-motion behavior

Keyboard shortcuts:

- `/` opens site search when focus is not inside a form control.
- `Ctrl + K` or `Command + K` opens site search.
- `Escape` closes search, mobile navigation, or an open dropdown.

Detailed implementation notes are available in `docs/navigation.md`.

## Complete homepage

Prompt 4 replaces the setup hero with a production-quality, conversion-focused hospital homepage containing:

- Premium clinical hero and quick-access actions
- Animated hospital statistics
- About and clinical-quality presentation
- Six medical department cards
- Responsive Swiper doctor showcase
- Why-choose-us and emergency support panels
- Three realistic preventive health packages
- Patient testimonial carousel
- Accessible single-open FAQ accordion
- EmailJS-ready appointment request form with honest email fallback
- Embedded Google Map and visitor information
- Full newsletter and multi-column hospital footer
- Lightweight local SVG artwork with explicit dimensions and accessible alt text

Homepage-specific presentation is in `assets/css/home.css`. Interactive behavior is in `assets/js/homepage.js`, while form delivery remains centralized in `assets/js/forms.js`.

Detailed implementation notes are available in `docs/homepage.md`.
