import React, { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher.jsx";

export default function MainNav({ className = "", tone = "light" }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const isLight = tone === "light";

  const items = useMemo(
    () => [
      { to: "/", label: "Home" },
      { to: "/pricing", label: "Pricing" },
      { to: "/driver-register", label: "Become a Driver" },
      { to: "/restaurant-register", label: "Register Your Restaurant" },
      { to: "/login", label: "Login" },
      { to: "/register", label: "Register" },
    ],
    []
  );

  const isActive = (to) => (to === "/" ? location.pathname === "/" : location.pathname.startsWith(to));

  return (
    <header className={`w-full ${className}`}>
      <nav className="mx-auto max-w-6xl px-4 sm:px-6 py-4 flex items-center justify-between">
        <Link
          to="/"
          className={`flex items-center gap-3 font-extrabold ${isLight ? "text-white" : "text-slate-900"}`}
        >
          <img src="/Beylogo.svg" alt="Beypro" className="h-8 w-auto" />
        </Link>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-6 text-sm">
            {items.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`transition ${
                  isLight ? "text-white/80 hover:text-white" : "text-slate-700 hover:text-slate-900"
                } ${isActive(item.to) ? (isLight ? "text-white font-semibold" : "text-slate-900 font-semibold") : ""}`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <LanguageSwitcher tone={tone} />

          <button
            type="button"
            className={`md:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl border ${
              isLight
                ? "bg-white/10 border-white/15 text-white"
                : "bg-slate-900/5 border-slate-200 text-slate-900"
            }`}
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div
          className={`md:hidden border-t ${
            isLight ? "border-white/10 bg-black/30 text-white" : "border-slate-200 bg-white text-slate-900"
          } backdrop-blur`}
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 py-3 flex flex-col gap-1">
            {items.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={`py-2 rounded-lg px-2 transition ${
                  isLight ? "text-white/90 hover:bg-white/10" : "text-slate-800 hover:bg-slate-100"
                } ${isActive(item.to) ? (isLight ? "bg-white/10 text-white font-semibold" : "bg-slate-100 font-semibold") : ""}`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

/* (kept intentionally without additional exports) */
