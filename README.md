# AGES Gaming

Responsive, full-screen video landing page for AGES Gaming, built with Angular.

Live site: https://luchador001.github.io/ages-gaming-site/

## Stack

- Angular 21, standalone components
- SCSS with CSS custom properties for theming (light/dark)
- rem-based responsive scale: `1rem` = `10px` on web, `1.6667vmin` on tablet, `2.6667vmin` on mobile

## Development

```bash
npm install
npm start        # dev server at http://localhost:4200
npm run build     # production build to dist/ages-site/browser
npm test          # unit tests
```

## Deployment

Pushing to `main` triggers `.github/workflows/pages.yml`, which builds the app and deploys it to GitHub Pages.
