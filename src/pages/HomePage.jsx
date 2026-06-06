import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageMeta from "../components/PageMeta";
import { getScreenshotUrl, siteConfig } from "../data/site";

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
        title="M12Labs"
        description="M12Labs is an all-in-one game hosting platform with streamlined automation, integrated billing, scalable server management, and extension support."
      />

      <section className="hero section" aria-labelledby="hero-heading">
        <div className="container hero-inner">
          <div className="hero-text">
            <h1 className="hero-heading" id="hero-heading">
              Built for self-hosters. Simple to start, easy to grow.
            </h1>
            <p className="hero-sub">
              M12Labs gives self-hosters a clean way to deploy, manage, and grow your servers with
              automated setup, a custom extension ecosystem, and built-in mod and plugin integrations.
            </p>
            <div className="hero-actions">
              <Link to="/platform" className="btn btn-primary btn-lg">Explore Platform</Link>
              <a href={siteConfig.installerRepoUrl} className="btn btn-ghost btn-lg" target="_blank" rel="noopener noreferrer">Installer Guide</a>
            </div>
          </div>
          <div className="hero-visual">
            <div className="screenshot-frame">
              <img src={getScreenshotUrl("billing_dashboard.png")} alt="M12Labs billing health and revenue dashboard" className="hero-screenshot" loading="eager" />
            </div>
          </div>
        </div>

        <div className="quick-facts" role="list" aria-label="Key features">
          <div className="quick-fact" role="listitem"><span className="qf-icon" aria-hidden="true">🧩</span><span>Extension Registry</span></div>
          <div className="quick-fact" role="listitem"><span className="qf-icon" aria-hidden="true">💰</span><span>Custom Node Pricing</span></div>
          <div className="quick-fact" role="listitem"><span className="qf-icon" aria-hidden="true">💳</span><span>Stripe + PayPal</span></div>
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
              <li>Install from admin UI, repository ID, or local package file through Artisan.</li>
            </ul>
          </div>
          <div className="feature-row-visual">
            <div className="screenshot-frame">
              <img src={getScreenshotUrl("extensions_catalog.png")} alt="M12Labs extensions catalog showing installable modules" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      <section className="feature-row feature-row--reversed section" aria-labelledby="feature-installer-heading">
        <div className="container feature-row-inner">
          <div className="feature-row-visual">
            <div className="screenshot-frame">
              <img src={getScreenshotUrl("billing_cycle_rules.png")} alt="Billing cycle rules and pricing adjustment settings in M12Labs" loading="lazy" />
            </div>
          </div>
          <div className="feature-row-text">
            <span className="version-tag">Pricing Controls</span>
            <h2 id="feature-installer-heading" className="feature-row-heading">Custom node pricing and fully configurable billing cycles.</h2>
            <ul className="feature-bullets">
              <li>Set per-node pricing rules so each machine can match its own cost profile and margin targets.</li>
              <li>Create flexible billing cycles like 30-day, 60-day, and 90-day terms, or define custom durations.</li>
              <li>Adjust cycle multipliers and pricing logic anytime to fit promotions, growth plans, or resource changes.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="feature-row section" aria-labelledby="feature-payments-heading">
        <div className="container feature-row-inner">
          <div className="feature-row-text">
            <span className="version-tag">Payment Stack</span>
            <h2 id="feature-payments-heading" className="feature-row-heading">Stripe and PayPal — all supported out of the box.</h2>
            <ul className="feature-bullets">
              <li>Connect your preferred payment provider from the admin settings with no extra setup.</li>
              <li>Built-in order flow, billing cycle management, and revenue tracking designed for hosting.</li>
              <li>Cycle multipliers and renewal controls let you adjust pricing and terms at any time.</li>
            </ul>
          </div>
          <div className="feature-row-visual">
            <div className="screenshot-frame">
              <img src={getScreenshotUrl("payment_integrations.png")} alt="M12Labs payment provider integration settings" loading="lazy" />
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
          <Link to="/showcase" className="btn btn-primary btn-lg">View Showcase</Link>
        </div>
      </section>

      <section className="quality-section section" aria-labelledby="quality-heading">
        <div className="container quality-inner">
          <div className="quality-text">
            <h2 className="section-heading" id="quality-heading">
              AI-assisted development, human-reviewed delivery
            </h2>

            <p className="quality-body">
              Some implementation work may be assisted by AI coding tools and language models,
              including cloud-based and self-hosted solutions, but every change is reviewed by
              a developer before release. We follow common security practices across coding,
              testing, and deployment workflows.
            </p>

            <ul className="quality-list">
              <li>
                <span className="quality-check" aria-hidden="true">✔</span>
                All AI-assisted output is reviewed and edited by maintainers before shipping.
              </li>
              <li>
                <span className="quality-check" aria-hidden="true">✔</span>
                Changes are validated with testing and release checks before deployment.
              </li>
              <li>
                <span className="quality-check" aria-hidden="true">✔</span>
                Common security practices are applied, including least-privilege access and dependency hygiene.
              </li>
            </ul>
          </div>

          <div className="quality-visual" aria-hidden="true">
            <div className="quality-badge">
              <span className="quality-badge-icon">🚀</span>
              <span className="quality-badge-label">AI-Assisted, Human-Reviewed</span>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-band section" aria-labelledby="cta-heading">
        <div className="container cta-inner">
          <h2 className="cta-heading" id="cta-heading">Build your stack around M12Labs.</h2>
          <p className="cta-sub">Start with the installer, layer in extensions, then scale billing and integrations.</p>
          <div className="cta-actions">
            <a href={siteConfig.installerRepoUrl} className="btn btn-primary btn-lg" target="_blank" rel="noopener noreferrer">Run Installer</a>
            <a href={siteConfig.discordRouteUrl} className="btn btn-secondary btn-lg">Or Join the Discord</a>
          </div>
        </div>
      </section>
    </>
  );
}
