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

  const sections = [
    {
      id: "pos-orders",
      title: "Core POS & Orders",
      subtitle: "Fast ordering. Clear control. Reliable checkout.",
      features: [
        "Table Overview with operational tabs (Tables, Kitchen, History, Packet, Phone, Register)",
        "Table workflow: open table → add items → discounts → payment → close",
        "Packet/Delivery + Phone orders with customer address support",
        "Transaction screen to review, update, and close orders",
        "Printing utilities for receipts and kitchen outputs (via Beypro Bridge)",
        "Customer database with saved profiles and multiple addresses",
      ],
    },
    {
      id: "kitchen",
      title: "Kitchen Operations",
      subtitle: "Keep the kitchen synchronized with the front.",
      features: [
        "Kitchen order view with status updates (preparing / ready / delivered)",
        "Kitchen configuration patterns for category/product routing",
        "Timer and scheduler-job support for kitchen timing logic (backend-driven)",
      ],
    },
    {
      id: "register",
      title: "Register & Cash Management",
      subtitle: "Daily cash control, built into the workflow.",
      features: [
        "Open/close register state with opening cash",
        "End-of-day workflows + register checks",
        "Cash register history and logs",
        "Expenses tracking",
        "Cash drawer support (via printer/drawer settings)",
        "Subscription & billing-cycle support (backend capabilities)",
      ],
    },
    {
      id: "stock-suppliers",
      title: "Products, Stock & Suppliers",
      subtitle: "Prevent shortages and control costs—without spreadsheets.",
      features: [
        "Product + category management",
        "Stock management with low-stock alerting",
        "Ingredient price tracking",
        "Suppliers module: supplier list & profiles, balances and transactions, purchasing receipts and price history",
        "Category images (used in POS & QR menu)",
      ],
    },
    {
      id: "supplier-automation",
      title: "Smart Supplier Cart Automation",
      subtitle: "Automate reordering based on low stock.",
      features: [
        "Scheduled supplier carts (date/time + weekly/biweekly/monthly repeat)",
        "Auto-send option + pending scheduled orders list + cancel",
        "Auto-add low stock items to supplier cart (supported by backend routes)",
        "Supplier cart email ordering flow",
      ],
    },
    {
      id: "staff",
      title: "Staff Management",
      subtitle: "Scheduling, attendance, and payroll—permission controlled.",
      features: [
        "QR-based staff check-in/out (optional geo restrictions)",
        "Staff scheduling tools",
        "Payroll and staff payment tracking",
        "Role/permission gating per feature (check-in, schedule, payroll, payments, staff management)",
      ],
    },
    {
      id: "reports",
      title: "Reports & Analytics",
      subtitle: "Know what's working—then export it cleanly.",
      features: [
        "Modular reports page with export options",
        "Customer insights page",
      ],
    },
    {
      id: "tasks",
      title: "Tasks & Maintenance",
      subtitle: "Operational follow-through for teams.",
      features: [
        "Task tracking page",
        "Maintenance tracker page",
      ],
    },
    {
      id: "marketing",
      title: "Marketing & Messaging",
      subtitle: "Built-in campaign workflows where needed.",
      features: [
        "Marketing campaigns page (WhatsApp workflows supported in codebase)",
        "WhatsApp webhook integration endpoint (backend)",
      ],
    },
    {
      id: "integrations",
      title: "Integrations",
      subtitle: "Connect the platforms your restaurant relies on.",
      features: [
        "Integrations settings page",
        "Supported platforms: Yemeksepeti, Getir, Trendyol, Migros",
        "Enable/disable per platform",
        "Credentials/identifiers per platform",
        "Menu sync toggle (where supported)",
        "Auto-confirm orders toggle",
        "Yemeksepeti mapping tools: unmatched items list, mapping management",
        "WhatsApp auto order message toggle",
        "Iyzico payment gateway routes (mounted when configured)",
      ],
    },
    {
      id: "qr-menu",
      title: "QR Menu & Instant Restaurant Website",
      subtitle: "Your restaurant online in minutes—not weeks.",
      features: [
        "Public routes like /:slug, /qr, /menu let customers browse the menu and place orders",
        "Restaurant branding/theme customization",
        "Products, categories, extras groups",
        "Category images",
        '"Popular this week" products',
        "Story, gallery, and social links",
        "Delivery/pickup toggles",
        "Optional table geo restriction options",
        "Loyalty points system (QR loyalty backend)",
        "Admin-facing QR settings page included",
      ],
    },
    {
      id: "hardware",
      title: "Printers & Cameras",
      subtitle: "Hardware workflows that actually fit restaurant reality.",
      features: [
        "Printer management: default printers, test prints, LAN scan, bridge printing",
        "Cameras page (live view and configuration patterns)",
      ],
    },
    {
      id: "settings",
      title: "Settings That Scale With You",
      subtitle: "Control operations from one place.",
      features: [
        "Shop hours",
        "Localization (language/currency patterns)",
        "Notifications (toast + sound events)",
        "Subscription",
        "Payment methods",
        "Register settings",
        "Users / user management",
        "Integrations",
        "Inventory/logs",
        "Appearance (theme)",
        "Printers",
        "Cameras",
        "Tables settings",
        "Transaction behavior settings",
      ],
    },
    {
      id: "security",
      title: "Security & Access Control",
      subtitle: "Built for multi-role restaurant teams.",
      features: [
        "Role-based permissions across pages and settings tabs",
        "Module gating by plan configuration",
        "Protected vs public endpoint separation (/api/* vs /api/public/*)",
      ],
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
            Features
          </h1>
          <p className="text-lg text-slate-300">Explore everything Beypro can do for your restaurant</p>
        </div>
      </section>

      {/* --- FEATURE GRID / CATEGORY BROWSER --- */}
      <section className="py-24 px-6 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {sections.map((section) => (
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
                  <h3 className="text-lg font-bold text-slate-900 text-center leading-tight">{section.title}</h3>
                  {section.subtitle && (
                    <p className="text-sm text-slate-600 mt-2 text-center leading-snug">{section.subtitle}</p>
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
            Everything you need to operate
          </h2>
          <p className="text-center text-slate-300 mb-14 text-lg leading-relaxed">
            From POS and kitchen operations to inventory management and staff coordination—Beypro gives you all the tools modern restaurants need.
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
          {sections.map((section, idx) => (
            <div key={section.id} id={section.id} className="scroll-mt-24">
              <div className="mb-8 flex items-center gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-lg flex items-center justify-center flex-shrink-0">
                  {sectionIcons[section.id]}
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold mb-1 text-slate-900">{section.title}</h2>
                  <p className="text-base text-slate-600">{section.subtitle}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {section.features.map((feature, fidx) => (
                  <div
                    key={fidx}
                    className="flex items-start gap-3 p-5 rounded-xl bg-gradient-to-br from-slate-50 to-white border border-slate-200 hover:border-indigo-300 hover:shadow-lg transition duration-300"
                  >
                    <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-sky-500 to-indigo-600 flex-shrink-0 mt-2" />
                    <p className="text-slate-800 text-base leading-relaxed">{feature}</p>
                  </div>
                ))}
              </div>
              {idx < sections.length - 1 && (
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
            Ready to Transform Your Restaurant?
          </h2>
          <p className="text-lg text-slate-300 mb-10 leading-relaxed">
            Start with the core modules today and scale as you grow. All plans include a 30-day free trial.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="px-8 py-3 rounded-lg bg-white text-slate-900 font-semibold hover:shadow-lg transition inline-flex items-center justify-center gap-2"
            >
              Start Free Trial <ArrowRight className="w-4 h-4" />
            </Link>
            <button className="px-8 py-3 rounded-lg border-2 border-white text-white font-semibold hover:bg-white/10 transition">
              Book a Demo
            </button>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-slate-950 text-slate-400 text-sm py-12 px-6 border-t border-slate-800">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <span className="font-bold text-white">Beypro</span> <span className="text-slate-600">© {new Date().getFullYear()}</span>
          </div>
          <div className="flex items-center flex-wrap justify-center gap-6 text-slate-400 text-sm">
            <Link to="/features" className="hover:text-white transition duration-300">Features</Link>
            <Link to="/pricing" className="hover:text-white transition duration-300">Pricing</Link>
            <Link to="/driver-register" className="hover:text-white transition duration-300">Drivers</Link>
            <Link to="/restaurant-register" className="hover:text-white transition duration-300">For Restaurants</Link>
            <Link to="/login" className="hover:text-white transition duration-300">Login</Link>
            <Link to="/register" className="hover:text-white transition duration-300">Register</Link>
          </div>
        </div>
      </footer>
    </>
  );
}
