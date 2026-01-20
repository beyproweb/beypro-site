import React, { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Menu, X, ChevronDown, ShoppingCart, Flame, Truck, BarChart3, Settings, Users, Zap, Lock } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher.jsx";

export default function MainNav({ className = "", tone = "light" }) {
  const [open, setOpen] = useState(false);
  const [featuresDropdown, setFeaturesDropdown] = useState(false);
  const [pricingDropdown, setPricingDropdown] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();

  const isLight = tone === "light";

  const items = useMemo(
    () => [
      { to: "/", label: t("nav_home") },
      { 
        label: t("nav_features"), 
        submenu: [
          { to: "/features", label: t("nav_all_features"), desc: t("nav_all_features_desc"), icon: ShoppingCart },
          { to: "/features/pos", label: t("nav_pos"), desc: t("nav_pos_desc"), icon: ShoppingCart },
          { to: "/features/kitchen", label: t("nav_kitchen"), desc: t("nav_kitchen_desc"), icon: Flame },
          { to: "/features/delivery", label: t("nav_delivery"), desc: t("nav_delivery_desc"), icon: Truck },
          { to: "/features/reports", label: t("nav_reports"), desc: t("nav_reports_desc"), icon: BarChart3 },
          { to: "/features/inventory", label: t("nav_inventory"), desc: t("nav_inventory_desc"), icon: Settings },
          { to: "/features/staff", label: t("nav_staff"), desc: t("nav_staff_desc"), icon: Users },
          { to: "/features/automation", label: t("nav_automation"), desc: t("nav_automation_desc"), icon: Zap },
        ]
      },
      { 
        label: t("nav_pricing"),
        submenu: [
          { to: "/pricing", label: t("nav_all_plans"), desc: t("nav_all_plans_desc"), icon: ShoppingCart },
          { to: "/pricing/trial", label: t("nav_trial"), desc: t("nav_trial_desc"), icon: Zap },
          { to: "/pricing/pro", label: t("nav_pro"), desc: t("nav_pro_desc"), icon: Users },
          { to: "/pricing/enterprise", label: t("nav_enterprise"), desc: t("nav_enterprise_desc"), icon: Lock },
        ]
      },
      { to: "/driver-register", label: t("nav_drivers") },
      { to: "/restaurant-register", label: t("nav_restaurants") },
      { to: "/login", label: t("nav_login") },
      { to: "/register", label: t("nav_register") },
    ],
    [t]
  );

  const isActive = (to) => (to === "/" ? location.pathname === "/" : location.pathname.startsWith(to));

  return (
    <header className={`w-full ${className}`}>
      <nav className="mx-auto max-w-6xl px-4 sm:px-6 py-4 flex items-center justify-between">
        <Link
          to="/"
          className={`flex items-center gap-3 font-extrabold ${isLight ? "text-white" : "text-slate-900"}`}
        >
          <img src="/Beylogo.svg" alt="Beypro" className="h-9 w-auto" />
        </Link>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-6 text-sm">
            {items.map((item) => (
              <div key={item.label} className="relative group">
                {item.submenu ? (
                  <>
                    <button
                      className={`transition flex items-center gap-1 py-2 ${
                        isLight ? "text-white/80 hover:text-white" : "text-slate-700 hover:text-slate-900"
                      } ${isActive(item.submenu[0].to) ? (isLight ? "text-white font-semibold" : "text-slate-900 font-semibold") : ""}`}
                    >
                      {item.label}
                      <ChevronDown className="w-4 h-4 transition group-hover:rotate-180" />
                    </button>
                    <div className={`absolute left-0 mt-2 w-80 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 overflow-hidden ${
                      isLight ? "bg-slate-900 border border-slate-800" : "bg-white border border-slate-200"
                    }`}>
                      <div className="p-3">
                        {item.submenu.map((subitem, idx) => {
                          const IconComponent = subitem.icon;
                          return (
                            <Link
                              key={subitem.to}
                              to={subitem.to}
                              className={`flex items-start gap-3 px-4 py-3 rounded-lg transition group/item ${
                                isLight 
                                  ? "hover:bg-white/10" 
                                  : "hover:bg-sky-50"
                              } ${idx !== 0 ? "border-t" : ""} ${
                                isLight ? "border-slate-700" : "border-slate-200"
                              }`}
                            >
                              <div className={`mt-1 flex-shrink-0 transition ${
                                isLight 
                                  ? "text-sky-400 group-hover/item:text-sky-300" 
                                  : "text-sky-600 group-hover/item:text-indigo-600"
                              }`}>
                                <IconComponent className="w-5 h-5" />
                              </div>
                              <div className="flex-1">
                                <div className={`font-semibold transition ${
                                  isLight 
                                    ? "text-white group-hover/item:text-sky-300" 
                                    : "text-slate-900 group-hover/item:text-sky-600"
                                }`}>
                                  {subitem.label}
                                </div>
                                <div className={`text-xs mt-0.5 ${
                                  isLight 
                                    ? "text-white/60" 
                                    : "text-slate-600"
                                }`}>
                                  {subitem.desc}
                                </div>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    to={item.to}
                    className={`transition py-2 ${
                      isLight ? "text-white/80 hover:text-white" : "text-slate-700 hover:text-slate-900"
                    } ${isActive(item.to) ? (isLight ? "text-white font-semibold" : "text-slate-900 font-semibold") : ""}`}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
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
              <div key={item.label}>
                {item.submenu ? (
                  <>
                    <button
                      onClick={() => item.label === "Features" ? setFeaturesDropdown(!featuresDropdown) : setPricingDropdown(!pricingDropdown)}
                      className={`w-full text-left py-3 rounded-lg px-3 transition flex items-center justify-between font-semibold ${
                        isLight ? "text-white/90 hover:bg-white/10" : "text-slate-800 hover:bg-slate-100"
                      }`}
                    >
                      {item.label}
                      <ChevronDown className={`w-4 h-4 transition ${item.label === "Features" && featuresDropdown || item.label === "Pricing" && pricingDropdown ? "rotate-180" : ""}`} />
                    </button>
                    {(item.label === "Features" ? featuresDropdown : pricingDropdown) && (
                      <div className="pl-2 flex flex-col gap-2 py-2">
                        {item.submenu.map((subitem) => {
                          const IconComponent = subitem.icon;
                          return (
                            <Link
                              key={subitem.to}
                              to={subitem.to}
                              onClick={() => {
                                setOpen(false);
                                if (item.label === "Features") setFeaturesDropdown(false);
                                if (item.label === "Pricing") setPricingDropdown(false);
                              }}
                              className={`flex items-start gap-3 py-2 rounded-lg px-3 transition ${
                                isLight ? "text-white/80 hover:bg-white/10" : "text-slate-700 hover:bg-slate-100"
                              }`}
                            >
                              <div className={`mt-1 flex-shrink-0 ${
                                isLight ? "text-sky-400" : "text-sky-600"
                              }`}>
                                <IconComponent className="w-4 h-4" />
                              </div>
                              <div className="flex-1">
                                <div className="font-semibold text-sm">{subitem.label}</div>
                                <div className="text-xs mt-0.5 opacity-70">{subitem.desc}</div>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className={`py-3 rounded-lg px-3 transition block font-semibold ${
                      isLight ? "text-white/90 hover:bg-white/10" : "text-slate-800 hover:bg-slate-100"
                    } ${isActive(item.to) ? (isLight ? "bg-white/10 text-white" : "bg-slate-100") : ""}`}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

/* (kept intentionally without additional exports) */
