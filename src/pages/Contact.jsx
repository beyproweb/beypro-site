import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import MainNav from "../components/MainNav.jsx";
import BrandLogo from "../components/BrandLogo.jsx";

export default function Contact() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <MainNav tone="light" className="bg-slate-950/90 backdrop-blur supports-[backdrop-filter]:bg-slate-950/70 sticky top-0 z-40 border-b border-slate-800" />

      <main className="max-w-4xl mx-auto py-16 px-6">
        <h1 className="text-3xl sm:text-4xl font-semibold text-white">{t("contact_page_title")}</h1>
        <p className="text-gray-300 text-sm leading-relaxed mt-4">
          {t("contact_page_desc")}
        </p>
        <p className="text-gray-300 text-sm leading-relaxed mt-3">
          {t("contact_email_label")}:{" "}
          <a className="text-sky-400 hover:text-sky-300 transition" href="mailto:support@beypro.com">
            support@beypro.com
          </a>
        </p>
        <p className="text-gray-300 text-sm leading-relaxed mt-1">
          {t("contact_web_label")}:{" "}
          <a
            className="text-sky-400 hover:text-sky-300 transition"
            href="https://www.beypro.com"
            target="_blank"
            rel="noreferrer"
          >
            https://www.beypro.com
          </a>
        </p>
      </main>

      <footer className="bg-white text-slate-600 text-sm py-12 px-6 border-t border-slate-200">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <BrandLogo variant="footer" />
          </div>
          <div className="flex items-center flex-wrap justify-center gap-6 text-slate-600 text-xs">
            <Link to="/privacy" className="hover:text-slate-900 transition duration-300">
              {t("legal_privacy")}
            </Link>
            <Link to="/terms" className="hover:text-slate-900 transition duration-300">
              {t("legal_terms")}
            </Link>
            <Link to="/cookies" className="hover:text-slate-900 transition duration-300">
              {t("legal_cookies")}
            </Link>
            <Link to="/seller-agreement" className="hover:text-slate-900 transition duration-300">
              {t("legal_seller_agreement")}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
