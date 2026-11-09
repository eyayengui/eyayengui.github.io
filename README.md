# Eya Yengui — Portfolio

Bilingual (EN/FR) portfolio — React 18, TypeScript, Vite, Tailwind CSS, Motion, React Router, react-i18next.

## Getting started

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # type-check + production build in dist/
npm run preview   # serve the production build
```

## Updating content

| What | Where |
| --- | --- |
| Email, GitHub, LinkedIn | `src/data/profile.ts` (empty = "coming soon" placeholder) |
| CV | drop the PDF at `public/cv/Eya_Yengui_CV.pdf` (buttons activate automatically) |
| Projects (links, tech, images) | `src/data/projects.ts` |
| Project texts | `src/i18n/en.json` + `src/i18n/fr.json` → `projects.items.<slug>` |
| Live demo gallery | set `liveDemo: true` (and `live: 'https://…'`) on a project |
| Skills | `src/data/skills.ts` (FR names in `fr.json` → `skills.terms`) |
| Experience | `src/data/experience.ts` + `experience.items.<id>` in both JSON files |
| Screenshots | `public/images/projects/…` then reference them in `projects.ts` |

### Add a new project

1. Add an object to `projects` in `src/data/projects.ts` with a unique `slug`.
2. Add `projects.items.<slug>` (`title`, `category`, `short`, `description`, `features[]`, optional `workflow[]`, `role`, `deployment`) to **both** `en.json` and `fr.json`.
3. Optionally add `image`, `gallery`, `architecture`, `video`, `github`, `live`.

## Deployment (CI/CD)

`.github/workflows/deploy.yml` type-checks and builds on every push / PR and deploys `main` to **GitHub Pages**
(enable *Settings → Pages → Source: GitHub Actions*). The base path defaults to `/<repo-name>/`; set the
repository variable `VITE_BASE=/` when using a custom domain or a `<user>.github.io` repository.

`public/staticwebapp.config.json` is included for **Azure Static Web Apps** (SPA fallback for `/projects/*`).
