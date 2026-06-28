# Mediva Care Hospital Homepage

## Sections

The homepage in `index.html` contains all required sections in conversion order:

1. Hero with primary appointment and doctor-discovery actions
2. Four quick-access hospital actions
3. Trust and performance statistics
4. About Mediva Care
5. Clinical departments
6. Specialist doctor carousel
7. Why choose Mediva
8. Emergency support callout
9. Preventive health packages
10. Patient testimonials
11. Frequently asked questions
12. Appointment and contact form
13. Google Map and visitor information
14. Complete hospital footer and newsletter

## Homepage CSS

`assets/css/home.css` contains only homepage and complete-footer rules. Shared tokens, form fields, buttons, navigation, and base card styles remain in the reusable design-system files.

The layout follows mobile-first breakpoints already defined by the project:

- 576px
- 768px
- 1024px
- 1200px

The homepage includes dedicated dark-theme refinements and reduced-motion behavior.

## Homepage JavaScript

`assets/js/homepage.js` initializes:

- Swiper doctor and testimonial carousels
- Intersection Observer counters
- Accessible FAQ accordion state
- Button ripple feedback
- Minimum appointment date
- Newsletter email fallback

Every enhancement fails safely. Core content remains available when JavaScript or a CDN library is unavailable.

## Appointment form

`assets/js/forms.js` uses EmailJS when all four required values are supplied in `assets/js/config.js`:

- `publicKey`
- `serviceId`
- `appointmentTemplateId`
- `contactTemplateId`

Until those values are configured, submitting the appointment form opens a prefilled email draft addressed to the hospital. The demo therefore remains functional without claiming that an unsent request was received.

## Artwork

The homepage uses original lightweight SVG illustrations stored locally:

- `assets/images/hero/hero-medical-team.svg`
- `assets/images/about/mediva-hospital-building.svg`
- `assets/images/doctors/`
- `assets/images/testimonials/`

They avoid third-party image loading, reduce layout shift, and keep the project suitable for a reusable client demo. Future client photography can replace these files without changing the HTML structure.

## Map

The homepage uses a standard Google Maps query embed that does not require a private API key. Replace the query and visible address before deploying for an actual hospital client.
