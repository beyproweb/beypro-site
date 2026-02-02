// src/pages/Pricing.jsx
import React from "react";
import { useTranslation } from "react-i18next";
import { ChevronRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import MainNav from "../components/MainNav.jsx";

export default function Pricing() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-slate-200">
        <MainNav tone="dark" />
      </div>

      {/* Hero Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-bold mb-6 text-slate-900">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            Choose the plan that works for your restaurant. All plans include core POS features. Scale as you grow.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            {/* QR Menu + Kitchen */}
            <div className="rounded-xl bg-slate-50 border-2 border-slate-200 p-8 flex flex-col hover:shadow-lg transition duration-300 hover:border-slate-300">
              <h3 className="text-2xl font-bold text-slate-900 mb-3">{t("qrk_title")}</h3>
              <p className="text-slate-600 mb-6 text-sm leading-relaxed">{t("qrk_desc")}</p>
              <div className="text-4xl font-bold text-slate-900 mb-2">₺99<span className="text-sm text-slate-600 font-normal">/mo</span></div>
              <p className="text-slate-500 text-sm mb-8">{t("qrk_sub")}</p>
              <Link
                to="/standalone-register"
                className="w-full py-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold transition duration-300 mb-8 text-center"
              >
                {t("qrk_button")}
              </Link>
              <ul className="space-y-3 text-sm text-slate-700 mt-auto">
                <li className="flex items-center gap-3"><Check className="w-4 h-4 text-sky-500 flex-shrink-0" /> {t("qrk_f1")}</li>
                <li className="flex items-center gap-3"><Check className="w-4 h-4 text-sky-500 flex-shrink-0" /> {t("qrk_f2")}</li>
                <li className="flex items-center gap-3"><Check className="w-4 h-4 text-sky-500 flex-shrink-0" /> {t("qrk_f3")}</li>
              </ul>
            </div>

            {/* Starter */}
            <div className="rounded-xl bg-slate-50 border-2 border-slate-200 p-8 flex flex-col hover:shadow-lg transition duration-300 hover:border-slate-300">
              <h3 className="text-2xl font-bold text-slate-900 mb-3">{t("starter_title")}</h3>
              <p className="text-slate-600 mb-8 text-sm leading-relaxed">{t("starter_desc")}</p>
              <div className="text-4xl font-bold text-slate-900 mb-2">₺299<span className="text-sm text-slate-600 font-normal">/mo</span></div>
              <p className="text-slate-500 text-sm mb-8">Billed monthly</p>
              <button className="w-full py-3 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-900 font-semibold transition duration-300 mb-8">
                {t("choose_plan")}
              </button>
              <ul className="space-y-3 text-sm text-slate-700 mt-auto">
                <li className="flex items-center gap-3"><Check className="w-4 h-4 text-sky-500 flex-shrink-0" /> {t("starter_1")}</li>
                <li className="flex items-center gap-3"><Check className="w-4 h-4 text-sky-500 flex-shrink-0" /> {t("starter_2")}</li>
                <li className="flex items-center gap-3"><Check className="w-4 h-4 text-sky-500 flex-shrink-0" /> {t("starter_3")}</li>
              </ul>
            </div>

            {/* Pro (Featured) */}
            <div className="rounded-xl bg-gradient-to-br from-sky-50 to-indigo-50 border-2 border-indigo-500 p-8 flex flex-col relative scale-105 shadow-xl">
              <div className="absolute top-4 right-4 bg-gradient-to-r from-sky-500 to-indigo-600 text-white text-xs px-4 py-1 rounded-full font-bold">
                {t("most_popular")}
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3 mt-4">{t("pro_title")}</h3>
              <p className="text-slate-600 mb-8 text-sm leading-relaxed">{t("pro_desc")}</p>
              <div className="text-4xl font-bold text-slate-900 mb-2">₺699<span className="text-sm text-slate-600 font-normal">/mo</span></div>
              <p className="text-slate-500 text-sm mb-8">Billed monthly</p>
              <button className="w-full py-3 rounded-lg bg-gradient-to-r from-sky-500 to-indigo-600 hover:shadow-lg text-white font-semibold transition duration-300 mb-8">
                {t("choose_plan")}
              </button>
              <ul className="space-y-3 text-sm text-slate-700 mt-auto">
                <li className="flex items-center gap-3"><Check className="w-4 h-4 text-indigo-600 flex-shrink-0" /> {t("pro_1")}</li>
                <li className="flex items-center gap-3"><Check className="w-4 h-4 text-indigo-600 flex-shrink-0" /> {t("pro_2")}</li>
                <li className="flex items-center gap-3"><Check className="w-4 h-4 text-indigo-600 flex-shrink-0" /> {t("pro_3")}</li>
                <li className="flex items-center gap-3"><Check className="w-4 h-4 text-indigo-600 flex-shrink-0" /> {t("pro_4")}</li>
              </ul>
            </div>

            {/* Enterprise */}
            <div className="rounded-xl bg-slate-50 border-2 border-slate-200 p-8 flex flex-col hover:shadow-lg transition duration-300 hover:border-slate-300">
              <h3 className="text-2xl font-bold text-slate-900 mb-3">{t("enterprise_title")}</h3>
              <p className="text-slate-600 mb-8 text-sm leading-relaxed">{t("enterprise_desc")}</p>
              <div className="text-4xl font-bold text-slate-900 mb-2">{t("contact_price")}</div>
              <p className="text-slate-500 text-sm mb-8">Custom pricing</p>
              <button className="w-full py-3 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-900 font-semibold transition duration-300 mb-8">
                {t("request_quote")}
              </button>
              <ul className="space-y-3 text-sm text-slate-700 mt-auto">
                <li className="flex items-center gap-3"><Check className="w-4 h-4 text-sky-500 flex-shrink-0" /> {t("enterprise_1")}</li>
                <li className="flex items-center gap-3"><Check className="w-4 h-4 text-sky-500 flex-shrink-0" /> {t("enterprise_2")}</li>
                <li className="flex items-center gap-3"><Check className="w-4 h-4 text-sky-500 flex-shrink-0" /> {t("enterprise_3")}</li>
                <li className="flex items-center gap-3"><Check className="w-4 h-4 text-sky-500 flex-shrink-0" /> {t("enterprise_4")}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-slate-300 mb-10 text-lg">All plans come with a 30-day free trial. No credit card required.</p>
          <button className="px-8 py-4 rounded-lg bg-white text-slate-900 font-semibold hover:shadow-lg transition duration-300">
            Start Your Free Trial
          </button>
        </div>
      </section>
    </div>
  );
}
