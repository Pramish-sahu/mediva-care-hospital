# Mediva Care Hospital Design System

The Mediva design system is a mobile-first CSS foundation for every public page and reusable component in the project.

## Stylesheet order

Load the stylesheets in this order on every page:

```html
<link rel="stylesheet" href="assets/css/base.css" />
<link rel="stylesheet" href="assets/css/layout.css" />
<link rel="stylesheet" href="assets/css/components.css" />
<link rel="stylesheet" href="assets/css/utilities.css" />
<link rel="stylesheet" href="assets/css/animations.css" />
<link rel="stylesheet" href="assets/css/pages.css" />
<link rel="stylesheet" href="assets/css/responsive.css" />
```

Adjust the relative path for nested pages.

## File responsibilities

- `base.css`: color, typography, spacing, radius, border, shadow, container, motion, and z-index tokens; reset; global type rules; accessibility defaults.
- `layout.css`: containers, sections, flexible flow helpers, twelve-column grid, header, navigation, and footer shell.
- `components.css`: buttons, cards, badges, section headings, form controls, alerts, avatars, and icon containers.
- `utilities.css`: small single-purpose layout, spacing, type, surface, and interaction helpers.
- `animations.css`: reusable keyframes, hover behavior, transitions, and reduced-motion protection.
- `pages.css`: styles that are genuinely specific to a page or page family.
- `responsive.css`: mobile-first layout changes at the documented project breakpoints.

## Core breakpoints

| Name | Width | Typical target |
|---|---:|---|
| Small | `36rem` / 576px | Large phones |
| Medium | `48rem` / 768px | Tablets |
| Large | `64rem` / 1024px | Laptops |
| Extra large | `75rem` / 1200px | Desktops |

CSS custom properties for these values are documented in `base.css`. Media queries use literal values because custom properties are not supported in media-query conditions.

## Naming conventions

- Reusable components use BEM-style classes such as `.card__body` and `.button--primary`.
- Layout primitives use clear names such as `.container`, `.grid`, `.stack`, and `.cluster`.
- Utility classes use the `u-` prefix, such as `.u-text-center`.
- State classes use semantic names or ARIA attributes.
- Page-only selectors are kept in `pages.css`.

## Example section heading

```html
<header class="section-heading section-heading--center">
  <p class="section-heading__eyebrow">Expert Departments</p>
  <h2 class="section-heading__title">Specialist care for every stage of life</h2>
  <p class="section-heading__text">
    Coordinated consultation, diagnostics, treatment, and follow-up care.
  </p>
</header>
```

## Example card grid

```html
<div class="grid--3">
  <article class="card card--interactive">
    <div class="card__body">
      <span class="badge badge--primary">Cardiology</span>
      <h3 class="card__title">Advanced Heart Care</h3>
      <p class="card__text">Specialist cardiac care supported by modern diagnostics.</p>
    </div>
  </article>
</div>
```

## Example form field

```html
<div class="form-group">
  <label class="form-label" for="patient-name">
    Patient name <span class="form-label__required">*</span>
  </label>
  <input
    class="form-control"
    id="patient-name"
    name="patient-name"
    type="text"
    autocomplete="name"
    required
  />
</div>
```

## Accessibility rules

- Preserve visible keyboard focus.
- Use native controls before custom controls.
- Connect labels, helper text, and error text with `for`, `id`, and `aria-describedby`.
- Use `aria-invalid="true"` for invalid inputs.
- Maintain useful color contrast; never communicate status with color alone.
- Keep the skip link as the first focusable element.
- Respect `prefers-reduced-motion`.
- Keep touch targets close to or above 44px.

## Visual reference

Run the site locally and open:

```text
http://localhost:8000/pages/design-system.html
```
