import { showcaseScreenshotFiles } from "./showcaseScreenshots";

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
  account: "Account & Security",
  admin: "Admin Panel",
  billing: "Payments & Checkout",
  email: "Email Delivery",
  extensions: "Extensions & Modules",
  minecraft: "Game Servers",
  mods: "Mods & Plugins",
  payment: "Payments & Checkout",
  plans: "Billing Logic",
  server: "Payments & Checkout",
  themes: "UI & Theme Controls",
  user: "Client Area"
};

const screenshotMeta = {
  "account-security": {
    category: "Account & Security",
    title: "Account Security",
    summary: "Manage login protection and account-level security settings from the client area.",
    highlight: "User security controls"
  },
  "admin-billing-categories": {
    category: "Admin Panel",
    title: "Billing Categories",
    summary: "Organize purchasable services into clear billing categories for the storefront.",
    highlight: "Admin product organization"
  },
  "admin-egg": {
    category: "Admin Panel",
    title: "Egg Configuration",
    summary: "Review and manage server software options from the admin panel.",
    highlight: "Server software management"
  },
  "admin-servers": {
    category: "Admin Panel",
    title: "Server Administration",
    summary: "View and manage hosted servers from a centralized admin screen.",
    highlight: "Operational server overview"
  },
  "admin-wings-rs": {
    category: "Admin Panel",
    title: "Wings-rs Node Tools",
    summary: "Manage Wings-rs related node settings and server infrastructure details.",
    highlight: "Node management workflow"
  },
  "billing_cycle_rules": {
    category: "Billing Logic",
    title: "Billing Cycle Rules",
    summary: "Define billing lengths and pricing adjustment steps for short, standard, and long-term plans.",
    highlight: "Flexible cycle multipliers and pricing rules"
  },
  "billing_dashboard": {
    category: "Payments & Checkout",
    title: "Billing Dashboard",
    summary: "A high-level look at billing health, renewals, and revenue activity in one dashboard.",
    highlight: "Built for fast operational visibility"
  },
  "email_configuration": {
    category: "Email Delivery",
    title: "Email Configuration",
    summary: "Set up SMTP or Resend delivery, manage sender identity, and configure mail behavior from one screen.",
    highlight: "Built-in SMTP and Resend support"
  },
  "extensions_catalog": {
    category: "Extensions & Modules",
    title: "Extensions Catalog",
    summary: "Browse installable panel extensions, check compatibility, and manage module availability from one catalog view.",
    highlight: "Trusted extension discovery and management"
  },
  "minecraft-vanilla": {
    category: "Game Servers",
    title: "Minecraft Vanilla Setup",
    summary: "Choose a Minecraft server option and prepare it for deployment from the panel flow.",
    highlight: "Game server deployment"
  },
  "mods_plugins_browser": {
    category: "Mods & Plugins",
    title: "Mods & Plugins Browser",
    summary: "Browse supported plugins from integrated providers with filtering, search, and install-ready listings.",
    highlight: "Modrinth, CurseForge, and plugin discovery workflows"
  },
  "payment_integrations": {
    category: "Payments & Checkout",
    title: "Payment Integrations",
    summary: "Connect and manage both Stripe and PayPal from one payment settings screen.",
    highlight: "Multi-provider billing integrations"
  },
  "server_configuration_checkout": {
    category: "Payments & Checkout",
    title: "Checkout Example",
    summary: "Select a node, billing cycle, and software  — then review your order before checkout.",
    highlight: "Node, cycle, and software selection in one flow"
  },
  "user-dashboard": {
    category: "Client Area",
    title: "User Dashboard",
    summary: "Give clients a clear landing page for account, service, and billing activity.",
    highlight: "Client-facing overview"
  }
};

const titleFromStem = (stem) =>
  stem
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

const getDefaultCategory = (stem) => {
  const [prefix] = stem.toLowerCase().split(/[-_]+/);
  return categoryMap[prefix] || "Miscellaneous";
};

export const screenshots = showcaseScreenshotFiles.map((filename) => {
  const stem = filename.replace(/\.[^.]+$/, "");
  const meta = screenshotMeta[stem.toLowerCase()] || {};
  const title = meta.title || titleFromStem(stem);
  const category = meta.category || getDefaultCategory(stem);

  return {
    filename,
    category,
    alt: meta.alt || `${title} screenshot`,
    title,
    summary: meta.summary || "Product showcase screenshot from M12Labs.",
    highlight: meta.highlight || category,
    url: getScreenshotUrl(filename)
  };
});

export const galleryCategories = [
  "All",
  ...Array.from(new Set(screenshots.map((shot) => shot.category)))
];
