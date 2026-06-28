# Mediva Care Hospital Navigation System

## Included interfaces

The shared navigation is present on every HTML page and contains:

1. A 24/7 hospital information top bar.
2. A sticky main navbar with responsive branding.
3. Direct links to the principal hospital pages.
4. A desktop mega menu and mobile accordion for clinical departments.
5. A compact dropdown for testimonials, gallery, and legal pages.
6. Emergency-call and appointment actions.
7. A client-side search dialog.
8. A persistent light/dark theme control.
9. An off-canvas mobile menu with a page backdrop.

## Main files

- `assets/css/navigation.css` contains the complete navigation, search, and responsive presentation layer.
- `assets/js/navigation.js` contains all shared navigation behavior.
- `assets/css/base.css` contains the semantic dark-theme token overrides.

## Search behavior

The search index is intentionally local and lightweight. It is defined in `assets/js/navigation.js` and includes hospital pages, medical departments, doctors, packages, gallery, testimonials, and contact information. Search results are generated with DOM methods rather than external dependencies.

When new public pages are added, add one object to the `searchIndex` array with:

- `title`
- `path`
- `icon`
- `description`
- `keywords`

Paths are resolved from the detected project root, so the feature works both locally and under the GitHub Pages repository subdirectory.

## Active-page state

Each `<body>` uses `data-nav-section`. The navigation controller combines this section value with the current URL to highlight both the main navigation group and the exact submenu page.

Available values include:

- `home`
- `about`
- `departments`
- `doctors`
- `packages`
- `more`
- `contact`

## Theme behavior

The selected theme is stored under `mediva-theme` in `localStorage`. When no preference has been saved, the website follows the operating-system color preference. The theme-color meta tag is updated when the theme changes.

All design-system components use semantic color variables, making future theme refinements possible without rewriting individual components.

## Accessibility behavior

- The mobile drawer uses `aria-expanded`, `aria-hidden`, `aria-controls`, and `inert` state management.
- Focus moves into opened interfaces and returns to the original control after closing.
- Dropdown controls announce their expanded state.
- The search dialog uses a native `<dialog>` element.
- Search results update through an `aria-live` region.
- Escape closes the active interface.
- Reduced-motion preferences disable drawer and dialog motion.
- All icon-only controls include accessible labels.
