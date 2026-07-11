# Repository Guidelines

## Project Structure & Module Organization

This is a Vite React frontend for a budget application. Main code lives under `src/`.

- `src/main.jsx` and `src/App.jsx` bootstrap the React app.
- `src/routes/` contains route definitions and public/private route guards.
- `src/views/` contains page-level screens, including authentication and budget views.
- `src/components/` contains reusable layout and atom components, often paired with local `style.scss`.
- `src/services/` contains API-facing service modules.
- `src/reducer/` and `src/app/store.jsx` contain Redux Toolkit state setup.
- `src/assets/` contains SCSS theme files, icons, and images.
- `netlify.toml` and `_redirects` configure Netlify deployment.

## Build, Test, and Development Commands

Use npm with the committed lockfile.

- `npm install` installs dependencies.
- `npm run start:dev` starts the Vite dev server.
- `npm run start:production` starts Vite with production variables.
- `npm run build:production` creates a production build in `dist/`.
- `npm run build:dev` currently also builds with production mode; verify before relying on it for development builds.
- `npm run lint` runs ESLint for `.js` and `.jsx` files with zero warnings allowed.
- `npm run preview` serves the built output locally.

## Coding Style & Naming Conventions

Use React 18 functional components and hooks. Name component files and exported components in PascalCase, for example `CommonBudgetCard/index.jsx`. Keep route, service, reducer, and utility modules in their existing folders. Use SCSS, with component-specific styles beside the component when that pattern exists.

The repo uses ESLint with `eslint:recommended`, React, React Hooks, and React Refresh rules. Run `npm run lint` before submitting. Follow the existing JSX style: double quotes, semicolons, and 2-space indentation.

## Testing Guidelines

No test framework or `npm test` script is currently configured. For behavior changes, add tests only after introducing an agreed setup such as Vitest and React Testing Library. Until then, validate with `npm run lint`, `npm run build:production`, and manual browser checks for affected routes and forms.

## Commit & Pull Request Guidelines

Recent commits use short messages such as `add-loader`, `better-code-quality`, and `improvements`. Keep commit subjects concise and focused.

Pull requests should include a summary, affected screens or routes, validation steps, and screenshots for visible UI changes. Link related issues. Note environment variable or API contract changes explicitly.

## Security & Configuration Tips

Environment-specific values live in `.env.development` and `.env.production`. Do not commit secrets. Vite exposes only variables prefixed with `VITE_`; keep API URLs and client-safe configuration there, and keep private credentials on the backend.
