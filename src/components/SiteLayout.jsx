import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { siteConfig } from "../data/site";

function GitHubIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

export default function SiteLayout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const closeOnOutsideClick = (event) => {
      if (!event.target.closest(".nav")) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("click", closeOnOutsideClick);
    return () => document.removeEventListener("click", closeOnOutsideClick);
  }, []);

  return (
    <>
      <header className="nav-wrapper" role="banner">
        <nav className="nav container" aria-label="Main navigation">
          <NavLink to="/" className="nav-brand" aria-label="M12Labs home">
            <img src="/img/logo.png" alt="M12Labs logo" className="nav-logo" width="32" height="32" />
            <span className="nav-brand-name">M12Labs</span>
          </NavLink>

          <button
            className="nav-hamburger"
            onClick={() => setMenuOpen((current) => !current)}
            aria-controls="nav-links"
            aria-expanded={menuOpen}
            aria-label="Toggle navigation"
            type="button"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <ul className={`nav-links${menuOpen ? " open" : ""}`} id="nav-links" role="list">
            <li><NavLink to="/" className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}>Home</NavLink></li>
            <li><NavLink to="/platform" className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}>Platform</NavLink></li>
            <li><NavLink to="/showcase" className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}>Showcase</NavLink></li>
            <li><NavLink to="/support" className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}>Support</NavLink></li>
          </ul>

          <div className={`nav-actions${menuOpen ? " open" : ""}`}>
            <a href={siteConfig.githubUrl} className="nav-github" target="_blank" rel="noopener noreferrer" aria-label="GitHub repository">
              <GitHubIcon />
            </a>
            <a href={siteConfig.docsUrl} className="btn btn-primary" target="_blank" rel="noopener noreferrer">Docs</a>
            <a href={siteConfig.installerRepoUrl} className="btn btn-secondary" target="_blank" rel="noopener noreferrer">Installer</a>
          </div>
        </nav>
      </header>

      <main id="main-content">{children}</main>

      <footer className="footer" role="contentinfo">
        <div className="container footer-inner">
          <div className="footer-brand">
            <img src="/img/logo.png" alt="M12Labs logo" width="28" height="28" />
            <span>M12Labs</span>
          </div>
          <nav className="footer-links" aria-label="Footer navigation">
            <a href={siteConfig.discordRouteUrl} className="footer-link">Discord</a>
            <a href={siteConfig.panelRepoUrl} className="footer-link" target="_blank" rel="noopener noreferrer">Panel</a>
            <a href={siteConfig.extensionsRepoUrl} className="footer-link" target="_blank" rel="noopener noreferrer">Extensions</a>
            <a href={siteConfig.installerRepoUrl} className="footer-link" target="_blank" rel="noopener noreferrer">Installer</a>
            <a href={siteConfig.docsUrl} className="footer-link" target="_blank" rel="noopener noreferrer">Docs</a>
            <button
              type="button"
              className="footer-link footer-link-btn"
              onClick={() => window.dispatchEvent(new Event("open-cookie-preferences"))}
            >
              Cookie Preferences
            </button>
          </nav>
          <p className="footer-copy">&copy; M12Labs. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
