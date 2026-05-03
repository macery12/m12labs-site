const siteUrl = import.meta.env.VITE_SITE_URL || "https://m12labs.net";
const buildId = typeof __BUILD_ID__ !== "undefined" ? __BUILD_ID__ : "dev";

const withAssetVersion = (url) => {
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}v=${encodeURIComponent(buildId)}`;
};

export const getScreenshotUrl = (filename) => withAssetVersion(`/img/screenshots/${filename}`);

export const siteConfig = {
  siteUrl,
  discordRouteUrl: new URL("/discord", siteUrl).toString(),
  docsUrl: import.meta.env.VITE_DOCS_URL || "https://docs.m12labs.net",
  resendUrl: import.meta.env.VITE_RESEND_URL || "https://resend.com",
  discordUrl: import.meta.env.VITE_DISCORD_URL || "https://discord.gg/fVJZtqKYrc",
  githubUrl: import.meta.env.VITE_GITHUB_URL || "https://github.com/macery12/M12labs",
  panelRepoUrl: "https://github.com/macery12/M12Labs",
  extensionsRepoUrl: "https://github.com/macery12/M12Labs-Extensions",
  installerRepoUrl: "https://github.com/macery12/M12Labs-installer",
  extensionsRegistryUrl: "https://raw.githubusercontent.com/macery12/M12Labs-Extensions/refs/heads/main/registry.json"
};

const categoryMap = {
  billing: "Payments & Checkout",
  plans: "Billing Logic",
  extensions: "Extensions & Modules",
  themes: "UI & Theme Controls"
};

const screenshotMeta = {
  server_configuration_checkout: {
    category: "Payments & Checkout",
    title: "Checkout Example",
    summary: "Select a node, billing cycle, and software  — then review your order before checkout.",
    highlight: "Node, cycle, and software selection in one flow"
  },
  payment_integrations: {
    category: "Payments & Checkout",
    title: "Payment Integrations",
    summary: "Connect and manage Stripe, Mollie, and PayPal from one payment settings screen.",
    highlight: "Multi-provider billing integrations"
  },
  billing_dashboard: {
    title: "Billing Dashboard",
    summary: "A high-level look at billing health, renewals, and revenue activity in one dashboard.",
    highlight: "Built for fast operational visibility"
  },
  extensions_catalog: {
    category: "Extensions & Modules",
    title: "Extensions Catalog",
    summary: "Browse installable panel extensions, check compatibility, and manage module availability from one catalog view.",
    highlight: "Trusted extension discovery and management"
  },
  billing_cycle_rules: {
    title: "Billing Cycle Rules",
    summary: "Define billing lengths and pricing adjustment steps for short, standard, and long-term plans.",
    highlight: "Flexible cycle multipliers and pricing rules"
  },
  email_configuration: {
    category: "Email Delivery",
    title: "Email Configuration",
    summary: "Set up SMTP or Resend delivery, manage sender identity, and configure mail behavior from one screen.",
    highlight: "Built-in SMTP and Resend support"
  },
  mods_plugins_browser: {
    category: "Mods & Plugins",
    title: "Mods & Plugins Browser",
    summary: "Browse supported plugins from integrated providers with filtering, search, and install-ready listings.",
    highlight: "Modrinth, CurseForge, and plugin discovery workflows"
  }
};

const screenshotFiles = [
  "server_configuration_checkout.png",
  "payment_integrations.png",
  "billing_dashboard.png",
  "extensions_catalog.png",
  "billing_cycle_rules.png",
  "email_configuration.png",
  "mods_plugins_browser.png"
];

export const screenshots = screenshotFiles.map((filename) => {
  const stem = filename.replace(/\.[^.]+$/, "");
  const prefix = filename.split("_")[0];
  const meta = screenshotMeta[stem] || {};
  const category = meta.category || categoryMap[prefix] || "Miscellaneous";
  const alt = meta.title || stem.replaceAll("_", " ").replace(/\b\w/g, (m) => m.toUpperCase());

  return {
    filename,
    category,
    alt,
    title: meta.title || alt,
    summary: meta.summary || "Product showcase screenshot from M12Labs.",
    highlight: meta.highlight || category,
    url: getScreenshotUrl(filename)
  };
});

export const galleryCategories = [
  "All",
  ...Array.from(new Set(screenshots.map((shot) => shot.category)))
];
