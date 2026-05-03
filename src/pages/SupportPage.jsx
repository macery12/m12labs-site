import { useState } from "react";
import PageMeta from "../components/PageMeta";
import { siteConfig } from "../data/site";

const faqItems = [
  {
    question: "Where should I start?",
    answer: (
      <>
        Start with the <a href={siteConfig.installerRepoUrl} target="_blank" rel="noopener noreferrer">installer repository</a> — it walks you through bootstrapping a fresh deployment from scratch. If you prefer reading first, the <a href={siteConfig.docsUrl} target="_blank" rel="noopener noreferrer">docs</a> cover everything end to end. If you get stuck at any point, <a href={siteConfig.discordRouteUrl}>join the Discord</a> and someone can help you out.
      </>
    )
  },
  {
    question: "How do I install extensions?",
    answer: (
      <>
        Extensions can be installed directly through the panel under the Extensions section — browse the catalog, enable what you need, and the panel handles the rest. If you prefer a manual install or need to install outside of the UI, command-line instructions are available in the <a href={siteConfig.extensionsRepoUrl} target="_blank" rel="noopener noreferrer">extensions repository</a>.
      </>
    )
  },
  {
    question: "How do I get help quickly?",
    answer: (
      <>
        The fastest route is the <a href={siteConfig.discordRouteUrl}>Discord server</a>. For reproducible bugs or feature requests, open an issue in the <a href={`${siteConfig.panelRepoUrl}/issues`} target="_blank" rel="noopener noreferrer">panel repository</a>.
      </>
    )
  },
  {
    question: "Which payment providers are supported?",
    answer: "Stripe, Mollie, and PayPal are available out of the box. Payment provider settings are managed through the admin configuration area."
  },
  {
    question: "Which mod and plugin sources are integrated?",
    answer: "Modrinth and CurseForge are supported for mod workflows. Spiget is available for plugin-source integrations. Sources can be toggled per server from the admin panel."
  },
  {
    question: "How does billing work?",
    answer: "Billing cycles are fully customizable — you can set any cycle length from 1 to 365 days. The panel tracks renewals automatically based on your configured rules, and the billing dashboard gives you a live view of upcoming renewals and revenue activity."
  },
  {
    question: "How do I configure email notifications?",
    answer: (
      <>
        Email delivery is configured in the admin settings. You can connect via SMTP or use <a href={siteConfig.resendUrl} target="_blank" rel="noopener noreferrer">Resend</a> (free tier available). A custom email template editor lets you style outgoing messages to match your brand.
      </>
    )
  },
  {
    question: "What operating systems does the installer support?",
    answer: (
      <>
        The installer currently supports Ubuntu only. Debian support may be added in a future release, but differences in system dependencies are the primary blocker right now. Any further questions? <a href={siteConfig.discordRouteUrl}>Join the Discord</a> and we can help you directly.
      </>
    )
  }
];

export default function SupportPage() {
  const [openFaq, setOpenFaq] = useState(-1);

  return (
    <>
      <PageMeta
        title="FAQ & Support - M12Labs"
        description="Frequently asked questions and support resources for M12Labs panel, extensions, billing, and integrations."
      />

      <div className="page-header section">
        <div className="container">
          <h1 className="page-heading">FAQ &amp; Support</h1>
          <p className="page-sub">Common questions about setup, extensions, billing, and more — plus where to go if you need more help.</p>
        </div>
      </div>

      <section className="faq-section section" aria-labelledby="faq-heading">
        <div className="container faq-inner">
          <h2 className="section-heading" id="faq-heading">Frequently asked questions</h2>
          <dl className="faq-list">
            {faqItems.map((item, index) => {
              const isOpen = openFaq === index;
              return (
                <div className="faq-item" key={item.question}>
                  <dt className="faq-question">
                    <button
                      className="faq-btn"
                      aria-expanded={isOpen}
                      aria-controls={`faq-${index}`}
                      type="button"
                      onClick={() => setOpenFaq((current) => (current === index ? -1 : index))}
                    >
                      {item.question}
                      <span className="faq-icon" aria-hidden="true">+</span>
                    </button>
                  </dt>
                  <dd className="faq-answer" id={`faq-${index}`} hidden={!isOpen}>{item.answer}</dd>
                </div>
              );
            })}
          </dl>
        </div>
      </section>

      <section className="support-channels section" aria-labelledby="support-channels-heading">
        <div className="container">
          <h2 className="section-heading" id="support-channels-heading">Still need help?</h2>
          <div className="support-cards">
            <article className="support-card"><span className="support-card-icon" aria-hidden="true">💬</span><h3 className="support-card-title">Discord Community</h3><p className="support-card-body">Fastest route for install blockers, extension questions, and integration troubleshooting.</p><a href={siteConfig.discordRouteUrl} className="btn btn-primary">Join Discord</a></article>
            <article className="support-card"><span className="support-card-icon" aria-hidden="true">🧩</span><h3 className="support-card-title">Build Your Own Extension</h3><p className="support-card-body">Want to create your own extensions? Check out the repository documentation for package structure, metadata, and contribution guidelines.</p><a href={siteConfig.extensionsRepoUrl} className="btn btn-secondary" target="_blank" rel="noopener noreferrer">Open Extensions Repo</a></article>
            <article className="support-card"><span className="support-card-icon" aria-hidden="true">🐧</span><h3 className="support-card-title">Installer Repository</h3><p className="support-card-body">Bootstrap scripts, installation steps, and automation behavior for Linux deployments.</p><a href={siteConfig.installerRepoUrl} className="btn btn-secondary" target="_blank" rel="noopener noreferrer">Open Repo</a></article>
            <article className="support-card"><span className="support-card-icon" aria-hidden="true">📖</span><h3 className="support-card-title">Documentation</h3><p className="support-card-body">General docs for panel operation, module behavior, and release updates.</p><a href={siteConfig.docsUrl} className="btn btn-secondary" target="_blank" rel="noopener noreferrer">Read Docs</a></article>
          </div>
        </div>
      </section>

    </>
  );
}
