import PageMeta from "../components/PageMeta";
import { getScreenshotUrl, siteConfig } from "../data/site";

export default function FeaturesPage() {
  return (
    <>
      <PageMeta
        title="Platform - M12Labs"
        description="Discover the M12Labs platform focus: extension ecosystem, full email support, multi-provider billing, and built-in mod/plugin integrations."
      />

      <div className="page-header section">
        <div className="container">
          <h1 className="page-heading">Platform</h1>
          <p className="page-sub">Four product pillars now drive M12Labs: extensions, email delivery, payment coverage, and integrations.</p>
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
          <div className="features-category-visual"><div className="screenshot-frame"><img src={getScreenshotUrl("extensions_catalog.png")} alt="M12Labs extensions catalog with installable module listings" loading="lazy" /></div></div>
        </div>
      </section>

      <section className="features-category features-category--alt section" aria-labelledby="cat-email">
        <div className="container features-category-inner">
          <div className="features-category-visual"><div className="screenshot-frame"><img src={getScreenshotUrl("email_configuration.png")} alt="M12Labs email configuration with SMTP and Resend delivery options" loading="lazy" /></div></div>
          <div className="features-category-text">
            <span className="category-label">Email Delivery</span>
            <h2 id="cat-email" className="section-heading">Full email support with SMTP or Resend.</h2>
            <p className="section-body">Configure transactional and notification mail with standard SMTP providers or Resend service integration, depending on your stack and deliverability needs.</p>
            <ul className="features-list">
              <li><span className="features-list-icon" aria-hidden="true">✦</span><div><strong>SMTP-ready configuration</strong><p>Use your preferred SMTP host with full control over sender, encryption, and credentials.</p></div></li>
              <li><span className="features-list-icon" aria-hidden="true">✦</span><div><strong>Resend service support</strong><p>Connect through <a href={siteConfig.resendUrl} target="_blank" rel="noopener noreferrer">Resend</a> for modern API-driven mail delivery, with a strong free tier for startups and self-hosters getting started.</p></div></li>
              <li><span className="features-list-icon" aria-hidden="true">✦</span><div><strong>Custom email template editor</strong><p>Edit and tailor email templates for your own branding, tone, and notification needs.</p></div></li>
            </ul>
          </div>
        </div>
      </section>

      <section className="features-category section" aria-labelledby="cat-billing">
        <div className="container features-category-inner">
          <div className="features-category-text">
            <span className="category-label">Multi Payment Providers</span>
            <h2 id="cat-billing" className="section-heading">Billing that supports how your customers pay.</h2>
            <p className="section-body">M12Labs billing supports Stripe and PayPal flows, with integration credentials managed in admin settings for production operations.</p>
            <ul className="features-list">
              <li><span className="features-list-icon" aria-hidden="true">✦</span><div><strong>Checkout wizard</strong><p>Structured order flow from plan selection through payment and confirmation.</p></div></li>
              <li><span className="features-list-icon" aria-hidden="true">✦</span><div><strong>Cycle and multiplier controls</strong><p>Day-based pricing and multiplier steps for granular billing models.</p></div></li>
              <li><span className="features-list-icon" aria-hidden="true">✦</span><div><strong>Operational dashboards</strong><p>Revenue, failed payments, and renewal forecasting in one view.</p></div></li>
            </ul>
          </div>
          <div className="features-category-visual"><div className="screenshot-frame"><img src={getScreenshotUrl("billing_dashboard.png")} alt="Billing overview and payment health dashboard in M12Labs" loading="lazy" /></div></div>
        </div>
      </section>

      <section className="features-category features-category--alt section" aria-labelledby="cat-integrations">
        <div className="container features-category-inner">
          <div className="features-category-visual"><div className="screenshot-frame"><img src={getScreenshotUrl("mods_plugins_browser.png")} alt="M12Labs mods and plugins browser with searchable plugin listings" loading="lazy" /></div></div>
          <div className="features-category-text">
            <span className="category-label">Mod &amp; Plugin Integrations</span>
            <h2 id="cat-integrations" className="section-heading">Mods and plugins from the top sources, ready to install.</h2>
            <p className="section-body">Pull mods and modpacks from Modrinth and CurseForge, or browse plugins via Spigot — directly inside the panel with no manual downloads needed.</p>
            <ul className="features-list">
              <li><span className="features-list-icon" aria-hidden="true">✦</span><div><strong>Modrinth, CurseForge, and Spigot</strong><p>Search and install content from the most popular mod and plugin sources, with results surfaced directly in the panel.</p></div></li>
              <li><span className="features-list-icon" aria-hidden="true">✦</span><div><strong>Granular integration control</strong><p>Restrict access down to the nest or egg level — so you control exactly which server types can use each integration source.</p></div></li>
              <li><span className="features-list-icon" aria-hidden="true">✦</span><div><strong>API usage and rate monitoring</strong><p>Track request activity and rate limit status across providers to keep integrations running smoothly.</p></div></li>
            </ul>
          </div>
        </div>
      </section>

      <section className="cta-band section" aria-labelledby="features-cta-heading">
        <div className="container cta-inner">
          <h2 className="cta-heading" id="features-cta-heading">Ready to start your setup?</h2>
          <p className="cta-sub">Use our installer or docs to get started. Have any questions or get stuck? Join our Discord.</p>
          <div className="cta-actions">
            <a href={siteConfig.installerRepoUrl} className="btn btn-primary btn-lg" target="_blank" rel="noopener noreferrer">Open Installer</a>
            <a href={siteConfig.docsUrl} className="btn btn-secondary btn-lg" target="_blank" rel="noopener noreferrer">Open Docs</a>
            <a href={siteConfig.discordRouteUrl} className="btn btn-ghost btn-lg">Join Discord</a>
          </div>
        </div>
      </section>
    </>
  );
}
