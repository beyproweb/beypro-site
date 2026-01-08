// src/pages/Pricing.jsx
import React from "react";
import { useTranslation } from "react-i18next";
import MainNav from "../components/MainNav.jsx";
export default function Pricing() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white">
      <div className="sticky top-0 z-20 bg-black/10 backdrop-blur border-b border-white/10">
        <MainNav />
      </div>

      <div className="py-20 px-6">
      <h1 className="text-4xl font-bold text-center text-blue-300 mb-16">{t("pricing_title")}</h1>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Starter */}
        <div className="rounded-2xl bg-white/10 border border-white/20 p-8 text-center shadow-lg hover:scale-[1.02] transition">
          <h3 className="text-2xl font-bold text-cyan-300 mb-2">{t("starter_title")}</h3>
          <p className="text-sm text-white/70 mb-4">{t("starter_desc")}</p>
          <div className="text-4xl font-extrabold text-white mb-6">₺299<span className="text-sm text-white/60">/mo</span></div>
          <ul className="space-y-2 text-sm text-white/80 mb-8">
            <li>✔️ {t("starter_1")}</li>
            <li>✔️ {t("starter_2")}</li>
            <li>✔️ {t("starter_3")}</li>
          </ul>
          <button className="w-full py-2 rounded-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold shadow">
            {t("choose_plan")}
          </button>
        </div>

        {/* Pro */}
        <div className="rounded-2xl bg-gradient-to-tr from-purple-700/20 to-blue-700/20 border border-fuchsia-400 p-8 text-center shadow-2xl scale-105 relative z-10">
          <div className="absolute top-0 right-0 bg-fuchsia-600 text-white text-xs px-3 py-1 rounded-bl-xl font-bold tracking-wide shadow-lg">
            {t("most_popular")}
          </div>
          <h3 className="text-2xl font-bold text-fuchsia-300 mb-2">{t("pro_title")}</h3>
          <p className="text-sm text-white/70 mb-4">{t("pro_desc")}</p>
          <div className="text-4xl font-extrabold text-white mb-6">₺699<span className="text-sm text-white/60">/mo</span></div>
          <ul className="space-y-2 text-sm text-white/80 mb-8">
            <li>✔️ {t("pro_1")}</li>
            <li>✔️ {t("pro_2")}</li>
            <li>✔️ {t("pro_3")}</li>
            <li>✔️ {t("pro_4")}</li>
          </ul>
          <button className="w-full py-2 rounded-full bg-gradient-to-r from-fuchsia-500 to-purple-500 hover:brightness-110 text-white font-bold shadow">
            {t("choose_plan")}
          </button>
        </div>

        {/* Enterprise */}
        <div className="rounded-2xl bg-white/10 border border-white/20 p-8 text-center shadow-lg hover:scale-[1.02] transition">
          <h3 className="text-2xl font-bold text-purple-300 mb-2">{t("enterprise_title")}</h3>
          <p className="text-sm text-white/70 mb-4">{t("enterprise_desc")}</p>
          <div className="text-4xl font-extrabold text-white mb-6">{t("contact_price")}</div>
          <ul className="space-y-2 text-sm text-white/80 mb-8">
            <li>✔️ {t("enterprise_1")}</li>
            <li>✔️ {t("enterprise_2")}</li>
            <li>✔️ {t("enterprise_3")}</li>
            <li>✔️ {t("enterprise_4")}</li>
          </ul>
          <button className="w-full py-2 rounded-full bg-purple-500 hover:bg-purple-600 text-white font-bold shadow">
            {t("request_quote")}
          </button>
        </div>
      </div>
      </div>
    </div>
  );
}
