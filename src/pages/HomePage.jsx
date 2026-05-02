import { useEffect, useState } from "react";
import PageMeta from "../components/PageMeta";
import { siteConfig } from "../data/site";

export default function HomePage() {
  const [extensions, setExtensions] = useState([]);
  const [extensionsLoading, setExtensionsLoading] = useState(true);
  const [extensionsError, setExtensionsError] = useState("");

  useEffect(() => {
    const abortController = new AbortController();

    const loadExtensions = async () => {
      try {
        setExtensionsLoading(true);
        const response = await fetch(siteConfig.extensionsRegistryUrl, { signal: abortController.signal });

        if (!response.ok) {
          throw new Error(`Failed to load extensions registry: ${response.status}`);
        }

        const data = await response.json();
        const packages = Array.isArray(data?.packages) ? data.packages : [];
        setExtensions(packages);
      } catch (error) {
        if (error.name === "AbortError") {
          return;
        }

        setExtensionsError("Unable to load live extensions right now.");
      } finally {
        setExtensionsLoading(false);
      }
    };

    loadExtensions();

    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <>
      <PageMeta
        title="M12Labs - Extensions, Installer, Payments, Integrations"
        description="M12Labs focuses on production-ready extensions, an automated Linux installer, multi-provider billing, and built-in mod/plugin integrations."
      />

      <section className="hero section" aria-labelledby="hero-heading">
        <div className="container hero-inner">
          <div className="hero-text">
            <h1 className="hero-heading" id="hero-heading">
              One panel stack, rebuilt for real hosting workflows.
            </h1>
            <p className="hero-sub">
              M12Labs now centers on extension delivery, automated install paths, multi-provider checkout,
              and first-class mod and plugin tooling for modern game hosting teams.
            </p>
            <div className="hero-actions">
              <a href="/platform" className="btn btn-primary btn-lg">Explore Platform</a>
              <a href={siteConfig.extensionsRepoUrl} className="btn btn-secondary btn-lg" target="_blank" rel="noopener noreferrer">Browse Extensions</a>
              <a href={siteConfig.installerRepoUrl} className="btn btn-ghost btn-lg" target="_blank" rel="noopener noreferrer">Installer Guide</a>
            </div>
          </div>
          <div className="hero-visual">
            <div className="screenshot-frame">
              <img src="/img/screenshots/billing_overview.png" alt="M12Labs billing health and revenue dashboard" className="hero-screenshot" loading="eager" />
            </div>
          </div>
        </div>

        <div className="quick-facts" role="list" aria-label="Key features">
          <div className="quick-fact" role="listitem"><span className="qf-icon" aria-hidden="true">🧩</span><span>Extension Registry</span></div>
          <div className="quick-fact" role="listitem"><span className="qf-icon" aria-hidden="true">🐧</span><span>Auto Linux Installer</span></div>
          <div className="quick-fact" role="listitem"><span className="qf-icon" aria-hidden="true">💳</span><span>Stripe + Mollie + PayPal</span></div>
          <div className="quick-fact" role="listitem"><span className="qf-icon" aria-hidden="true">🛠️</span><span>Mods + Plugins Built-In</span></div>
        </div>
      </section>

      <section className="feature-row section" aria-labelledby="feature-extension-heading">
        <div className="container feature-row-inner">
          <div className="feature-row-text">
            <span className="version-tag">M12Labs Extensions</span>
            <h2 id="feature-extension-heading" className="feature-row-heading">A custom-built extension system that ships fast and installs clean.</h2>
            <ul className="feature-bullets">
              <li>Signed package registry with archive checksums and versioned release metadata.</li>
              <li>One-command publish flow builds, hashes, and indexes new extension releases.</li>
              <li>Install from admin UI, repository id, or local package file through Artisan.</li>
            </ul>
          </div>
          <div className="feature-row-visual">
            <div className="screenshot-frame">
              <img src="/img/screenshots/themes_overview.png" alt="M12Labs interface showing modular customization controls" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      <section className="feature-row feature-row--reversed section" aria-labelledby="feature-installer-heading">
        <div className="container feature-row-inner">
          <div className="feature-row-visual">
            <div className="screenshot-frame">
              <img src="/img/screenshots/plans_cycles.png" alt="Billing cycle controls and product configuration in M12Labs" loading="lazy" />
            </div>
          </div>
          <div className="feature-row-text">
            <span className="version-tag">Automated Installer</span>
            <h2 id="feature-installer-heading" className="feature-row-heading">From clean server to running panel in guided steps.</h2>
            <ul className="feature-bullets">
              <li>Bootstrap script clones or updates the installer and re-runs with elevated privileges.</li>
              <li>Interactive flow handles dependencies, panel files, DB setup, Laravel config, cron, and workers.</li>
              <li>Built for Linux hosts where speed and repeatability matter during rollout.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="feature-row section" aria-labelledby="feature-payments-heading">
        <div className="container feature-row-inner">
          <div className="feature-row-text">
            <span className="version-tag">Payment Stack</span>
            <h2 id="feature-payments-heading" className="feature-row-heading">Multi-provider billing without custom glue code.</h2>
            <ul className="feature-bullets">
              <li>Stripe, Mollie, and PayPal options available with modern integrations management.</li>
              <li>Order wizard, billing cycles, and revenue views are designed for subscription hosting.</li>
              <li>Supports cycle multipliers and renewal controls to tune margins and risk.</li>
            </ul>
          </div>
          <div className="feature-row-visual">
            <div className="screenshot-frame">
              <img src="/img/screenshots/billing_checkout.png" alt="M12Labs checkout and order review flow" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      <section className="feature-grid-section section" aria-labelledby="feature-grid-heading">
        <div className="container">
          <h2 className="section-heading" id="feature-grid-heading">Current Extensions We Offer</h2>
          <p className="section-sub">Powered by the official M12Labs Extensions repository, with every listed release reviewed and supported by M12Labs.</p>
          {extensionsError ? <p className="section-sub section-sub--warn">{extensionsError}</p> : null}
          {extensionsLoading ? <p className="section-sub">Loading extensions...</p> : null}
          <div className="feature-grid">
            {extensions.map((extension) => {
              const latest = extension.versions?.[0];
              const badge = latest?.version ? `v${latest.version}` : "Extension Package";

              return (
                <article className="feature-card" key={extension.id}>
                  <span className="feature-card-icon" aria-hidden="true">🧩</span>
                  <h3 className="feature-card-title">{extension.name || extension.id}</h3>
                  <p>{extension.description || "No description provided yet."}</p>
                  <span className="feature-card-badge">{badge}</span>
                </article>
              );
            })}
          </div>
          {!extensionsLoading && !extensions.length ? <p className="section-sub">No extensions found in the live registry.</p> : null}
        </div>
      </section>

      <section className="screenshots-callout section" aria-labelledby="ss-callout-heading">
        <div className="container screenshots-callout-inner">
          <h2 className="section-heading" id="ss-callout-heading">See real product screens</h2>
          <p className="section-sub">Checkout, billing dashboard, cycles, and theme tooling in one place.</p>
          <a href="/showcase" className="btn btn-primary btn-lg">View Showcase</a>
        </div>
      </section>

      <section className="quality-section section" aria-labelledby="quality-heading">
        <div className="container quality-inner">
          <div className="quality-text">
            <h2 className="section-heading" id="quality-heading">Release quality without release drag</h2>
            <p className="quality-body">Repositories and release tooling are structured for repeatability: manifest-driven packaging, checksum validation, and clear install paths.</p>
            <ul className="quality-list">
              <li><span className="quality-check" aria-hidden="true">✔</span>Manifest + archive hash validation in the extension registry.</li>
              <li><span className="quality-check" aria-hidden="true">✔</span>Installer steps split into clear dependency, DB, Laravel, and worker phases.</li>
              <li><span className="quality-check" aria-hidden="true">✔</span>Payment and mod modules exposed via explicit config toggles.</li>
            </ul>
          </div>
          <div className="quality-visual" aria-hidden="true">
            <div className="quality-badge"><span className="quality-badge-icon">🚀</span><span className="quality-badge-label">Ship Faster, Break Less</span></div>
          </div>
        </div>
      </section>

      <section className="cta-band section" aria-labelledby="cta-heading">
        <div className="container cta-inner">
          <h2 className="cta-heading" id="cta-heading">Build your stack around M12Labs.</h2>
          <p className="cta-sub">Start with the installer, layer in extensions, then scale billing and integrations.</p>
          <div className="cta-actions">
            <a href={siteConfig.installerRepoUrl} className="btn btn-primary btn-lg" target="_blank" rel="noopener noreferrer">Run Installer</a>
            <a href="/discord" className="btn btn-secondary btn-lg">Or Join the Discord</a>
          </div>
        </div>
      </section>
    </>
  );
}
