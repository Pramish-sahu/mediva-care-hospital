# Mediva Care Hospital

A production-quality static healthcare website created as a portfolio demonstration for **Pramish Web Studio**.

## Final release status

The complete frontend build is finished through Prompt 10.

- Prompts 1–8: completed
- Prompt 9: intentionally skipped for this demo
- Prompt 10: completed

Basic page metadata, semantic HTML, robots, sitemap, favicons, image alternative text, accessible navigation, and form labels remain included. Full production SEO, structured data, and organization-specific search optimization should be completed when a real client and final domain are available.

## Technology

- Semantic HTML5
- Modern CSS3
- Vanilla JavaScript (ES6)
- Font Awesome
- Google Fonts
- AOS
- Swiper.js
- EmailJS-ready forms

No React, Bootstrap, Tailwind, frontend framework, or backend is used.

## Website coverage

### Main experience

- Premium responsive homepage
- Sticky top bar and navigation
- Desktop mega menu and mobile drawer
- Accessible search dialog
- Light and dark themes
- Appointment and emergency conversion paths
- Full footer and newsletter presentation

### Internal pages

- About
- Departments
- Doctors
- Doctor details
- Health packages
- Testimonials
- Gallery
- Contact
- Privacy policy
- Terms of use
- Custom 404 page

### Medical service pages

- Cardiology
- Neurology
- Orthopedics
- Pediatrics
- Dental care
- Emergency care

### Portfolio reference pages

The following pages remain available for design and development review but are intentionally hidden from patient-facing navigation:

- `pages/design-system.html`
- `pages/components.html`
- `pages/animations.html`

## Local preview

```bash
./scripts/serve.sh
```

Open:

```text
http://localhost:8000
```

A custom port can be supplied:

```bash
./scripts/serve.sh 8080
```

## Validation

Run the dependency-free project audit:

```bash
python3 scripts/validate-project.py
```

The audit checks:

- HTML5 doctypes and language attributes
- Duplicate IDs
- Local file references
- Inline CSS and inline JavaScript
- Image alternative text and dimensions
- Lazy-loaded iframe titles
- JavaScript syntax through Node.js
- CSS delimiter balance
- SVG XML validity

The same validation runs automatically through `.github/workflows/validate.yml` on pushes and pull requests.

## Create a release archive

```bash
./scripts/package-release.sh
```

## Forms

Configure public EmailJS values in:

```text
assets/js/config.js
```

Until EmailJS is configured, supported forms open a prefilled email draft. Never commit private credentials.

## Production optimization

The final build includes:

- Explicit media dimensions to reduce layout shift
- High-priority loading only for visible branding and first meaningful page imagery
- Lazy loading for below-the-fold images, footer branding, and maps
- Async image decoding
- Deferred JavaScript
- Scroll work batched through `requestAnimationFrame`
- Below-the-fold rendering containment
- Initial loader disabled by default to protect first paint
- Reduced-motion and reduced-data support
- Narrow-screen and horizontal-overflow safeguards
- Print styles
- Secure new-tab links
- Browser-history state restoration

Actual Lighthouse scores must be measured on the final deployed domain and hosting environment.

## Documentation

- `docs/design-system.md`
- `docs/navigation.md`
- `docs/homepage.md`
- `docs/internal-pages.md`
- `docs/service-pages.md`
- `docs/components.md`
- `docs/animations.md`
- `docs/final-production.md`
- `docs/customization-guide.md`
- `docs/deployment.md`
- `docs/browser-compatibility.md`
- `docs/release-checklist.md`
- `docs/validation-report.md`

## Important demo notice

The hospital identity, doctors, qualifications, schedules, patient stories, package prices, address, contact details, and medical content are demonstration data. Replace and review them with the client, qualified clinicians, and legal professionals before any real-world launch.
