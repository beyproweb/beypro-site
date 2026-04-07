export const COOKIE_CONSENT_STORAGE_KEY = "beypro_cookie_consent_v1";
export const COOKIE_CONSENT_EVENT = "beypro:cookie-consent-changed";

let gaLoaded = false;
let metaLoaded = false;

function asBool(value, fallback = false) {
  if (typeof value === "boolean") return value;
  return fallback;
}

export function normalizeConsent(value) {
  if (!value || typeof value !== "object") return null;
  return {
    decision: String(value.decision || "custom"),
    necessary: true,
    analytics: asBool(value.analytics, false),
    marketing: asBool(value.marketing, false),
    updatedAt: value.updatedAt || new Date().toISOString(),
  };
}

export function getStoredCookieConsent() {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return normalizeConsent(parsed);
  } catch {
    return null;
  }
}

export function saveCookieConsent(value) {
  if (typeof window === "undefined") return null;
  const normalized = normalizeConsent(value);
  if (!normalized) return null;
  window.localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, JSON.stringify(normalized));
  window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_EVENT, { detail: normalized }));
  return normalized;
}

export function createAcceptedConsent() {
  return {
    decision: "accepted",
    necessary: true,
    analytics: true,
    marketing: true,
    updatedAt: new Date().toISOString(),
  };
}

export function createRejectedConsent() {
  return {
    decision: "rejected",
    necessary: true,
    analytics: false,
    marketing: false,
    updatedAt: new Date().toISOString(),
  };
}

export function createCustomConsent({ analytics = false, marketing = false } = {}) {
  return {
    decision: "custom",
    necessary: true,
    analytics: Boolean(analytics),
    marketing: Boolean(marketing),
    updatedAt: new Date().toISOString(),
  };
}

function ensureGoogleAnalyticsLoaded(measurementId) {
  if (!measurementId || gaLoaded || typeof window === "undefined") return;
  gaLoaded = true;

  if (!document.getElementById("beypro-ga-script")) {
    const script = document.createElement("script");
    script.id = "beypro-ga-script";
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
    document.head.appendChild(script);
  }

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag() { window.dataLayer.push(arguments); };
  window.gtag("js", new Date());
  window.gtag("config", measurementId);
}

function ensureMetaPixelLoaded(pixelId) {
  if (!pixelId || metaLoaded || typeof window === "undefined") return;
  metaLoaded = true;

  if (!window.fbq) {
    const fbqFactory = function fbqFactory() {
      fbqFactory.callMethod
        ? fbqFactory.callMethod.apply(fbqFactory, arguments)
        : fbqFactory.queue.push(arguments);
    };
    fbqFactory.queue = [];
    fbqFactory.loaded = true;
    fbqFactory.version = "2.0";
    window.fbq = fbqFactory;
  }

  if (!document.getElementById("beypro-meta-pixel-script")) {
    const script = document.createElement("script");
    script.id = "beypro-meta-pixel-script";
    script.async = true;
    script.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.appendChild(script);
  }

  window.fbq("init", pixelId);
  window.fbq("track", "PageView");
}

export function applyConsentToTrackers(consent) {
  const normalized = normalizeConsent(consent);
  if (!normalized || typeof window === "undefined") return;

  const gaMeasurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
  const metaPixelId = import.meta.env.VITE_META_PIXEL_ID;

  if (normalized.analytics) {
    ensureGoogleAnalyticsLoaded(gaMeasurementId);
  }
  if (normalized.marketing) {
    ensureMetaPixelLoaded(metaPixelId);
  }

  if (window.gtag) {
    window.gtag("consent", "update", {
      analytics_storage: normalized.analytics ? "granted" : "denied",
      ad_storage: normalized.marketing ? "granted" : "denied",
      ad_user_data: normalized.marketing ? "granted" : "denied",
      ad_personalization: normalized.marketing ? "granted" : "denied",
    });
  }

  if (window.fbq) {
    window.fbq("consent", normalized.marketing ? "grant" : "revoke");
  }
}
