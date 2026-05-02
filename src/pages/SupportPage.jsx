import { useState } from "react";
import PageMeta from "../components/PageMeta";
import { siteConfig } from "../data/site";

const faqItems = [
  {
    question: "Where should I start first: panel, installer, or extensions?",
    answer: (
      <>
        For new deployments, start with the installer repository. For existing panel nodes, start with
        extensions and enable modules after validating your environment.
      </>
    )
  },
  {
    question: "How do I get help quickly?",
    answer: (
      <>
        The quickest route is the <a href="/discord">Discord server</a>. For bugs and feature requests, use
        <a href={`${siteConfig.panelRepoUrl}/issues`} target="_blank" rel="noopener noreferrer"> panel issues</a> or
        extension-specific issues in the extension repository.
      </>
    )
  },
  {
    question: "Which payment providers are currently supported?",
    answer: "Stripe, Mollie, and PayPal paths are available, with integrations managed through admin configuration."
  },
  {
    question: "Which mod and plugin sources are integrated?",
    answer: "Modrinth and CurseForge are supported for mod workflows, and Spiget support is available for plugin-source integrations."
  }
];

export default function SupportPage() {
  const [openFaq, setOpenFaq] = useState(-1);

  return (
    <>
      <PageMeta
        title="Support - M12Labs"
        description="Support resources for M12Labs panel, extensions, installer, and integrations."
      />

      <div className="page-header section">
        <div className="container">
          <h1 className="page-heading">Support</h1>
          <p className="page-sub">Choose the right support path for panel setup, extensions, billing, or integrations.</p>
        </div>
      </div>

      <section className="support-channels section" aria-labelledby="support-channels-heading">
        <div className="container">
          <h2 className="section-heading" id="support-channels-heading">Get help</h2>
          <div className="support-cards">
            <article className="support-card"><span className="support-card-icon" aria-hidden="true">💬</span><h3 className="support-card-title">Discord Community</h3><p className="support-card-body">Fastest route for install blockers, extension questions, and integration troubleshooting.</p><a href="/discord" className="btn btn-primary">Join Discord</a></article>
            <article className="support-card"><span className="support-card-icon" aria-hidden="true">🧩</span><h3 className="support-card-title">Extensions Repository</h3><p className="support-card-body">Package metadata, release history, and extension source for contributed modules.</p><a href={siteConfig.extensionsRepoUrl} className="btn btn-secondary" target="_blank" rel="noopener noreferrer">Open Extensions</a></article>
            <article className="support-card"><span className="support-card-icon" aria-hidden="true">🐧</span><h3 className="support-card-title">Installer Repository</h3><p className="support-card-body">Bootstrap scripts, installation steps, and automation behavior for Linux deployments.</p><a href={siteConfig.installerRepoUrl} className="btn btn-secondary" target="_blank" rel="noopener noreferrer">Open Installer</a></article>
            <article className="support-card"><span className="support-card-icon" aria-hidden="true">📖</span><h3 className="support-card-title">Documentation</h3><p className="support-card-body">General docs for panel operation, module behavior, and release updates.</p><a href={siteConfig.docsUrl} className="btn btn-secondary" target="_blank" rel="noopener noreferrer">Read Docs</a></article>
          </div>
        </div>
      </section>

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

    </>
  );
}
