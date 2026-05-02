export const siteConfig = {
  siteUrl: import.meta.env.VITE_SITE_URL || "https://m12labs.net",
  docsUrl: import.meta.env.VITE_DOCS_URL || "https://docs.m12labs.net",
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
  themes: "UI & Theme Controls"
};

const screenshotFiles = [
  "billing_checkout.png",
  "billing_overview.png",
  "plans_cycles.png",
  "plans_pricing.png",
  "themes_editor.png",
  "themes_overview.png"
];

export const screenshots = screenshotFiles.map((filename) => {
  const prefix = filename.split("_")[0];
  const category = categoryMap[prefix] || "Miscellaneous";
  const alt = filename.replace(/\.[^.]+$/, "").replaceAll("_", " ").replace(/\b\w/g, (m) => m.toUpperCase());

  return {
    filename,
    category,
    alt,
    url: `/img/screenshots/${filename}`
  };
});

export const galleryCategories = [
  "All",
  ...Array.from(new Set(screenshots.map((shot) => shot.category)))
];
