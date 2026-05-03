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

  const featuredShot = filtered[0] || screenshots[0];
  const categoryCount = galleryCategories.filter((category) => category !== "All").length;

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
        description="A closer look at M12Labs interface flows across billing, pricing, and UI customization."
      />

      <section className="showcase-hero section" aria-labelledby="showcase-heading">
        <div className="container showcase-hero-inner">
          <div className="showcase-copy">
            <span className="category-label">Product Showcase</span>
            <h1 className="page-heading showcase-heading" id="showcase-heading">See how M12Labs looks in real use.</h1>
            <p className="page-sub showcase-sub">Explore screenshots across billing, pricing logic, and interface customization to get a feel for the panel before you set anything up.</p>
            <div className="showcase-stats" role="list" aria-label="Showcase stats">
              <div className="showcase-stat" role="listitem"><strong>{screenshots.length}</strong><span>live screenshots</span></div>
              <div className="showcase-stat" role="listitem"><strong>{categoryCount}</strong><span>product areas</span></div>
              <div className="showcase-stat" role="listitem"><strong>{selectedCategory}</strong><span>current view</span></div>
            </div>
          </div>

          {featuredShot ? (
            <button className="showcase-spotlight" type="button" onClick={() => setLightboxIndex(0)}>
              <div className="showcase-spotlight-copy">
                <span className="showcase-kicker">Featured Screen</span>
                <h2>{featuredShot.title}</h2>
                <p>{featuredShot.summary}</p>
                <div className="showcase-spotlight-meta">
                  <span className="feature-card-badge">{featuredShot.category}</span>
                  <span className="showcase-highlight">{featuredShot.highlight}</span>
                </div>
              </div>
              <div className="screenshot-frame showcase-spotlight-frame">
                <img src={featuredShot.url} alt={featuredShot.alt} loading="eager" />
              </div>
            </button>
          ) : null}
        </div>
      </section>

      <section className="gallery-section section" aria-labelledby="gallery-heading">
        <div className="container">
          <div className="gallery-header">
            <div>
              <h2 className="section-heading" id="gallery-heading">Browse the gallery</h2>
              <p className="section-sub">Filter by product area and open any screen for a closer look.</p>
            </div>
            <p className="gallery-count">{filtered.length} screen{filtered.length === 1 ? "" : "s"} in view</p>
          </div>

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
                      <div className="gallery-overlay" aria-hidden="true"><span className="gallery-zoom">Open</span></div>
                    </div>
                    <div className="gallery-card-body">
                      <div className="gallery-card-topline">
                        <span className="feature-card-badge">{shot.category}</span>
                        <span className="gallery-highlight">{shot.highlight}</span>
                      </div>
                      <h3 className="gallery-card-title">{shot.title}</h3>
                      <p className="gallery-caption">{shot.summary}</p>
                    </div>
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
            <div className="modal-body">
              <div className="modal-image-wrap">
                <img className="modal-image" src={filtered[lightboxIndex].url} alt={filtered[lightboxIndex].alt} />
              </div>
              <div className="modal-meta">
                <div className="modal-meta-topline">
                  <span className="feature-card-badge">{filtered[lightboxIndex].category}</span>
                  <span className="modal-counter">{lightboxIndex + 1} / {filtered.length}</span>
                </div>
                <h2 className="modal-title">{filtered[lightboxIndex].title}</h2>
                <p className="modal-summary">{filtered[lightboxIndex].summary}</p>
                <p className="modal-highlight">{filtered[lightboxIndex].highlight}</p>
              </div>
            </div>
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
