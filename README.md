# M12Labs Site

Premium marketing website for the **M12Labs** game management panel.

## Tech stack

- **FastAPI** — HTTP routing
- **Jinja2** — server-side templates
- **Pydantic Settings** — `.env`-based configuration
- **Uvicorn** — ASGI server

---

## Local development

### Prerequisites

- Python 3.12+

### 1. Clone and set up

```bash
git clone https://github.com/macery12/m12labs-site.git
cd m12labs-site

python -m venv .venv
source .venv/bin/activate        # Windows: .venv\Scripts\activate
pip install -r requirements.txt
```

### 2. Configure environment

```bash
cp .env.example .env
# Edit .env if you want to change any URLs
```

### 3. Run the dev server

```bash
uvicorn app.main:app --reload --port 8000
```

Visit http://localhost:8000

---

## Docker

### Quick start

```bash
cp .env.example .env        # edit if needed
docker compose up --build
```

Site is served on http://localhost:8000

### Single container

```bash
docker build -t m12labs-site .
docker run -p 8000:8000 --env-file .env m12labs-site
```

---

## Routes

| Path | Description |
|------|-------------|
| `/` | Home (marketing) |
| `/features` | Features overview |
| `/screenshots` | Screenshot gallery |
| `/support` | Support / contact |
| `/discord` | Redirect to Discord invite |
| `/health` | JSON health check `{"status":"ok"}` |

---

## Configuration (.env)

| Variable | Default | Description |
|----------|---------|-------------|
| `SITE_URL` | `https://m12labs.net` | Canonical site URL (used in OG tags) |
| `DOCS_URL` | `https://docs.m12labs.net` | External docs link |
| `DISCORD_URL` | `https://discord.gg/fVJZtqKYrc` | Discord invite URL |
| `GITHUB_URL` | `https://github.com/macery12/M12labs` | GitHub repo URL |

Copy `.env.example` to `.env` and edit the values you need.

---

## Screenshots / gallery

All screenshots live in `app/static/img/screenshots/`.

### Filename prefix -> category mapping

| Prefix | Category shown in UI |
|--------|----------------------|
| `billing_` | Billing & Payments |
| `plans_` | Plans & Cycles |
| `themes_` | UI & Themes |
| `misc_` | Miscellaneous (shown only when files exist) |

### Adding screenshots

1. Drop a `.png` (or `.jpg`, `.webp`) file into `app/static/img/screenshots/`.
2. Name it with the correct prefix, e.g. `billing_refund_flow.png`.
3. The gallery page rebuilds the list server-side on every request — no code changes needed.

### Placeholder images

The repo ships with simple placeholder images for every referenced filename.
Replace them with real screenshots when available:

```
app/static/img/screenshots/billing_checkout.png
app/static/img/screenshots/billing_overview.png
app/static/img/screenshots/plans_cycles.png
app/static/img/screenshots/plans_pricing.png
app/static/img/screenshots/themes_editor.png
app/static/img/screenshots/themes_overview.png
```

---

## Replacing the logo

Swap out `app/static/img/logo.png` with your own image (32x32 or 64x64 PNG recommended).
The img tag in the nav bar uses `width="32" height="32"`, adjust in `base.html` if needed.

---

## Project structure

```
m12labs-site/
├── app/
│   ├── main.py           # FastAPI routes
│   ├── config.py         # Pydantic Settings
│   ├── gallery.py        # Screenshot directory scanner
│   ├── templates/
│   │   ├── base.html
│   │   ├── home.html
│   │   ├── features.html
│   │   ├── screenshots.html
│   │   └── support.html
│   └── static/
│       ├── css/site.css
│       ├── js/site.js
│       └── img/
│           ├── logo.png
│           ├── og-image.png
│           └── screenshots/
├── .env.example
├── Dockerfile
├── docker-compose.yml
├── requirements.txt
└── README.md
```
