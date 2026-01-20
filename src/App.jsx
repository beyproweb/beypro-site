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
            Restaurant Management
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400 mt-2">Reimagined</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 mb-12 leading-relaxed max-w-2xl mx-auto">
            All-in-one POS, kitchen control, stock management, and AI-powered automation in one clean, powerful dashboard.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="px-8 py-4 rounded-lg bg-gradient-to-r from-sky-500 to-indigo-600 font-semibold text-white shadow-lg hover:shadow-xl hover:scale-105 transition duration-300"
            >
              Get Started Free
            </Link>
            <Link
              to="/login"
              className="px-8 py-4 rounded-lg border-2 border-slate-600 text-white font-semibold hover:bg-slate-800 transition duration-300"
            >
              Watch Demo
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 text-slate-500 text-sm animate-pulse">
          ↓ Scroll to explore
        </div>
      </section>

      {/* --- FEATURES LINK --- */}
      <section className="py-32 px-6 bg-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-slate-900">
            Complete Restaurant Operating System
          </h2>
          <p className="max-w-2xl mx-auto text-slate-600 mb-12 text-lg leading-relaxed">
            From order management to kitchen coordination, inventory tracking to staff scheduling — everything you need to run a modern restaurant.
          </p>
          <Link
            to="/features"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-lg bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition duration-300"
          >
            Explore All Features <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* --- HOME IMAGES SHOWCASE --- */}
      <section className="py-24 px-6 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold mb-16 text-center text-slate-900">
            Powerful Features, Beautiful Design
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition duration-300">
              <img src="/assets/screenshots/home1.png" alt="Modern POS System" loading="lazy" className="w-full aspect-square object-cover group-hover:scale-110 transition duration-300" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-end p-6">
                <div className="text-white">
                  <h3 className="text-xl font-bold">Modern POS</h3>
                  <p className="text-sm text-slate-300">Fast & intuitive</p>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition duration-300">
              <img src="/assets/screenshots/home2.png" alt="Kitchen Management" loading="lazy" className="w-full aspect-square object-cover group-hover:scale-110 transition duration-300" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-end p-6">
                <div className="text-white">
                  <h3 className="text-xl font-bold">Kitchen Control</h3>
                  <p className="text-sm text-slate-300">Real-time coordination</p>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition duration-300">
              <img src="/assets/screenshots/Restaurant%20analytics%20in%20focus.png" alt="Analytics Dashboard" loading="lazy" className="w-full aspect-square object-cover group-hover:scale-110 transition duration-300" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-end p-6">
                <div className="text-white">
                  <h3 className="text-xl font-bold">Smart Analytics</h3>
                  <p className="text-sm text-slate-300">Data-driven insights</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- PRICING --- */}
      <section id="pricing" className="py-32 px-6 bg-slate-950">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-4 text-white">
            Simple, Transparent Pricing
          </h2>
          <p className="text-center text-slate-400 mb-16 text-lg max-w-2xl mx-auto">
            Choose the plan that fits your business. All plans include core POS and kitchen features.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Trial */}
            <div className="rounded-xl bg-slate-800 border border-slate-700 p-8 text-center flex flex-col hover:border-slate-600 transition duration-300">
              <h3 className="text-2xl font-bold mb-3 text-white">Trial</h3>
              <p className="text-slate-400 mb-6 text-sm leading-relaxed">
                Perfect for testing. 30 days free access to core features.
              </p>
              <div className="text-5xl font-bold mb-2 text-white">Free</div>
              <p className="text-slate-500 mb-8 text-sm">30 days / no card required</p>
              <button className="w-full py-3 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-semibold transition duration-300 mt-auto">
                Start Free Trial
              </button>
            </div>

            {/* Pro */}
            <div className="rounded-xl bg-gradient-to-br from-sky-600/20 to-indigo-600/20 border-2 border-indigo-500/50 p-8 text-center flex flex-col relative scale-105 shadow-xl">
              <div className="absolute top-4 right-4 bg-gradient-to-r from-sky-500 to-indigo-500 text-white text-xs px-4 py-1 rounded-full font-bold">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white mt-4">Pro</h3>
              <p className="text-slate-300 mb-6 text-sm leading-relaxed">
                For growing restaurants. Full-featured POS + kitchen + stock.
              </p>
              <div className="text-5xl font-bold mb-2 text-white">₺1.2K</div>
              <p className="text-slate-400 mb-8 text-sm">per month, billed monthly</p>
              <button className="w-full py-3 rounded-lg bg-gradient-to-r from-sky-500 to-indigo-600 hover:shadow-lg text-white font-semibold transition duration-300 mt-auto">
                Get Started
              </button>
            </div>

            {/* Enterprise */}
            <div className="rounded-xl bg-slate-800 border border-slate-700 p-8 text-center flex flex-col hover:border-slate-600 transition duration-300">
              <h3 className="text-2xl font-bold mb-3 text-white">Enterprise</h3>
              <p className="text-slate-400 mb-6 text-sm leading-relaxed">
                Multi-location chains. Custom features & dedicated support.
              </p>
              <div className="text-5xl font-bold mb-2 text-white">Custom</div>
              <p className="text-slate-500 mb-8 text-sm">tailored to your needs</p>
              <button className="w-full py-3 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-semibold transition duration-300 mt-auto">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- CTA --- */}
      <section className="py-32 px-6 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-white">
            Ready to Transform Your Restaurant?
          </h2>
          <p className="text-slate-300 mb-12 text-lg leading-relaxed">
            Join hundreds of restaurants already running smarter with Beypro.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:contact@beypro.com"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-white text-slate-900 font-semibold hover:shadow-lg transition duration-300"
            >
              Schedule a Demo <ChevronRight className="w-5 h-5" />
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
            <span className="font-bold text-white">Beypro</span> <span className="text-slate-600">© {new Date().getFullYear()}</span>
          </div>
          <div className="flex items-center flex-wrap justify-center gap-6 text-slate-400 text-sm">
            <Link to="/features" className="hover:text-white transition duration-300">
              Features
            </Link>
            <a href="#pricing" className="hover:text-white transition duration-300">
              Pricing
            </a>
            <Link to="/driver-register" className="hover:text-white transition duration-300">
              Drivers
            </Link>
            <Link to="/restaurant-register" className="hover:text-white transition duration-300">
              For Restaurants
            </Link>
            <Link to="/login" className="hover:text-white transition duration-300">
              Login
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
