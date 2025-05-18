import React from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const handleChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <select
      onChange={handleChange}
      value={i18n.language}
      className="bg-transparent text-white text-sm font-medium border border-white/30 rounded px-2 py-1 hover:bg-white/10 transition"
    >
      <option value="en">🇬🇧 EN</option>
      <option value="tr">🇹🇷 TR</option>
      <option value="de">🇩🇪 DE</option>
    </select>
  );
};

export default LanguageSwitcher;
