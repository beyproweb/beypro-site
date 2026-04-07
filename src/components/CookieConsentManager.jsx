import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  applyConsentToTrackers,
  COOKIE_CONSENT_EVENT,
  createAcceptedConsent,
  createCustomConsent,
  createRejectedConsent,
  getStoredCookieConsent,
  saveCookieConsent,
} from "../lib/cookieConsent";

function Toggle({ id, checked, onChange, disabled = false, label, description }) {
  return (
    <div className="flex items-center justify-between gap-3 py-3 border-b border-slate-800 last:border-b-0">
      <div className="min-w-0">
        <p className="text-sm text-white font-medium">{label}</p>
        <p className="text-xs text-slate-400 mt-1">{description}</p>
      </div>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
          checked ? "bg-sky-500" : "bg-slate-700"
        } ${disabled ? "opacity-60 cursor-not-allowed" : ""}`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
            checked ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}

export default function CookieConsentManager() {
  const [consent, setConsent] = useState(null);
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);
  const [marketingEnabled, setMarketingEnabled] = useState(false);

  useEffect(() => {
    const stored = getStoredCookieConsent();
    if (stored) {
      setConsent(stored);
      setAnalyticsEnabled(Boolean(stored.analytics));
      setMarketingEnabled(Boolean(stored.marketing));
      applyConsentToTrackers(stored);
      setShowBanner(false);
    } else {
      setShowBanner(true);
    }
  }, []);

  useEffect(() => {
    const handleConsentChange = (event) => {
      const next = event?.detail || null;
      if (!next) return;
      setConsent(next);
      setAnalyticsEnabled(Boolean(next.analytics));
      setMarketingEnabled(Boolean(next.marketing));
      applyConsentToTrackers(next);
      setShowBanner(false);
      setShowSettings(false);
    };

    window.addEventListener(COOKIE_CONSENT_EVENT, handleConsentChange);
    return () => window.removeEventListener(COOKIE_CONSENT_EVENT, handleConsentChange);
  }, []);

  const hasDecision = useMemo(() => Boolean(consent), [consent]);

  if (hasDecision && !showSettings) return null;

  const acceptAll = () => {
    saveCookieConsent(createAcceptedConsent());
  };

  const rejectAll = () => {
    saveCookieConsent(createRejectedConsent());
  };

  const saveCustom = () => {
    saveCookieConsent(
      createCustomConsent({
        analytics: analyticsEnabled,
        marketing: marketingEnabled,
      })
    );
  };

  return (
    <>
      {showBanner ? (
        <div className="fixed inset-x-4 bottom-4 z-[70] md:inset-x-auto md:right-6 md:max-w-xl">
          <div className="rounded-2xl border border-slate-800 bg-slate-950/95 backdrop-blur px-5 py-4 shadow-2xl">
            <p className="text-sm text-slate-200 leading-relaxed">
              Bu web sitesi, deneyiminizi geliştirmek için çerezler kullanır.{" "}
              <Link to="/cookies" className="underline text-sky-400 hover:text-sky-300 transition">
                Çerez politikası
              </Link>
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={acceptAll}
                className="rounded-full bg-white text-slate-900 text-sm font-semibold px-4 py-2 hover:bg-slate-200 transition"
              >
                Kabul Et
              </button>
              <button
                type="button"
                onClick={rejectAll}
                className="rounded-full bg-slate-800 text-slate-100 text-sm font-medium px-4 py-2 hover:bg-slate-700 transition"
              >
                Reddet
              </button>
              <button
                type="button"
                onClick={() => setShowSettings(true)}
                className="rounded-full border border-slate-700 text-slate-200 text-sm font-medium px-4 py-2 hover:bg-slate-800 transition"
              >
                Ayarlar
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {showSettings ? (
        <div className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm px-4 py-8 overflow-y-auto">
          <div className="max-w-lg mx-auto rounded-2xl border border-slate-800 bg-slate-950 p-5 shadow-2xl">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-white font-semibold text-lg">Çerez Ayarları</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Hangi çerezlerin kullanılacağını buradan yönetebilirsiniz.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowSettings(false)}
                className="rounded-full border border-slate-700 text-slate-300 px-3 py-1 text-sm hover:bg-slate-800 transition"
              >
                Kapat
              </button>
            </div>

            <div className="mt-4">
              <Toggle
                id="cookie-necessary"
                checked
                disabled
                onChange={() => {}}
                label="Zorunlu Çerezler"
                description="Web sitesinin çalışması için gereklidir."
              />
              <Toggle
                id="cookie-analytics"
                checked={analyticsEnabled}
                onChange={setAnalyticsEnabled}
                label="Analitik Çerezleri"
                description="Google Analytics gibi araçlarla performansı ölçer."
              />
              <Toggle
                id="cookie-marketing"
                checked={marketingEnabled}
                onChange={setMarketingEnabled}
                label="Pazarlama Çerezleri"
                description="Meta Pixel gibi araçlarla pazarlama ölçümü yapar."
              />
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={saveCustom}
                className="rounded-full bg-white text-slate-900 text-sm font-semibold px-4 py-2 hover:bg-slate-200 transition"
              >
                Kaydet
              </button>
              <button
                type="button"
                onClick={acceptAll}
                className="rounded-full bg-slate-800 text-slate-100 text-sm font-medium px-4 py-2 hover:bg-slate-700 transition"
              >
                Hepsini Kabul Et
              </button>
              <button
                type="button"
                onClick={rejectAll}
                className="rounded-full border border-slate-700 text-slate-200 text-sm font-medium px-4 py-2 hover:bg-slate-800 transition"
              >
                Hepsini Reddet
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
