# Mediva Care Hospital Validation Report

Validated on June 28, 2026.

## Coverage

- 19 HTML documents parsed successfully.
- 6 required service pages completed.
- Every service page contains overview, symptoms, treatments, doctors, facilities, FAQ, and appointment/follow-up sections.
- Every service page contains 6 symptom cards, 6 treatment or pathway cards, 2 doctor cards, 6 facility cards, and 5 FAQs.

## Integrity

- All local HTML, CSS, JavaScript, image, logo, favicon, and document references resolve.
- No duplicate HTML IDs were found.
- Every image includes alternative text.
- No inline CSS or inline JavaScript was added.
- All JavaScript files pass `node --check` syntax validation.
- All SVG assets parse as valid XML.
- CSS delimiter-balance checks pass.

## Accessibility and interaction

- FAQ controls expose `aria-expanded`, `aria-controls`, and matching panel IDs.
- Collapsed FAQ panels expose `aria-hidden` and are updated by JavaScript.
- Appointment forms use explicit labels, required states, consent controls, and live status regions.
- In-page navigation uses active-location feedback.
- Reduced-motion preferences disable nonessential service-page motion.

## Production reminder

The hospital name, doctors, credentials, schedules, facilities, contact details, and clinical service descriptions are demonstration content. They require client, clinical, legal, and jurisdictional review before a real launch.


# Prompt 7 Component Validation

Validated on June 28, 2026.

## Coverage

- 20 HTML documents parsed successfully.
- The shared component library is loaded on every HTML page.
- The visual reference page demonstrates all required Prompt 7 components.
- Component JavaScript is declarative and uses reusable `data-*` hooks.

## Component inventory

- Buttons and semantic badges
- Generic, doctor, pricing, and testimonial cards
- Inputs, selections, validation, checkboxes, radios, and switches
- Accessible accordion and keyboard-operable tabs
- Patient journey timeline
- Responsive gallery and native-dialog lightbox
- Breadcrumbs and pagination
- Native-dialog modal
- Dismissible alerts and toast notifications
- Responsive newsletter form
- Loading-button and skeleton states

## Integrity

- All local HTML, CSS, JavaScript, image, logo, favicon, and documentation references resolve.
- No duplicate HTML IDs were found.
- No inline CSS or inline JavaScript event handlers were added.
- JavaScript syntax validation passes for the component and navigation controllers.
- CSS delimiter-balance checks pass across all stylesheets.
- The component API avoids collisions with the existing About-page timeline.

## Accessibility

- Modal behavior uses native `<dialog>` semantics and restores focus to its opener.
- Accordion controls use matching `aria-controls`, `aria-expanded`, and `aria-hidden` states.
- Tabs support Left Arrow, Right Arrow, Home, and End keyboard navigation.
- Toast, newsletter, and pagination feedback use live regions.
- Dismiss buttons include explicit accessible labels.
- Reduced-motion preferences remove nonessential component animation.
