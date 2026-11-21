# TOP TECH — Content Management & GitHub Pages Deployment Guide

## 1. Content Management with Pages CMS

This website stores all editable content as structured JSON files inside `src/content/` and includes a pre-configured `.pages.yml` schema at the repository root.

### Connecting to Pages CMS
1. Push this repository to GitHub.
2. Visit [Pages CMS](https://pagescms.org/) and sign in with your GitHub account.
3. Select this repository. Pages CMS automatically detects `.pages.yml`.
4. You can now edit without touching source code:
   - **Site Settings & Branding** (`src/content/site.json`): Brand name, tagline, optional uploaded logo (`logoUrl`), "Get Started" / "Start a Project" external URL, footer legal copy, and default SEO.
   - **Navigation & Footer Links** (`src/content/navigation.json`): Configure header routes (`/`, `/about`, `/services`, `/projects`, `/process`, `/contact`), Services dropdown, and footer links.
   - **Main Pages** (`src/content/home.json`, `src/content/about.json`, `src/content/services-overview.json`, `src/content/projects-overview.json`, `src/content/process.json`, `src/content/contact.json`): Edit copy, imagery, process stages, values, and per-page SEO metadata.
   - **Individual Services & External Ordering** (`src/content/services/*.json`): Configure all 7 service pages (Website Development, E-Commerce Development, Web Applications, Mobile Applications, Graphic Design, Building Plans, AI Training) or add new services—including benefits, features, FAQs, external `orderingUrl`, `buttonText`, `image`, `available` toggle, and display `order`. Leave `orderingUrl` empty (or set `available: false`) to route visitors to the Contact Us fallback instead of a broken link.
   - **Portfolio Projects** (`src/content/projects/*.json`): Add/edit projects, images, categories, external links, and optional video demonstration URLs.
   - **Testimonials** (`src/content/testimonials/*.json`): Add, edit, delete, or toggle `visible: false` to hide an entry. Sample placeholders are clearly flagged via `isSamplePlaceholder: true`.
   - **Contact Details & Form Service** (`src/content/contact.json`): Update email, phone, WhatsApp number, location, social links, and paste your external form handler endpoint (e.g., Formspree or Web3Forms) into `formEndpoint`.
   - **Custom Pages** (`src/content/pages/*.json`): Create new pages (e.g. promotions, training cohorts, case studies) accessible at `/#/pages/<slug>` and optionally link them in `navigation.json`.

---

## 2. Deploying to GitHub Pages

The project uses `HashRouter` and a configurable Vite `base` (`VITE_BASE_PATH`) so all routes, page refreshes, and static assets work reliably on GitHub Pages subpaths.

### Automatic Deployment (Recommended)
1. Push your code to the `main` branch on GitHub.
2. Open **Settings → Pages** in your GitHub repository.
3. Under **Build and deployment → Source**, select **GitHub Actions**.
4. The workflow in `.github/workflows/deploy.yml` automatically sets `VITE_BASE_PATH=/<your-repo-name>/`, builds `dist/`, and publishes to GitHub Pages.
5. If you configure a custom domain (e.g. `toptech.example.com`), update `VITE_BASE_PATH` in `.github/workflows/deploy.yml` to `/` and add your `CNAME` file inside `public/CNAME`.

### Manual Local Build Test
```bash
# Root domain build
npm run build

# Repository subpath build
VITE_BASE_PATH=/top-tech/ npm run build
```
