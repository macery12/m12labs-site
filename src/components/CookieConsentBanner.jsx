import { useEffect, useState } from "react";
import { startClarity } from "../utils/telemetryClient.js";

const CONSENT_KEY = "m12labs_cookie_consent";

function getStoredConsent() {
  try {
    return window.localStorage.getItem(CONSENT_KEY);
  } catch {
    return null;
  }
}

function setStoredConsent(value) {
  try {
    window.localStorage.setItem(CONSENT_KEY, value);
  } catch {
    // Ignore storage errors and continue gracefully.
  }
}

export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = getStoredConsent();

    if (consent === "accepted") {
      startClarity();
      setVisible(false);
      return;
    }

    setVisible(consent !== "rejected");
  }, []);

  useEffect(() => {
    const openPreferences = () => setVisible(true);
    window.addEventListener("open-cookie-preferences", openPreferences);

    return () => {
      window.removeEventListener("open-cookie-preferences", openPreferences);
    };
  }, []);

  const acceptAnalytics = () => {
    setStoredConsent("accepted");
    startClarity();
    setVisible(false);
  };

  const rejectAnalytics = () => {
    setStoredConsent("rejected");
    setVisible(false);
  };

  if (!visible) {
    return null;
  }

  return (
    <div className="cookie-banner" role="dialog" aria-live="polite" aria-label="Cookie consent">
      <p className="cookie-banner-text">
        We use <a href="https://clarity.microsoft.com" target="_blank" rel="noopener noreferrer">Microsoft Clarity</a> analytics cookies to understand how visitors interact with the site and improve their experience.
      </p>
      <div className="cookie-banner-actions">
        <button type="button" className="btn btn-secondary" onClick={rejectAnalytics}>Reject</button>
        <button type="button" className="btn btn-primary" onClick={acceptAnalytics}>Accept analytics</button>
      </div>
    </div>
  );
}
