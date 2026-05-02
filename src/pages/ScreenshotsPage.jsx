import { useEffect, useMemo, useState } from "react";
import PageMeta from "../components/PageMeta";
import { galleryCategories, screenshots } from "../data/site";

export default function ScreenshotsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  const filtered = useMemo(() => {
    if (selectedCategory === "All") {
      return screenshots;
    }

    return screenshots.filter((shot) => shot.category === selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (lightboxIndex < 0) {
        return;
      }

      if (event.key === "Escape") {
        setLightboxIndex(-1);
      }

      if (event.key === "ArrowLeft") {
        setLightboxIndex((current) => {
          const prev = current - 1;
          return prev < 0 ? filtered.length - 1 : prev;
        });
      }

      if (event.key === "ArrowRight") {
        setLightboxIndex((current) => {
          const next = current + 1;
          return next >= filtered.length ? 0 : next;
        });
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, filtered.length]);

  useEffect(() => {
    document.body.style.overflow = lightboxIndex >= 0 ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxIndex]);

  return (
    <>
      <PageMeta
        title="Showcase - M12Labs"
        description="Product showcase for M12Labs platform workflows: payments, billing logic, and UI controls."
      />

      <div className="page-header section">
        <div className="container">
          <h1 className="page-heading">Showcase</h1>
          <p className="page-sub">Visual walkthrough of checkout, billing, cycle management, and panel control surfaces.</p>
        </div>
      </div>

      <section className="gallery-section section" aria-labelledby="gallery-heading">
        <div className="container">
          <h2 className="sr-only" id="gallery-heading">Screenshot gallery</h2>

          <nav className="gallery-filters" aria-label="Filter screenshots by category">
            {galleryCategories.map((category) => (
              <button
                key={category}
                className={`filter-btn${selectedCategory === category ? " active" : ""}`}
                type="button"
                onClick={() => {
                  setSelectedCategory(category);
                  setLightboxIndex(-1);
                }}
                aria-pressed={selectedCategory === category}
              >
                {category}
              </button>
            ))}
          </nav>

          {filtered.length > 0 ? (
            <>
              <div className="gallery-grid" id="gallery-grid">
                {filtered.map((shot, index) => (
                  <button
                    className="gallery-item"
                    key={shot.filename}
                    onClick={() => setLightboxIndex(index)}
                    aria-label={`View screenshot: ${shot.alt}`}
                    type="button"
                  >
                    <div className="screenshot-frame gallery-frame">
                      <img src={shot.url} alt={shot.alt} loading="lazy" className="gallery-thumb" />
                      <div className="gallery-overlay" aria-hidden="true"><span className="gallery-zoom">⌕</span></div>
                    </div>
                    <p className="gallery-caption">{shot.alt}</p>
                  </button>
                ))}
              </div>
              <p className="gallery-empty" hidden={filtered.length > 0}>No screenshots in this category yet.</p>
            </>
          ) : (
            <div className="gallery-placeholder">
              <p>Screenshots are coming soon. Add images in public/img/screenshots to populate this showcase.</p>
            </div>
          )}
        </div>
      </section>

      <div className="modal" role="dialog" aria-modal="true" aria-label="Screenshot viewer" hidden={lightboxIndex < 0}>
        <div className="modal-overlay" onClick={() => setLightboxIndex(-1)}></div>
        <div className="modal-content">
          <button className="modal-close" onClick={() => setLightboxIndex(-1)} aria-label="Close screenshot viewer" type="button">&times;</button>
          <button
            className="modal-prev"
            aria-label="Previous screenshot"
            type="button"
            onClick={() => setLightboxIndex((current) => (current <= 0 ? filtered.length - 1 : current - 1))}
          >
            ←
          </button>
          {lightboxIndex >= 0 && filtered[lightboxIndex] ? (
            <img className="modal-image" src={filtered[lightboxIndex].url} alt={filtered[lightboxIndex].alt} />
          ) : null}
          <button
            className="modal-next"
            aria-label="Next screenshot"
            type="button"
            onClick={() => setLightboxIndex((current) => (current >= filtered.length - 1 ? 0 : current + 1))}
          >
            →
          </button>
        </div>
      </div>
    </>
  );
}
