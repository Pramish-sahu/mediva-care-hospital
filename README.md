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
