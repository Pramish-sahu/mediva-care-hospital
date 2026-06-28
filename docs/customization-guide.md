# Client Customization Guide

## Global contact details

Update the central JavaScript configuration:

```text
assets/js/config.js
```

Then replace visible demo contact details across HTML files:

- Hospital phone number
- Emergency phone number
- Email address
- Street address
- Visiting hours
- Map embed

## Branding

Replace:

```text
assets/logos/logo.svg
assets/logos/logo-white.svg
assets/logos/mark.svg
assets/favicon/
```

Update brand colors in:

```text
assets/css/base.css
```

The primary design tokens are CSS custom properties near the beginning of the file.

## Doctors and medical content

Doctor cards and profiles are stored directly in the relevant HTML pages. Replace names, qualifications, specialties, schedules, biographies, and images only with client-approved information.

Important files include:

```text
index.html
pages/doctors.html
pages/doctor-details.html
pages/services/*.html
```

## Packages and prices

Update package inclusions, eligibility notes, pricing, and booking links in:

```text
index.html
pages/packages.html
```

## Forms and EmailJS

Add public EmailJS identifiers in:

```text
assets/js/config.js
```

Never commit private credentials. The website uses a mail-client fallback while EmailJS is not configured.

## Maps

Replace the Google Maps iframe URL in the homepage and contact page. Confirm that the final location, title, and privacy requirements match the client's jurisdiction.

## Animation settings

The initial loader is disabled for production performance. It can be enabled in:

```js
performance: {
  enableInitialLoader: true,
}
```

Keep reduced-motion behavior enabled.

## Internal showcase pages

These portfolio/development pages remain available but are not exposed in the public hospital navigation:

```text
pages/design-system.html
pages/components.html
pages/animations.html
```

They may be removed before a client launch if they are not required.
