// src/App.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import MainNav from "./components/MainNav.jsx";
import {
  ClipboardList,
  BarChart,
  Bot,
  Users,
  CreditCard,
  ChevronRight,
  ChefHat,
  QrCode,
  Package,
  Puzzle,
} from "lucide-react";

export default function App() {
  const { t } = useTranslation();

  const features = [
    {
      icon: <ClipboardList className="w-8 h-8 text-fuchsia-400" />,
      title: "Smart Orders & POS",
      desc: "Run dine‑in tables, takeaway, phone and delivery orders in one fast, mistake‑proof flow.",
      color: "from-fuchsia-500 to-pink-600",
    },
    {
      icon: <ChefHat className="w-8 h-8 text-blue-400" />,
      title: "Real‑Time Kitchen Control",
      desc: "Live kitchen screen with prep timers, item status updates, and driver assignment alerts.",
      color: "from-blue-500 to-indigo-500",
    },
    {
      icon: <QrCode className="w-8 h-8 text-emerald-400" />,
      title: "Centralized QR Menu & Online Ordering",
      desc: "Branded digital menu with table QR codes, delivery toggle, loyalty tools, and customization.",
      color: "from-emerald-500 to-teal-500",
    },
    {
      icon: <Package className="w-8 h-8 text-purple-400" />,
      title: "Automated Stock & Suppliers",
      desc: "Track inventory, flag critical items, and manage supplier carts to protect profit margins.",
      color: "from-purple-500 to-violet-600",
    },
    {
      icon: <BarChart className="w-8 h-8 text-orange-400" />,
      title: "Real‑Time Profit Reports",
      desc: "See sales, expenses, cash history, category trends, and staff performance in one dashboard.",
      color: "from-amber-500 to-orange-600",
    },
    {
      icon: <CreditCard className="w-8 h-8 text-cyan-400" />,
      title: "Fast Payments & Cash Control",
      desc: "Multi‑method payments with receipt printing, cash drawer control, and register compliance.",
      color: "from-cyan-500 to-sky-600",
    },
    {
      icon: <Users className="w-8 h-8 text-slate-700" />,
      title: "Staff, Shifts & Payroll",
      desc: "Check‑in/out, scheduling, payroll and role‑based permissions to reduce mistakes and save time.",
      color: "from-slate-600 to-slate-900",
    },
    {
      icon: <Puzzle className="w-8 h-8 text-indigo-700" />,
      title: "Integrations & Hardware Ready",
      desc: "Configure delivery platforms, printers and live camera feeds from one centralized system.",
      color: "from-indigo-600 to-purple-700",
    },
    {
      icon: <Bot className="w-8 h-8 text-green-700" />,
      title: "AI‑Ready Automation",
      desc: "Voice‑powered task creation and smart alerts that keep service fast and operations consistent.",
      color: "from-green-600 to-emerald-700",
    },
  ];

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
      <section className="relative min-h-[calc(100vh-72px)] flex flex-col justify-center items-center text-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white px-6">
        <h1 className="text-4xl sm:text-6xl font-extrabold mb-4 leading-tight">
          Level Up Your Business
        </h1>
        <p className="max-w-xl text-lg text-white/80 mb-8">
          Manage orders, staff, stock and payments in one powerful platform —
          built by restaurants, for restaurants.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/register"
            className="px-8 py-3 rounded-full bg-gradient-to-r from-fuchsia-500 to-purple-600 font-semibold shadow-lg hover:scale-105 transition"
          >
            Start Free Trial
          </Link>
          <Link
            to="/login"
            className="px-8 py-3 rounded-full bg-white text-slate-900 font-semibold shadow-lg hover:scale-105 transition"
          >
            Login
          </Link>
        </div>

        <div className="absolute bottom-6 text-white/60 text-sm">
          © {new Date().getFullYear()} Beypro — Level Up
        </div>
      </section>

      {/* --- FEATURES --- */}
      <section id="features" className="py-20 px-6 bg-gradient-to-b from-white to-gray-50 text-gray-900">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-12">
          Powerful Features Built for Restaurant Growth
        </h2>
        <p className="max-w-3xl mx-auto text-center text-gray-600 mb-12">
          Smart, real‑time and automated tools that help restaurants serve faster, reduce mistakes, and grow profit —
          without the limits of traditional POS systems.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((f, i) => (
            <div
              key={i}
              className={`rounded-2xl border border-slate-200 bg-white shadow-lg hover:shadow-xl transition p-6 flex flex-col items-start gap-3`}
            >
              <div
                className={`p-3 rounded-xl bg-gradient-to-r ${f.color} bg-opacity-20`}
              >
                {f.icon}
              </div>
              <h3 className="text-xl font-bold">{f.title}</h3>
              <p className="text-gray-600 text-sm flex-1">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- PRICING --- */}
      <section id="pricing" className="py-20 px-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-500 text-white">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-14">
          Choose Your Plan
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Trial */}
          <div className="rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 p-8 text-center shadow-lg flex flex-col">
            <h3 className="text-2xl font-bold mb-2">Trial</h3>
            <p className="text-sm text-white/80 mb-4">
              30-day free access — explore all core features.
            </p>
            <div className="text-4xl font-extrabold mb-6">
              ₺0<span className="text-sm text-white/60">/30 days</span>
            </div>
            <button className="w-full py-2 rounded-full bg-white text-indigo-600 font-bold shadow hover:scale-[1.02] transition">
              Start Now
            </button>
          </div>

          {/* Pro */}
          <div className="rounded-2xl bg-gradient-to-br from-fuchsia-500 to-purple-600 border-2 border-white/30 p-8 text-center shadow-2xl scale-105 relative">
            <div className="absolute top-0 right-0 bg-white/20 text-white text-xs px-3 py-1 rounded-bl-xl font-bold tracking-wide shadow">
              Most Popular
            </div>
            <h3 className="text-2xl font-bold mb-2">Pro</h3>
            <p className="text-sm text-white/80 mb-4">
              Full-featured POS for fast-growing restaurants.
            </p>
            <div className="text-4xl font-extrabold mb-6">
              ₺1200<span className="text-sm text-white/70">/mo</span>
            </div>
            <button className="w-full py-2 rounded-full bg-white text-fuchsia-700 font-bold shadow hover:scale-[1.02] transition">
              Upgrade to Pro
            </button>
          </div>

          {/* Enterprise */}
          <div className="rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 p-8 text-center shadow-lg flex flex-col">
            <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
            <p className="text-sm text-white/80 mb-4">
              For chains & multi-branch operations needing custom setup.
            </p>
            <div className="text-4xl font-extrabold mb-6">
              ₺2500<span className="text-sm text-white/60">/mo</span>
            </div>
            <button className="w-full py-2 rounded-full bg-white text-indigo-600 font-bold shadow hover:scale-[1.02] transition">
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      {/* --- CONTACT --- */}
      <section className="py-20 px-6 bg-gray-50 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-6 text-slate-800">
          Let’s Talk
        </h2>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          Questions or need help setting up Beypro? Our team is ready to assist
          you anytime.
        </p>
        <a
          href="mailto:contact@beypro.com"
          className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold shadow hover:scale-105 transition"
        >
          Contact Us <ChevronRight className="w-4 h-4" />
        </a>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-slate-900 text-white/70 text-sm py-10 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <span className="font-bold text-white">Beypro</span> © 
            {new Date().getFullYear()} — Level Up Your Business
          </div>
          <div className="flex items-center space-x-4 text-white/60">
            <a href="#features" className="hover:text-white transition">
              Features
            </a>
            <a href="#pricing" className="hover:text-white transition">
              Pricing
            </a>
            <Link to="/driver-register" className="hover:text-white transition">
              Become a Driver
            </Link>
            <Link to="/restaurant-register" className="hover:text-white transition">
              Register Your Restaurant
            </Link>
            <Link to="/login" className="hover:text-white transition">
              Login
            </Link>
            <Link to="/register" className="hover:text-white transition">
              Register
            </Link>
          </div>
        </div>
      </footer>

      {/* --- Animations --- */}
      <style>{`
        @keyframes fade-in {from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:translateY(0);}}
        .animate-fade-in {animation: fade-in .8s ease-out forwards;}
      `}</style>
    </>
  );
}
