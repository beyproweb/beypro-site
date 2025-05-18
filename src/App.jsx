import React from "react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./components/LanguageSwitcher";
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";

export default function App() {
  const { t, i18n } = useTranslation();
  const [formData, setFormData] = React.useState({ name: "", email: "", message: "" });
  const [formMessage, setFormMessage] = React.useState("");
  const [newsletterMsg, setNewsletterMsg] = React.useState("");


  const handleNewsletterSubmit = async (e) => {
  e.preventDefault();
  const email = e.target.email.value;

  try {
    const res = await fetch("http://localhost:5000/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    if (data.success) {
      setNewsletterMsg(t("newsletter_success"));
      e.target.reset();
    } else {
      setNewsletterMsg("❌ " + (data.error || "Subscription failed"));
    }
  } catch (err) {
    console.error("Newsletter error:", err);
    setNewsletterMsg("❌ An error occurred.");
  }
};

  const [menuOpen, setMenuOpen] = React.useState(false);
  React.useEffect(() => {
  if (!menuOpen) return;

  const handleScroll = () => setMenuOpen(false);
  window.addEventListener("scroll", handleScroll);

  return () => window.removeEventListener("scroll", handleScroll);
}, [menuOpen]);


 const handleContactSubmit = async (e) => {
  e.preventDefault();
  const form = e.target;
  const payload = {
    name: form.name.value,
    email: form.email.value,
    message: form.message.value,
  };

  try {
    const res = await fetch("http://localhost:5000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (data.success) {
      alert(t("contact_success"));
      form.reset();
    } else {
      alert(t("contact_error"));
    }
  } catch (err) {
    console.error("❌ Contact form error:", err);
    alert("❌ An error occurred.");
  }
};



return (
  <>
    <Helmet>
  <title>{t("meta_title")}</title>
  <meta name="description" content={t("meta_desc")} />
  <meta property="og:title" content={t("meta_title")} />
  <meta property="og:description" content={t("meta_desc")} />
  <meta property="og:type" content="website" />
  <meta property="og:image" content="https://beypro.com/beypro-preview.png" />
  <meta property="og:url" content="https://beypro.com" />
</Helmet>


    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white font-sans">
      {/* NAVIGATION */}
      <nav className="h-16 md:h-20 bg-white/10 backdrop-blur-md shadow-md sticky top-0 z-50 border-b border-white/10">
  <div className="flex justify-between items-center px-6 h-full max-w-8xl mx-auto">
    <img
      src="/Beylogo.svg"
      alt="Beypro Logo"
      className="h-20 md:h-40 scale-100 -translate-y-[-6px] object-contain"
    />





    {/* Mobile Toggle */}
    <button
      className="md:hidden text-white text-2xl focus:outline-none"
      onClick={() => setMenuOpen((prev) => !prev)}
    >
      ☰
    </button>

    {/* Desktop Menu */}
    <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-white/80">
      <a href="#features" className="hover:text-fuchsia-400 transition">{t("features")}</a>
      <a href="#about" className="hover:text-fuchsia-400 transition">{t("about")}</a>
      <a href="#contact" className="hover:text-fuchsia-400 transition">{t("contact")}</a>
      <a href="/pricing" className="hover:text-fuchsia-400 transition">{t("pricing_title")}</a>
      <LanguageSwitcher />
    </div>
  </div>

  {/* Mobile Dropdown */}
  {menuOpen && (
    <div className="md:hidden bg-white/5 backdrop-blur border-t border-white/10">
      <div className="flex flex-col items-start px-6 py-4 space-y-3 text-sm font-medium text-white/90">
        <a href="#features" onClick={() => setMenuOpen(false)} className="w-full hover:text-fuchsia-400 transition">{t("features")}</a>
        <a href="#about" onClick={() => setMenuOpen(false)} className="w-full hover:text-fuchsia-400 transition">{t("about")}</a>
        <a href="#contact" onClick={() => setMenuOpen(false)} className="w-full hover:text-fuchsia-400 transition">{t("contact")}</a>
        <a href="/pricing" onClick={() => setMenuOpen(false)} className="w-full hover:text-fuchsia-400 transition">{t("pricing_title")}</a>
        <div className="pt-2">
          <LanguageSwitcher />
        </div>
      </div>
    </div>
  )}
</nav>




      {/* HERO SECTION */}
      <header className="flex flex-col items-center justify-center text-center px-6 py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-500 via-blue-500 to-transparent blur-3xl" />
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 text-transparent bg-clip-text drop-shadow-xl">
          {t("hero_title")}
        </h1>
        <p className="text-lg md:text-2xl max-w-2xl text-white/80 mb-10">
          {t("hero_desc")}
        </p>
        <a href="#contact" className="px-8 py-3 rounded-full bg-gradient-to-r from-blue-600 to-fuchsia-600 text-white font-bold shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300">
          {t("get_started")}
        </a>
      </header>

      {/* FEATURES */}
      <section id="features" className="py-24 px-6">
  <h2 className="text-4xl font-bold text-center mb-16 text-cyan-300">🚀 Features</h2>
  <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
    {/* Orders */}
    <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-md hover:shadow-lg transition-all">
      <h3 className="text-xl font-bold text-fuchsia-400 mb-2">🧾 Smart Order Handling</h3>
      <p className="text-white/80">From dine-in to delivery, orders flow live to kitchen and drivers with zero friction.</p>
    </div>

    {/* Stock AI */}
    <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-md hover:shadow-lg transition-all">
      <h3 className="text-xl font-bold text-blue-400 mb-2">📦 Live Stock & Supplier AI</h3>
      <p className="text-white/80">Track every item. Reorder automatically. Connect suppliers, avoid shortages, and reduce waste.</p>
    </div>

    {/* Staff */}
    <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-md hover:shadow-lg transition-all">
      <h3 className="text-xl font-bold text-purple-400 mb-2">👥 Staff & Payroll Automation</h3>
      <p className="text-white/80">Check-in/out logs, salary models (hourly, weekly, monthly), and auto-payroll calculations all in one place.</p>
    </div>

    {/* AI Assistant */}
    <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-md hover:shadow-lg transition-all">
      <h3 className="text-xl font-bold text-emerald-400 mb-2">🤖 AI Bey Assistant</h3>
      <p className="text-white/80">Voice-powered task automation for staff. Let AI handle reminders, reports, and alerts.</p>
    </div>

    {/* Reports */}
    <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-md hover:shadow-lg transition-all">
      <h3 className="text-xl font-bold text-yellow-300 mb-2">📊 Real-Time Reports</h3>
      <p className="text-white/80">Track profit/loss, category sales, ingredient costs, and even low-stock alerts live on your dashboard.</p>
    </div>

    {/* Integrations */}
    <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-md hover:shadow-lg transition-all">
      <h3 className="text-xl font-bold text-cyan-400 mb-2">🔌 Integrations & API</h3>
      <p className="text-white/80">From WhatsApp to Getir and Papara — connect Beypro to your ecosystem and sync effortlessly.</p>
    </div>
  </div>
</section>

      {/* ABOUT */}
      <section id="about" className="py-24 px-6">
  <h2 className="text-4xl font-bold text-center text-fuchsia-300 mb-12">{t("about_title")}</h2>
  <p className="max-w-4xl mx-auto text-center text-white/70 text-lg leading-loose">
    {t("about_desc")}
  </p>
</section>

<section id="realworld" className="py-24 px-6">
  <div className="max-w-4xl mx-auto text-center rounded-3xl border border-white/10 bg-white/10 backdrop-blur-md shadow-xl p-10">
    <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-cyan-400 drop-shadow">
      {t("realworld_title")}
    </h2>
    <p className="text-white/80 text-lg leading-relaxed">
      {t("realworld_desc")}
    </p>
    <p className="mt-6 text-sm italic text-white/60">
      {t("realworld_subtext")}
    </p>
  </div>
</section>



      {/* PRICING SECTION */}
      <section id="pricing" className="py-24 px-6 bg-gradient-to-r from-white/5 via-white/10 to-white/5 rounded-3xl mx-6 mb-12 border border-white/10 shadow-xl backdrop-blur-lg">
        <h2 className="text-4xl font-bold text-center text-blue-300 mb-14">{t("pricing_title")}</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Basic Plan */}
          <div className="rounded-2xl bg-white/10 border border-white/20 p-8 text-center shadow-lg hover:scale-[1.02] transition">
            <h3 className="text-2xl font-bold text-cyan-300 mb-2">{t("starter_title")}</h3>
            <p className="text-sm text-white/70 mb-4">{t("starter_desc")}</p>
            <div className="text-4xl font-extrabold text-white mb-6">₺299<span className="text-sm text-white/60">/mo</span></div>
            <ul className="space-y-2 text-sm text-white/80 mb-8">
              <li>✔️ {t("starter_1")}</li>
              <li>✔️ {t("starter_2")}</li>
              <li>✔️ {t("starter_3")}</li>
            </ul>
            <button className="w-full py-2 rounded-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold shadow">
              {t("choose_plan")}
            </button>
          </div>

          {/* Pro Plan */}
          <div className="rounded-2xl bg-gradient-to-tr from-purple-700/20 to-blue-700/20 border border-fuchsia-400 p-8 text-center shadow-2xl scale-105 relative z-10">
            <div className="absolute top-0 right-0 bg-fuchsia-600 text-white text-xs px-3 py-1 rounded-bl-xl font-bold tracking-wide shadow-lg">
              {t("most_popular")}
            </div>
            <h3 className="text-2xl font-bold text-fuchsia-300 mb-2">{t("pro_title")}</h3>
            <p className="text-sm text-white/70 mb-4">{t("pro_desc")}</p>
            <div className="text-4xl font-extrabold text-white mb-6">₺699<span className="text-sm text-white/60">/mo</span></div>
            <ul className="space-y-2 text-sm text-white/80 mb-8">
              <li>✔️ {t("pro_1")}</li>
              <li>✔️ {t("pro_2")}</li>
              <li>✔️ {t("pro_3")}</li>
              <li>✔️ {t("pro_4")}</li>
            </ul>
            <button className="w-full py-2 rounded-full bg-gradient-to-r from-fuchsia-500 to-purple-500 hover:brightness-110 text-white font-bold shadow">
              {t("choose_plan")}
            </button>
          </div>

          {/* Enterprise Plan */}
          <div className="rounded-2xl bg-white/10 border border-white/20 p-8 text-center shadow-lg hover:scale-[1.02] transition">
            <h3 className="text-2xl font-bold text-purple-300 mb-2">{t("enterprise_title")}</h3>
            <p className="text-sm text-white/70 mb-4">{t("enterprise_desc")}</p>
            <div className="text-4xl font-extrabold text-white mb-6">{t("contact_price")}</div>
            <ul className="space-y-2 text-sm text-white/80 mb-8">
              <li>✔️ {t("enterprise_1")}</li>
              <li>✔️ {t("enterprise_2")}</li>
              <li>✔️ {t("enterprise_3")}</li>
              <li>✔️ {t("enterprise_4")}</li>
            </ul>
            <button className="w-full py-2 rounded-full bg-purple-500 hover:bg-purple-600 text-white font-bold shadow">
              {t("request_quote")}
            </button>
          </div>
        </div>
      </section>

{/* CONTACT */}
<section id="contact" className="py-24 px-6 text-center bg-white/10 backdrop-blur-md border border-white/10 rounded-3xl mx-6 shadow-inner">
  <h2 className="text-3xl md:text-4xl font-bold text-cyan-300 mb-4">{t("contact_title")}</h2>
  <p className="mb-10 text-white/80">{t("contact_desc")}</p>

  <form
    onSubmit={handleContactSubmit}
    className="max-w-md mx-auto space-y-4 text-left"
  >
    <input
      type="text"
      name="name"
      placeholder="Your Name"
      className="w-full px-4 py-2 rounded bg-white/20 text-white placeholder-white/50"
      required
    />
    <input
      type="email"
      name="email"
      placeholder="Your Email"
      className="w-full px-4 py-2 rounded bg-white/20 text-white placeholder-white/50"
      required
    />
    <textarea
      name="message"
      placeholder="Your Message"
      className="w-full px-4 py-2 rounded bg-white/20 text-white placeholder-white/50 h-32 resize-none"
      required
    />
    <button
      type="submit"
      className="w-full py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold shadow hover:scale-105 transition"
    >
      {t("email_us")}
    </button>
  </form>

  {formMessage && <p className="text-sm mt-4 text-white/80">{formMessage}</p>}
</section>

<section id="newsletter" className="mt-14 py-12 px-8 bg-gradient-to-br from-white/5 via-white/10 to-white/5 rounded-3xl mx-6 shadow-inner border border-white/10 backdrop-blur">
  <div className="max-w-3xl mx-auto text-center">
    <h2 className="text-3xl md:text-4xl font-bold text-gradient-to-r text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-400 mb-4">
      {t("newsletter_title")}
    </h2>
    <p className="text-white/80 mb-8">{t("newsletter_desc")}</p>

    <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row items-center justify-center gap-4">
      <input
        type="email"
        name="email"
        required
        placeholder={t("newsletter_placeholder")}
        className="w-full sm:w-2/3 px-4 py-2 rounded-full bg-white/20 text-white placeholder-white/50"
      />
      <button
        type="submit"
        className="px-6 py-2 rounded-full bg-gradient-to-r from-blue-500 to-fuchsia-600 text-white font-bold shadow hover:scale-105 transition"
      >
        {t("newsletter_button")}
      </button>
    </form>

    {newsletterMsg && (
      <p className="mt-4 text-sm text-white/70">{newsletterMsg}</p>
    )}
  </div>
</section>


      {/* FOOTER */}
      <footer className="bg-white/5 backdrop-blur text-white/70 text-sm py-10 px-6 mt-20 border-t border-white/10">
  <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
    {/* Brand Info */}
    <div className="text-center md:text-left">
      <span className="font-bold text-white">Beypro</span> &copy; {new Date().getFullYear()} — {t("footer_rights")}
    </div>

    {/* Links */}
    <div className="flex items-center space-x-4">
      <a href="#features" className="hover:text-fuchsia-300 transition">{t("features")}</a>
      <a href="#about" className="hover:text-fuchsia-300 transition">{t("about")}</a>
      <a href="#contact" className="hover:text-fuchsia-300 transition">{t("contact")}</a>
      <a href="/pricing" className="hover:text-fuchsia-300 transition">{t("pricing_title")}</a>
    </div>
  </div>
</footer>

    </div>
  </>
);
}