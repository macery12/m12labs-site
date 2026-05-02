import PageMeta from "../components/PageMeta";
import { siteConfig } from "../data/site";

export default function FeaturesPage() {
  return (
    <>
      <PageMeta
        title="Platform - M12Labs"
        description="Discover the M12Labs platform focus: extension ecosystem, automatic installer, multi-provider billing, and built-in mod/plugin integrations."
      />

      <div className="page-header section">
        <div className="container">
          <h1 className="page-heading">Platform</h1>
          <p className="page-sub">Four product pillars now drive M12Labs: extensions, installer automation, payment coverage, and integrations.</p>
        </div>
      </div>

      <section className="features-category section" aria-labelledby="cat-ext">
        <div className="container features-category-inner">
          <div className="features-category-text">
            <span className="category-label">Extensions</span>
            <h2 id="cat-ext" className="section-heading">A custom-built extension system designed for fast releases.</h2>
            <p className="section-body">The M12Labs extension system publishes versioned packages with metadata and checksums consumed directly by panel install flows.</p>
            <ul className="features-list">
              <li><span className="features-list-icon" aria-hidden="true">✦</span><div><strong>Manifest + checksum pipeline</strong><p>Every package archive is indexed with SHA-256 integrity metadata.</p></div></li>
              <li><span className="features-list-icon" aria-hidden="true">✦</span><div><strong>CLI + admin install routes</strong><p>Install by extension id, release version, or local package artifact.</p></div></li>
              <li><span className="features-list-icon" aria-hidden="true">✦</span><div><strong>Live extension catalog</strong><p>Powered by the official M12Labs Extensions repository, with every listed release reviewed and supported by M12Labs.</p></div></li>
            </ul>
          </div>
          <div className="features-category-visual"><div className="screenshot-frame"><img src="/img/screenshots/themes_overview.png" alt="M12Labs extensible interface and module controls" loading="lazy" /></div></div>
        </div>
      </section>

      <section className="features-category features-category--alt section" aria-labelledby="cat-installer">
        <div className="container features-category-inner">
          <div className="features-category-visual"><div className="screenshot-frame"><img src="/img/screenshots/plans_pricing.png" alt="Plans and pricing configuration in M12Labs" loading="lazy" /></div></div>
          <div className="features-category-text">
            <span className="category-label">Automatic Installer</span>
            <h2 id="cat-installer" className="section-heading">Guided setup for full panel lifecycle tasks.</h2>
            <p className="section-body">The Linux installer coordinates dependencies, panel files, database bootstrap, Laravel setup, cron wiring, and worker service installation.</p>
            <ul className="features-list">
              <li><span className="features-list-icon" aria-hidden="true">✦</span><div><strong>Quick bootstrap entrypoint</strong><p>Single command pulls and launches the installer.</p></div></li>
              <li><span className="features-list-icon" aria-hidden="true">✦</span><div><strong>Interactive and unattended modes</strong><p>Choose prompts for guided use or flags for scripted deployment.</p></div></li>
              <li><span className="features-list-icon" aria-hidden="true">✦</span><div><strong>Server-focused defaults</strong><p>Designed for production nodes running PHP, MariaDB, NGINX, Redis, and workers.</p></div></li>
            </ul>
          </div>
        </div>
      </section>

      <section className="features-category section" aria-labelledby="cat-billing">
        <div className="container features-category-inner">
          <div className="features-category-text">
            <span className="category-label">Multi Payment Providers</span>
            <h2 id="cat-billing" className="section-heading">Billing that supports how your customers pay.</h2>
            <p className="section-body">M12Labs billing supports Stripe, Mollie, and PayPal flows, with integration credentials managed in admin settings for production operations.</p>
            <ul className="features-list">
              <li><span className="features-list-icon" aria-hidden="true">✦</span><div><strong>Checkout wizard</strong><p>Structured order flow from plan selection through payment and confirmation.</p></div></li>
              <li><span className="features-list-icon" aria-hidden="true">✦</span><div><strong>Cycle and multiplier controls</strong><p>Day-based pricing and multiplier steps for granular billing models.</p></div></li>
              <li><span className="features-list-icon" aria-hidden="true">✦</span><div><strong>Operational dashboards</strong><p>Revenue, failed payments, and renewal forecasting in one view.</p></div></li>
            </ul>
          </div>
          <div className="features-category-visual"><div className="screenshot-frame"><img src="/img/screenshots/billing_overview.png" alt="Billing overview and payment health dashboard in M12Labs" loading="lazy" /></div></div>
        </div>
      </section>

      <section className="features-category features-category--alt section" aria-labelledby="cat-integrations">
        <div className="container features-category-inner">
          <div className="features-category-visual"><div className="screenshot-frame"><img src="/img/screenshots/themes_editor.png" alt="M12Labs system settings and module configuration interface" loading="lazy" /></div></div>
          <div className="features-category-text">
            <span className="category-label">Mod &amp; Plugin Integrations</span>
            <h2 id="cat-integrations" className="section-heading">Built-in support for high-traffic ecosystem sources.</h2>
            <p className="section-body">Integration modules include Modrinth and CurseForge for mods, plus Spiget support for plugin catalogs, with source configuration and limits built in.</p>
            <ul className="features-list">
              <li><span className="features-list-icon" aria-hidden="true">✦</span><div><strong>Multi-source support</strong><p>Use Modrinth by default and add CurseForge with API credentials.</p></div></li>
              <li><span className="features-list-icon" aria-hidden="true">✦</span><div><strong>Plugin discovery path</strong><p>Spiget integration enables Spigot plugin workflows from the panel side.</p></div></li>
              <li><span className="features-list-icon" aria-hidden="true">✦</span><div><strong>Cache and limits tuning</strong><p>Control API caching, page sizes, and download size constraints per environment.</p></div></li>
            </ul>
          </div>
        </div>
      </section>

      <section className="cta-band section" aria-labelledby="features-cta-heading">
        <div className="container cta-inner">
          <h2 className="cta-heading" id="features-cta-heading">Want to build on this stack now?</h2>
          <p className="cta-sub">Start with installer setup, then pull extension packages and enable integrations.</p>
          <div className="cta-actions">
            <a href={siteConfig.installerRepoUrl} className="btn btn-primary btn-lg" target="_blank" rel="noopener noreferrer">Open Installer</a>
            <a href={siteConfig.extensionsRepoUrl} className="btn btn-secondary btn-lg" target="_blank" rel="noopener noreferrer">Open Extensions</a>
          </div>
        </div>
      </section>
    </>
  );
}
