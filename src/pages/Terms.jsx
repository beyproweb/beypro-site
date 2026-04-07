import React from "react";
import { Link } from "react-router-dom";
import MainNav from "../components/MainNav.jsx";

export default function Terms() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <MainNav tone="light" className="bg-slate-950/90 backdrop-blur supports-[backdrop-filter]:bg-slate-950/70 sticky top-0 z-40 border-b border-slate-800" />

      <main className="max-w-4xl mx-auto py-16 px-6">
        <h1 className="text-3xl sm:text-4xl font-semibold text-white">Kullanım Şartları</h1>
        <p className="text-gray-300 text-sm leading-relaxed mt-4">
          Kullanım şartları sayfası yakında yayınlanacaktır.
        </p>
      </main>

      <footer className="bg-slate-950 text-slate-400 text-sm py-12 px-6 border-t border-slate-800">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <span className="font-bold text-white">Beypro</span>{" "}
            <span className="text-slate-600">© {new Date().getFullYear()}</span>
          </div>
          <div className="flex items-center flex-wrap justify-center gap-6 text-slate-400 text-sm">
            <Link to="/privacy" className="hover:text-white transition duration-300">
              Gizlilik Politikası
            </Link>
            <Link to="/terms" className="hover:text-white transition duration-300">
              Kullanım Şartları
            </Link>
            <Link to="/contact" className="hover:text-white transition duration-300">
              İletişim
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
