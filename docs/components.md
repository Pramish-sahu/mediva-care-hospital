# Mediva Care Hospital — Reusable Component Library

Prompt 7 introduces a reusable UI layer for healthcare pages and future client projects.

## Files

- `assets/css/component-library.css` — extended component presentation and responsive states.
- `assets/js/components.js` — accessible behavior controlled by `data-*` attributes.
- `pages/components.html` — visual component reference and interaction showcase.

## Included components

- Buttons: primary, secondary, accent, danger, ghost, link, icon, loading, sizes, block.
- Cards: generic, doctor, pricing/package, testimonial.
- Forms: inputs, input groups, select, textarea, validation, checkbox, radio, switch.
- Disclosure: single-open accordion and keyboard-accessible tabs.
- Timeline: sequential patient journey and milestone content.
- Gallery: responsive media grid and native-dialog lightbox.
- Breadcrumbs: hierarchical location navigation.
- Modals: native `<dialog>` with close controls, backdrop click, Escape, and focus restoration.
- Alerts: info, success, warning, danger, optional dismissal.
- Badges: semantic, solid, outline, dot, and size variants.
- Pagination: accessible current-page state and disabled navigation.
- Newsletter: responsive conversion card with validation and live feedback.
- Toasts: non-blocking status updates.
- Skeletons: loading placeholders with reduced-motion handling.

## JavaScript API

Use declarative attributes instead of page-specific scripts:

- `data-component-accordion` and `data-single="true|false"`
- `data-tabs`
- `data-modal-open="dialog-id"` and `data-modal-close`
- `data-alert-dismiss`
- `data-gallery-open` and `data-gallery-dialog`
- `data-pagination` and `data-page`
- `data-loading-demo`
- `data-newsletter-demo`
- `data-toast-demo`

## Accessibility

- Semantic native buttons and links.
- Native dialog focus containment and Escape support.
- ARIA-expanded and ARIA-hidden accordion states.
- Arrow-key, Home, and End navigation for tabs.
- Live regions for pagination, newsletter, and toast feedback.
- Minimum practical touch targets.
- Visible focus indicators.
- Reduced-motion behavior.
- Decorative icons are hidden from assistive technology.

## Reuse rules

1. Prefer existing component classes before creating page-specific duplicates.
2. Keep page-level layout in the page stylesheet and component behavior in this library.
3. Use semantic variants rather than hard-coded colors.
4. Keep form labels visible and connect errors with `aria-describedby`.
5. Do not place urgent clinical action behind a modal or carousel.
