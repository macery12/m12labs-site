# M12Labs Site (Vite + React)

Marketing site for M12Labs, now refactored to a client-rendered React app using Vite and JSX.

## Tech stack

- Vite
- React 18 (JSX)
- React Router
- CSS (single stylesheet)
- Nginx (production container)

## Local development

Prerequisites:

- Node.js 20+
- npm 10+

Setup and run:

```bash
npm install
npm run dev
```

Vite dev server will start on http://localhost:5173.

## Environment variables

Create a `.env` file from `.env.example` and edit values if needed.

```bash
cp .env.example .env
```

Expected variables:

- `VITE_SITE_URL`
- `VITE_DOCS_URL`
- `VITE_DISCORD_URL`
- `VITE_GITHUB_URL`

## Scripts

- `npm run dev`: start development server
- `npm run build`: create production build
- `npm run preview`: serve the production build locally

## Routes

- `/`: home
- `/features`: features page
- `/screenshots`: screenshot gallery with filters and lightbox
- `/support`: support page with FAQ and contact form demo
- `/discord`: redirect to Discord URL from env
- `/health`: returns `{"status":"ok"}` for health checks

## Docker

Build and run with Compose:

```bash
docker compose up --build
```

App is served on http://localhost:8000.

The container uses a multi-stage build:

1. Build static assets with Vite in a Node image.
2. Serve `dist` with Nginx.

## Project structure

```text
m12labs-site/
├── public/
│   └── img/
├── src/
│   ├── components/
│   ├── data/
│   ├── pages/
│   ├── App.jsx
│   ├── main.jsx
│   └── styles.css
├── .env.example
├── docker-compose.yml
├── Dockerfile
├── nginx.conf
├── index.html
├── package.json
└── README.md
```

## Notes

- Legacy FastAPI files have been removed.
