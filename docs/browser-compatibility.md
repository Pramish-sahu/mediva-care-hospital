# Browser Compatibility

The website targets current evergreen desktop and mobile browsers:

- Chromium-based browsers
- Firefox
- Safari
- Mobile Safari
- Chrome for Android

## Progressive enhancement

- Native semantic HTML remains readable if JavaScript is unavailable.
- AOS falls back to visible content when the library does not initialize.
- Intersection Observer features fall back to immediate rendering.
- The search dialog uses native `<dialog>` where available.
- Reduced-motion preferences disable nonessential movement.
- Reduced-data preferences disable decorative transforms and continuous motion.
- `overflow: clip` has a hidden-overflow fallback.
- Rendering containment is ignored safely by browsers without support.

## Manual test checklist

Test at minimum:

- 320–390px mobile width
- 768px tablet width
- 1024–1366px laptop width
- 1440px and larger desktop width
- Keyboard-only navigation
- Light and dark themes
- Reduced-motion mode
- Browser back/forward navigation
- Form validation and mail fallback
- Mobile menu, dropdowns, search, filters, sliders, accordions, dialogs, and gallery lightbox

Browser emulation is useful, but final commercial delivery should also be tested on real devices.
