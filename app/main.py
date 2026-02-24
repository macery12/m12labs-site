import logging
from pathlib import Path

from fastapi import FastAPI, Request, Form
from fastapi.responses import HTMLResponse, JSONResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

from app.config import settings
from app.gallery import get_all_screenshots, get_active_categories

BASE_DIR = Path(__file__).parent

app = FastAPI(title="M12Labs")
app.mount("/static", StaticFiles(directory=BASE_DIR / "static"), name="static")

templates = Jinja2Templates(directory=BASE_DIR / "templates")

logger = logging.getLogger("m12labs")

# ── shared context injected into every template ──────────────────────────────

def _ctx(request: Request, **extra) -> dict:
    return {
        "request": request,
        "settings": settings,
        **extra,
    }


# ── routes ────────────────────────────────────────────────────────────────────

@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    return templates.TemplateResponse("home.html", _ctx(request))


@app.get("/features", response_class=HTMLResponse)
async def features(request: Request):
    return templates.TemplateResponse("features.html", _ctx(request))


@app.get("/screenshots", response_class=HTMLResponse)
async def screenshots(request: Request, category: str = "All"):
    shots = get_all_screenshots()
    active_cats = get_active_categories(shots)
    return templates.TemplateResponse(
        "screenshots.html",
        _ctx(
            request,
            screenshots=shots,
            active_categories=active_cats,
            selected_category=category,
        ),
    )


@app.get("/support", response_class=HTMLResponse)
async def support(request: Request):
    return templates.TemplateResponse("support.html", _ctx(request))


@app.get("/discord")
async def discord_redirect():
    return RedirectResponse(url=settings.discord_url, status_code=302)


@app.get("/health")
async def health():
    return JSONResponse({"status": "ok"})


# ── contact form POST ─────────────────────────────────────────────────────────

@app.post("/support/contact", response_class=HTMLResponse)
async def contact_submit(
    request: Request,
    name: str = Form(...),
    email: str = Form(...),
    subject: str = Form(""),
    message: str = Form(...),
):
    logger.info("Contact form submission — name=%s email=%s subject=%s", name, email, subject)
    return templates.TemplateResponse(
        "support.html",
        _ctx(request, form_success=True),
    )
