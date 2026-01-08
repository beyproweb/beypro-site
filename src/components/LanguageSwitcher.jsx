import React from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = ({ tone = "light", className = "" }) => {
  const { i18n } = useTranslation();

  const handleChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  const isLight = tone === "light";

  return (
    <select
      onChange={handleChange}
      value={i18n.language}
      aria-label="Language"
      className={`${isLight
        ? "bg-transparent text-white text-sm font-medium border border-white/30 rounded px-2 py-1 hover:bg-white/10"
        : "bg-transparent text-slate-900 text-sm font-medium border border-slate-300 rounded px-2 py-1 hover:bg-slate-100"
      } transition ${className}`}
    >
      <option value="en">🇬🇧 EN</option>
      <option value="tr">🇹🇷 TR</option>
      <option value="de">🇩🇪 DE</option>
    </select>
  );
};

export default LanguageSwitcher;
