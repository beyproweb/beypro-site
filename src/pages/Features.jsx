// src/pages/Features.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import MainNav from "../components/MainNav.jsx";
import {
  ChevronRight,
  ClipboardList,
  ChefHat,
  QrCode,
  Package,
  BarChart,
  CreditCard,
  Users,
  Puzzle,
  ArrowRight,
  Bot,
  ArrowUp,
} from "lucide-react";

export default function Features() {
  const { t } = useTranslation();

  // Section icons for visual hierarchy
  const sectionIcons = {
    "pos-orders": <ClipboardList className="w-7 h-7" />,
    kitchen: <ChefHat className="w-7 h-7" />,
    register: <CreditCard className="w-7 h-7" />,
    "stock-suppliers": <Package className="w-7 h-7" />,
    "supplier-automation": <Package className="w-7 h-7" />,
    staff: <Users className="w-7 h-7" />,
    reports: <BarChart className="w-7 h-7" />,
    tasks: <Puzzle className="w-7 h-7" />,
    marketing: <Bot className="w-7 h-7" />,
    integrations: <Puzzle className="w-7 h-7" />,
    "qr-menu": <QrCode className="w-7 h-7" />,
    hardware: <Package className="w-7 h-7" />,
    settings: <ClipboardList className="w-7 h-7" />,
    security: <Users className="w-7 h-7" />,
  };

  const featureHighlights = [
    "Web Dashboard + Desktop Bridge for printing & hardware workflows",
    "Full POS: tables, takeaway, phone orders, delivery/packet flows",
    "Kitchen screen with preparation statuses and timers",
    "Stock + ingredient pricing + supplier automation",
    "Staff scheduling, check-in/out, payroll tracking",
    "Reports, exports, and customer insights",
    "QR Menu + instant restaurant website for dine-in and at-home ordering",
    "Integrations: Yemeksepeti, Getir, Trendyol, Migros + WhatsApp + Iyzico",
  ];

  const getSectionsData = () => [
    {
      id: "pos-orders",
      titleKey: "pos_orders_title",
      subtitleKey: "pos_orders_subtitle",
      featureKeys: [
        "pos_orders_f1",
        "pos_orders_f2",
        "pos_orders_f3",
        "pos_orders_f4",
        "pos_orders_f5",
        "pos_orders_f6",
      ],
    },
    {
      id: "kitchen",
      titleKey: "kitchen_title",
      subtitleKey: "kitchen_subtitle",
      featureKeys: ["kitchen_f1", "kitchen_f2", "kitchen_f3"],
    },
    {
      id: "register",
      titleKey: "register_title",
      subtitleKey: "register_subtitle",
      featureKeys: [
        "register_f1",
        "register_f2",
        "register_f3",
        "register_f4",
        "register_f5",
        "register_f6",
      ],
    },
    {
      id: "stock-suppliers",
      titleKey: "stock_suppliers_title",
      subtitleKey: "stock_suppliers_subtitle",
      featureKeys: [
        "stock_suppliers_f1",
        "stock_suppliers_f2",
        "stock_suppliers_f3",
        "stock_suppliers_f4",
        "stock_suppliers_f5",
      ],
    },
    {
      id: "supplier-automation",
      titleKey: "supplier_automation_title",
      subtitleKey: "supplier_automation_subtitle",
      featureKeys: [
        "supplier_automation_f1",
        "supplier_automation_f2",
        "supplier_automation_f3",
        "supplier_automation_f4",
      ],
    },
    {
      id: "staff",
      titleKey: "staff_title",
      subtitleKey: "staff_subtitle",
      featureKeys: ["staff_f1", "staff_f2", "staff_f3", "staff_f4"],
    },
    {
      id: "reports",
      titleKey: "reports_title",
      subtitleKey: "reports_subtitle",
      featureKeys: ["reports_f1", "reports_f2"],
    },
    {
      id: "tasks",
      titleKey: "tasks_title",
      subtitleKey: "tasks_subtitle",
      featureKeys: ["tasks_f1", "tasks_f2"],
    },
    {
      id: "marketing",
      titleKey: "marketing_title",
      subtitleKey: "marketing_subtitle",
      featureKeys: ["marketing_f1", "marketing_f2"],
    },
    {
      id: "integrations",
      titleKey: "integrations_title",
      subtitleKey: "integrations_subtitle",
      featureKeys: [
        "integrations_f1",
        "integrations_f2",
        "integrations_f3",
        "integrations_f4",
        "integrations_f5",
        "integrations_f6",
        "integrations_f7",
        "integrations_f8",
        "integrations_f9",
      ],
    },
    {
      id: "qr-menu",
      titleKey: "qr_menu_title",
      subtitleKey: "qr_menu_subtitle",
      featureKeys: [
        "qr_menu_f1",
        "qr_menu_f2",
        "qr_menu_f3",
        "qr_menu_f4",
        "qr_menu_f5",
        "qr_menu_f6",
        "qr_menu_f7",
        "qr_menu_f8",
        "qr_menu_f9",
        "qr_menu_f10",
      ],
    },
    {
      id: "hardware",
      titleKey: "hardware_title",
      subtitleKey: "hardware_subtitle",
      featureKeys: ["hardware_f1", "hardware_f2"],
    },
    {
      id: "settings",
      titleKey: "settings_title",
      subtitleKey: "settings_subtitle",
      featureKeys: [
        "settings_f1",
        "settings_f2",
        "settings_f3",
        "settings_f4",
        "settings_f5",
        "settings_f6",
        "settings_f7",
        "settings_f8",
        "settings_f9",
        "settings_f10",
        "settings_f11",
        "settings_f12",
        "settings_f13",
        "settings_f14",
      ],
    },
    {
      id: "security",
      titleKey: "security_title",
      subtitleKey: "security_subtitle",
      featureKeys: ["security_f1", "security_f2", "security_f3"],
    },
  ];

  return (
    <>
      <Helmet>
        <title>Beypro Features | POS, Kitchen, Stock, QR Menu & Integrations</title>
        <meta
          name="description"
          content="Beypro is a modular restaurant platform: POS, kitchen, cash register, stock & suppliers, staff, reports, QR menu website, and integrations."
        />
        <meta name="keywords" content="restaurant POS, kitchen display, stock management, supplier automation, QR menu, restaurant website, Yemeksepeti integration, Turkey POS" />
      </Helmet>

      <div className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-slate-200">
        <MainNav tone="dark" />
      </div>

      {/* --- HERO --- */}
      <section className="relative py-16 px-6 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-2">
            {t("features_hero_title")}
          </h1>
          <p className="text-lg text-slate-300">{t("features_hero_desc")}</p>
        </div>
      </section>

      {/* --- FEATURE GRID / CATEGORY BROWSER --- */}
      <section className="py-24 px-6 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {getSectionsData().map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="group relative flex flex-col items-center justify-center p-8 rounded-2xl bg-white border-2 border-slate-200 hover:border-sky-400 shadow-md hover:shadow-xl transition-all duration-300 h-56 hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-sky-50 to-indigo-50 opacity-0 group-hover:opacity-100 rounded-2xl transition duration-300"></div>
                
                <div className="relative z-10 text-center flex flex-col items-center h-full justify-center">
                  <div className="p-4 rounded-xl bg-gradient-to-r from-sky-100 to-indigo-100 text-sky-600 group-hover:text-indigo-600 flex items-center justify-center mb-4 w-16 h-16 flex-shrink-0">
                    <div className="w-8 h-8">{sectionIcons[section.id]}</div>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 text-center leading-tight">{t(section.titleKey)}</h3>
                  {section.subtitleKey && (
                    <p className="text-sm text-slate-600 mt-2 text-center leading-snug">{t(section.subtitleKey)}</p>
                  )}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* --- INTRO SECTION --- */}
      <section className="py-20 px-6 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-center">
            {t("features_intro_title")}
          </h2>
          <p className="text-center text-slate-300 mb-14 text-lg leading-relaxed">
            {t("features_intro_desc")}
          </p>

          {/* Highlights Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {featureHighlights.map((highlight, idx) => (
              <div key={idx} className="flex items-start gap-4 p-5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-sky-400/50 transition duration-300">
                <ChevronRight className="w-6 h-6 text-sky-400 flex-shrink-0 mt-0.5" />
                <p className="text-white text-base leading-relaxed">{highlight}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FEATURE DETAILS --- */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          {getSectionsData().map((section, idx) => (
            <div key={section.id} id={section.id} className="scroll-mt-24">
              <div className="mb-8 flex items-center gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-lg flex items-center justify-center flex-shrink-0">
                  {sectionIcons[section.id]}
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold mb-1 text-slate-900">{t(section.titleKey)}</h2>
                  <p className="text-base text-slate-600">{t(section.subtitleKey)}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {section.featureKeys.map((featureKey, fidx) => (
                  <div
                    key={fidx}
                    className="flex items-start gap-3 p-5 rounded-xl bg-gradient-to-br from-slate-50 to-white border border-slate-200 hover:border-indigo-300 hover:shadow-lg transition duration-300"
                  >
                    <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-sky-500 to-indigo-600 flex-shrink-0 mt-2" />
                    <p className="text-slate-800 text-base leading-relaxed">{t(featureKey)}</p>
                  </div>
                ))}
              </div>
              {idx < getSectionsData().length - 1 && (
                <div className="mt-12 mb-12 border-t border-slate-300" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-20 px-6 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            {t("features_cta_title")}
          </h2>
          <p className="text-lg text-slate-300 mb-10 leading-relaxed">
            {t("features_cta_desc")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="px-8 py-3 rounded-lg bg-white text-slate-900 font-semibold hover:shadow-lg transition inline-flex items-center justify-center gap-2"
            >
              {t("features_cta_trial")} <ArrowRight className="w-4 h-4" />
            </Link>
            <button className="px-8 py-3 rounded-lg border-2 border-white text-white font-semibold hover:bg-white/10 transition">
              {t("features_cta_demo")}
            </button>
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
            <Link to="/features" className="hover:text-white transition duration-300">{t("footer_link_features")}</Link>
            <Link to="/pricing" className="hover:text-white transition duration-300">{t("footer_link_pricing")}</Link>
            <Link to="/driver-register" className="hover:text-white transition duration-300">{t("footer_link_drivers")}</Link>
            <Link to="/restaurant-register" className="hover:text-white transition duration-300">{t("footer_link_restaurants")}</Link>
            <Link to="/login" className="hover:text-white transition duration-300">{t("footer_link_login")}</Link>
            <Link to="/register" className="hover:text-white transition duration-300">{t("footer_register")}</Link>
          </div>
        </div>
      </footer>
    </>
  );
}
