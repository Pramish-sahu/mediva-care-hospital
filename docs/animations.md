# Mediva Care Hospital — Animation System

## Purpose

The motion system improves orientation, confirms interaction, and adds premium polish without making the hospital experience feel theatrical. All animation is optional enhancement: content and controls remain usable when motion libraries, JavaScript, or animation preferences disable it.

## Included features

- AOS fade, slide, and scale reveals
- Native `IntersectionObserver` reveal fallback
- Locale-aware counters with prefixes, suffixes, decimals, and duration controls
- RequestAnimationFrame parallax with clamped movement
- Smooth same-page scrolling with sticky-header offset
- Global scroll progress indicator
- Back-to-top control
- Floating cards and availability pulse
- Hover lift, glow, scale, shine, ripple, tilt, and magnetic interactions
- Dynamic branded page loader
- Sticky panel state detection
- Active section navigation
- Reduced-motion fallbacks

## Files

- `assets/css/animations.css` — animation tokens, keyframes, states, controls, and showcase styles
- `assets/js/animations.js` — global animation controller
- `pages/animations.html` — interactive visual reference

## AOS usage

```html
<article data-aos="fade-up" data-aos-delay="120">
  ...
</article>
```

AOS is initialized once with a 720 ms duration, calm cubic easing, a 54 px viewport offset, and `once: true`.

## Native reveal usage

```html
<div data-reveal>Default upward reveal</div>
<div data-reveal="left">Reveal from left</div>
<div data-reveal="right">Reveal from right</div>
<div data-reveal="scale">Gentle scale reveal</div>
```

## Counter usage

```html
<span
  data-counter="98.6"
  data-counter-decimals="1"
  data-counter-suffix="%"
  data-counter-duration="1600"
>0</span>
```

Supported attributes:

- `data-counter` — target value
- `data-counter-start` — optional start value
- `data-counter-prefix` — text before the value
- `data-counter-suffix` — text after the value
- `data-counter-decimals` — displayed decimal precision
- `data-counter-duration` — duration in milliseconds
- `data-counter-locale` — Intl locale, default `en-IN`

## Parallax usage

```html
<div data-parallax data-parallax-speed="0.12">...</div>
```

Recommended speed range: `-0.18` to `0.18`. The controller clamps all values and skips off-screen elements.

## Micro-interaction usage

```html
<article data-hover="lift">...</article>
<button class="button button--ripple motion-shine" data-magnetic="0.12">...</button>
<article data-tilt="6">...</article>
```

Tilt and magnetic movement are enabled only for fine pointers with hover support.

## Sticky usage

```html
<aside data-sticky>...</aside>
```

CSS handles positioning. JavaScript adds `.is-stuck` when the element reaches its sticky boundary.

## Reduced motion

When `prefers-reduced-motion: reduce` is enabled:

- Continuous animations complete immediately
- Parallax, tilt, magnetic movement, and page loader are disabled
- Scroll behavior becomes immediate
- Reveal content is visible without transitions
- The scroll-progress animation is hidden

## Performance guidance

1. Animate transform and opacity rather than layout properties.
2. Keep parallax speeds low and use it only on decorative layers.
3. Avoid more than four staggered items in one visible row.
4. Do not add continuous animation to dense content sections.
5. Preserve readable content before animation initializes.
