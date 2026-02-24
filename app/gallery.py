import os
import re
from pathlib import Path

SCREENSHOTS_DIR = Path(__file__).parent / "static" / "img" / "screenshots"

CATEGORY_MAP = {
    "billing": "Billing & Payments",
    "plans": "Plans & Cycles",
    "themes": "UI & Themes",
    "misc": "Miscellaneous",
}

MAIN_CATEGORIES = ["Billing & Payments", "Plans & Cycles", "UI & Themes"]


def _prefix_from_filename(name: str) -> str:
    match = re.match(r"^([a-z]+)_", name)
    return match.group(1) if match else "misc"


def _category_from_prefix(prefix: str) -> str:
    return CATEGORY_MAP.get(prefix, "Miscellaneous")


def get_all_screenshots() -> list[dict]:
    """Return all screenshot dicts sorted by category then filename."""
    if not SCREENSHOTS_DIR.exists():
        return []
    results = []
    for f in sorted(SCREENSHOTS_DIR.iterdir()):
        if f.suffix.lower() in {".png", ".jpg", ".jpeg", ".webp", ".gif"}:
            prefix = _prefix_from_filename(f.name)
            category = _category_from_prefix(prefix)
            alt = f.stem.replace("_", " ").title()
            results.append(
                {
                    "filename": f.name,
                    "url": f"/static/img/screenshots/{f.name}",
                    "category": category,
                    "alt": alt,
                }
            )
    return results


def get_active_categories(screenshots: list[dict]) -> list[str]:
    """Return main categories that have at least one screenshot."""
    found = {s["category"] for s in screenshots}
    active = [c for c in MAIN_CATEGORIES if c in found]
    if "Miscellaneous" in found:
        active.append("Miscellaneous")
    return active
