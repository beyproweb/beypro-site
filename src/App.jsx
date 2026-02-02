// src/App.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import MainNav from "./components/MainNav.jsx";
import {
  ChevronRight,
} from "lucide-react";

export default function App() {
  const { t } = useTranslation();



  return (
    <>
      <Helmet>
        <title>Beypro — Level Up Your Business</title>
        <meta
          name="description"
          content="Beypro is the next-gen POS platform that unifies orders, staff, stock and AI automation — all in one dashboard."
        />
      </Helmet>

      <div className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-slate-200">
        <MainNav tone="dark" />
      </div>

      {/* --- HERO --- */}
      <section className="relative min-h-[calc(100vh-72px)] flex flex-col justify-center items-center text-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white px-6 py-32">
        {/* Background gradient accent */}
        <div className="absolute inset-0 bg-gradient-to-br from-sky-600/5 via-indigo-600/5 to-transparent" />
        
        <div className="relative z-10 max-w-4xl">
          <h1 className="text-5xl sm:text-7xl font-bold mb-8 leading-tight tracking-tight">
            {t("home_hero_title")}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400 mt-2">{t("home_hero_highlight")}</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 mb-12 leading-relaxed max-w-2xl mx-auto">
            {t("home_hero_desc")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="px-8 py-4 rounded-lg bg-gradient-to-r from-sky-500 to-indigo-600 font-semibold text-white shadow-lg hover:shadow-xl hover:scale-105 transition duration-300"
            >
              {t("home_get_started")}
            </Link>
            <Link
              to="/login"
              className="px-8 py-4 rounded-lg border-2 border-slate-600 text-white font-semibold hover:bg-slate-800 transition duration-300"
            >
              {t("home_watch_demo")}
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 text-slate-500 text-sm animate-pulse">
          {t("home_scroll_hint")}
        </div>
      </section>

      {/* --- FEATURES LINK --- */}
      <section className="py-24 px-6 bg-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-slate-900">
            {t("home_os_title")}
          </h2>
          <p className="max-w-2xl mx-auto text-slate-600 mb-12 text-lg leading-relaxed">
            {t("home_os_desc")}
          </p>
          <Link
            to="/features"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-lg bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition duration-300"
          >
            {t("home_explore_features")} <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* --- INTEGRATION --- */}
      <section className="py-0 px-6 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold mb-16 text-center text-slate-900">
            {t("home_integration_title")}
          </h2>
          <div className="flex justify-center">
            <img src="/assets/screenshots/integration.png" alt="Integration Platforms" loading="lazy" className="w-full max-w-4xl rounded-2xl shadow-lg" />
          </div>
        </div>
      </section>

      {/* --- HOME IMAGES SHOWCASE --- */}
      <section className="py-24 px-6 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold mb-12 text-center text-slate-900">
            {t("home_showcase_title")}
          </h2>
          
          <div className="flex justify-center mb-16">
            <img src="/assets/screenshots/Powerful-Features.png" alt="Powerful Features" loading="lazy" className="w-full max-w-4xl rounded-2xl shadow-lg" />
          </div>
          
          {/* First Item - Image Right */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center mb-12">
            <div className="flex flex-col justify-center text-center md:text-left">
              <h3 className="text-3xl font-bold text-slate-900 mb-4">{t("home_pos_title")}</h3>
              <p className="text-lg text-slate-700 leading-relaxed whitespace-pre-line">"{t("home_pos_sub")}"</p>
            </div>
            <div className="overflow-hidden rounded-2xl shadow-lg">
              <img src="/assets/screenshots/home1.png" alt="Modern POS System" loading="lazy" className="w-full aspect-square object-cover" />
            </div>
          </div>

          {/* Second Item - Image Left, Text Right on Desktop / Text Above on Mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center mb-12">
            <div className="flex flex-col justify-center text-center md:text-left md:order-2">
              <h3 className="text-3xl font-bold text-slate-900 mb-4">{t("home_kitchen_title")}</h3>
              <p className="text-lg text-slate-700 leading-relaxed whitespace-pre-line">"{t("home_kitchen_sub")}"</p>
            </div>
            <div className="overflow-hidden rounded-2xl shadow-lg md:order-1">
              <img src="/assets/screenshots/home2.png" alt="Kitchen Management" loading="lazy" className="w-full aspect-square object-cover" />
            </div>
          </div>

          {/* Third Item - Image Right */}
          {/* Third Item - Image Right */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="flex flex-col justify-center text-center md:text-left">
              <h3 className="text-3xl font-bold text-slate-900 mb-4">{t("home_analytics_title")}</h3>
              <p className="text-lg text-slate-700 leading-relaxed whitespace-pre-line">"{t("home_analytics_sub")}"</p>
            </div>
            <div className="overflow-hidden rounded-2xl shadow-lg">
              <img src="/assets/screenshots/Restaurant%20analytics%20in%20focus.png" alt="Analytics Dashboard" loading="lazy" className="w-full aspect-square object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* --- PRICING --- */}
      <section id="pricing" className="py-24 px-6 bg-slate-950">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-4 text-white">
            {t("pricing_simple_title")}
          </h2>
          <p className="text-center text-slate-400 mb-16 text-lg max-w-2xl mx-auto">
            {t("pricing_simple_desc")}
          </p>

          <div className="grid md:grid-cols-4 gap-8">
            {/* QR Menu + Kitchen */}
            <div className="rounded-xl bg-slate-800 border border-slate-700 p-8 text-center flex flex-col hover:border-slate-600 transition duration-300">
              <h3 className="text-2xl font-bold mb-3 text-white">{t("qrk_title")}</h3>
              <p className="text-slate-400 mb-6 text-sm leading-relaxed">
                {t("qrk_desc")}
              </p>
              <div className="text-5xl font-bold mb-2 text-white">₺99</div>
              <p className="text-slate-500 mb-8 text-sm">{t("qrk_sub")}</p>
              <Link
                to="/standalone-register"
                className="w-full py-3 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-semibold transition duration-300 mt-auto"
              >
                {t("qrk_button")}
              </Link>
            </div>
            {/* Trial */}
            <div className="rounded-xl bg-slate-800 border border-slate-700 p-8 text-center flex flex-col hover:border-slate-600 transition duration-300">
              <h3 className="text-2xl font-bold mb-3 text-white">{t("trial_title")}</h3>
              <p className="text-slate-400 mb-6 text-sm leading-relaxed">
                {t("trial_desc")}
              </p>
              <div className="text-5xl font-bold mb-2 text-white">{t("trial_price")}</div>
              <p className="text-slate-500 mb-8 text-sm">{t("trial_sub")}</p>
              <button className="w-full py-3 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-semibold transition duration-300 mt-auto">
                {t("trial_button")}
              </button>
            </div>

            {/* Pro */}
            <div className="rounded-xl bg-gradient-to-br from-sky-600/20 to-indigo-600/20 border-2 border-indigo-500/50 p-8 text-center flex flex-col relative scale-105 shadow-xl">
              <div className="absolute top-4 right-4 bg-gradient-to-r from-sky-500 to-indigo-500 text-white text-xs px-4 py-1 rounded-full font-bold">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white mt-4">{t("pro_title_card")}</h3>
              <p className="text-slate-300 mb-6 text-sm leading-relaxed">
                {t("pro_desc_card")}
              </p>
              <div className="text-5xl font-bold mb-2 text-white">{t("pro_price")}</div>
              <p className="text-slate-400 mb-8 text-sm">per month, billed monthly</p>
              <button className="w-full py-3 rounded-lg bg-gradient-to-r from-sky-500 to-indigo-600 hover:shadow-lg text-white font-semibold transition duration-300 mt-auto">
                {t("pro_button")}
              </button>
            </div>

            {/* Enterprise */}
            <div className="rounded-xl bg-slate-800 border border-slate-700 p-8 text-center flex flex-col hover:border-slate-600 transition duration-300">
              <h3 className="text-2xl font-bold mb-3 text-white">{t("enterprise_title_card")}</h3>
              <p className="text-slate-400 mb-6 text-sm leading-relaxed">
                {t("enterprise_desc_card")}
              </p>
              <div className="text-5xl font-bold mb-2 text-white">{t("enterprise_price")}</div>
              <p className="text-slate-500 mb-8 text-sm">{t("enterprise_sub")}</p>
              <button className="w-full py-3 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-semibold transition duration-300 mt-auto">
                {t("enterprise_button")}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- CTA --- */}
      <section className="py-24 px-6 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-white">
            {t("cta_ready_title")}
          </h2>
          <p className="text-slate-300 mb-12 text-lg leading-relaxed">
            {t("cta_ready_desc")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:contact@beypro.com"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-white text-slate-900 font-semibold hover:shadow-lg transition duration-300"
            >
              {t("cta_schedule_demo")} <ChevronRight className="w-5 h-5" />
            </a>
            <Link
              to="/register"
              className="px-8 py-4 rounded-lg border-2 border-white text-white font-semibold hover:bg-white/10 transition duration-300"
            >
              Start Free Trial
            </Link>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-slate-950 text-slate-400 text-sm py-12 px-6 border-t border-slate-800">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <span className="font-bold text-white">Beypro</span> <span className="text-slate-600">{t("footer_copyright", { year: new Date().getFullYear() })}</span>
          </div>
          <div className="flex items-center flex-wrap justify-center gap-6 text-slate-400 text-sm">
            <Link to="/features" className="hover:text-white transition duration-300">
              {t("footer_link_features")}
            </Link>
            <a href="#pricing" className="hover:text-white transition duration-300">
              {t("footer_link_pricing")}
            </a>
            <Link to="/driver-register" className="hover:text-white transition duration-300">
              {t("footer_link_drivers")}
            </Link>
            <Link to="/restaurant-register" className="hover:text-white transition duration-300">
              {t("footer_link_restaurants")}
            </Link>
            <Link to="/login" className="hover:text-white transition duration-300">
              {t("footer_link_login")}
            </Link>
          </div>
        </div>
      </footer>

      {/* --- Animations --- */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-fade-in { animation: fade-in 0.8s ease-out forwards; }
        .animate-slide-up { animation: slide-up 0.8s ease-out forwards; }
        .animate-float { animation: float 6s ease-in-out infinite; }
      `}</style>
    </>
  );
}
