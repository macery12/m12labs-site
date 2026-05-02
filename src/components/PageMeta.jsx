import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { siteConfig } from "../data/site";

const ensureMetaTag = (selector, attributes) => {
  let tag = document.head.querySelector(selector);
  if (!tag) {
    tag = document.createElement("meta");
    Object.entries(attributes).forEach(([key, value]) => {
      tag.setAttribute(key, value);
    });
    document.head.appendChild(tag);
  }
  return tag;
};

export default function PageMeta({ title, description }) {
  const location = useLocation();

  useEffect(() => {
    document.title = title;

    const descriptionTag = ensureMetaTag('meta[name="description"]', { name: "description" });
    descriptionTag.setAttribute("content", description);

    const ogTitleTag = ensureMetaTag('meta[property="og:title"]', { property: "og:title" });
    ogTitleTag.setAttribute("content", title);

    const ogDescriptionTag = ensureMetaTag('meta[property="og:description"]', { property: "og:description" });
    ogDescriptionTag.setAttribute("content", description);

    const ogTypeTag = ensureMetaTag('meta[property="og:type"]', { property: "og:type" });
    ogTypeTag.setAttribute("content", "website");

    const ogUrlTag = ensureMetaTag('meta[property="og:url"]', { property: "og:url" });
    ogUrlTag.setAttribute("content", `${siteConfig.siteUrl}${location.pathname}`);

    const ogImageTag = ensureMetaTag('meta[property="og:image"]', { property: "og:image" });
    ogImageTag.setAttribute("content", `${siteConfig.siteUrl}/img/og-image.png`);
  }, [title, description, location.pathname]);

  return null;
}
