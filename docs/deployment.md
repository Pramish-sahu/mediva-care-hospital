# Deployment Guide

## Local preview

From the project root:

```bash
./scripts/serve.sh
```

Or choose a port:

```bash
./scripts/serve.sh 8080
```

## Validate before deployment

```bash
python3 scripts/validate-project.py
```

Validation checks HTML structure, duplicate IDs, local references, image dimensions and alternative text, iframe titles, inline CSS/JavaScript, JavaScript syntax, CSS brace balance, and SVG XML validity.

## Create a release ZIP

```bash
./scripts/package-release.sh
```

The script excludes Git metadata, logs, cache files, and operating-system metadata.

## GitHub Pages

1. Push the project to the `main` branch.
2. Open repository **Settings → Pages**.
3. Choose **Deploy from a branch**.
4. Select `main` and `/ (root)`.
5. Save and wait for the deployment to complete.

The existing sitemap assumes:

```text
https://pramish-sahu.github.io/mediva-care-hospital/
```

Update `sitemap.xml` and `robots.txt` if the repository name or production domain changes.

## Custom domain

Before connecting a custom domain:

- Update sitemap and robots URLs.
- Replace all demo contact and clinical content.
- Configure EmailJS or another approved form service.
- Review privacy and terms pages with legal counsel.
- Review medical copy with qualified clinical stakeholders.
- Run Lighthouse and manual browser/device testing against the deployed URL.
- Configure security headers through the hosting provider where supported.

## Cache guidance

For production hosting, use long-lived caching for versioned static assets and shorter caching for HTML documents. Because this project currently uses readable filenames without content hashes, purge or invalidate cached CSS and JavaScript after updates.
