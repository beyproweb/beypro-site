import React from "react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./components/LanguageSwitcher";
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";
import Carousel from "./components/Carousel";
const logoUrl = "/Beylogo.svg";

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
    {/* --- SEO Helmet --- */}
    <Helmet>
      <title>{t("meta_title")}</title>
      <meta name="description" content={t("meta_desc")} />
      <meta property="og:title" content={t("meta_title")} />
      <meta property="og:description" content={t("meta_desc")} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://beypro.com/beypro-preview.png" />
      <meta property="og:url" content="https://beypro.com" />
    </Helmet>

    {/* --- BG --- */}
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white font-sans">

      {/* --- NAVIGATION --- */}
      <nav className="h-20 md:h-20 bg-white/10 backdrop-blur-md shadow-md sticky top-0 z-50 border-b border-white/10">
        <div className="flex items-center justify-between px-4 md:px-8 h-full max-w-8xl mx-auto w-full">

          {/* Logo: left on desktop, centered on mobile, size fixed */}
          <div className="flex-1 flex md:justify-start justify-center items-center">
           <img
  src={logoUrl}
  alt="Beypro Logo"
  className="h-14 w-auto mt-[12px] ml-[-24px]"
/>

          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-white/80">
            <a href="#features" className="hover:text-fuchsia-400 transition">{t("features Shai")}</a>
            <a href="#about" className="hover:text-fuchsia-400 transition">{t("about")}</a>
            <a href="#contact" className="hover:text-fuchsia-400 transition">{t("contact")}</a>
            <a href="#pricing" className="hover:text-fuchsia-400 transition">{t("pricing_title")}</a>
            <LanguageSwitcher />
          </div>

          {/* Mobile Toggle */}
          <div className="ml-auto md:hidden flex-1 flex justify-end">
            <button
              className="text-white text-2xl focus:outline-none"
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              ☰
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white text-black py-8 px-6 border-t border-white/20 shadow-xl">
            <div className="flex flex-col items-center justify-center gap-4 text-sm font-semibold text-center">
              <a href="#features" onClick={() => setMenuOpen(false)} className="w-full py-2 px-4 rounded-full bg-gradient-to-r from-blue-400 to-cyan-500 text-white shadow hover:scale-105 transition">{t("features")}</a>
              <a href="#about" onClick={() => setMenuOpen(false)} className="w-full py-2 px-4 rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white shadow hover:scale-105 transition">{t("about")}</a>
              <a href="#contact" onClick={() => setMenuOpen(false)} className="w-full py-2 px-4 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow hover:scale-105 transition">{t("contact")}</a>
              <a href="#pricing" onClick={() => setMenuOpen(false)} className="w-full py-2 px-4 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow hover:scale-105 transition">{t("pricing_title")}</a>
              <div className="pt-4"><LanguageSwitcher /></div>
            </div>
          </div>
        )}
      </nav>

      {/* --- CAROUSEL HERO --- */}
      <Carousel />


      {/* --- FEATURES --- */}
<section id="features" className="pt-4 pb-4 px-4 sm:px-6">
        <h2 className="text-4xl font-bold text-center mb-12 text-cyan-300">Features</h2>
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {/* Loop through more detailed features from your folder */}
          {[
            { icon: "🧾", color: "text-fuchsia-400", title: "Smart Order Handling", desc: "Table, takeaway & delivery — orders flow live to kitchen & drivers." },
            { icon: "📦", color: "text-blue-400", title: "Live Stock & Supplier AI", desc: "Track ingredients, automate reorders, connect suppliers, avoid shortages." },
            { icon: "👥", color: "text-purple-400", title: "Staff & Payroll Automation", desc: "Check-in/out, shift scheduling, auto salary for any model." },
            { icon: "🤖", color: "text-emerald-400", title: "AI Bey Assistant", desc: "Voice-powered staff task automation: reminders, reports, alerts." },
            { icon: "📊", color: "text-yellow-300", title: "Real-Time Reports", desc: "Profit/loss, sales trends, cost, category, live KPI dashboard." },
            { icon: "🔗", color: "text-cyan-400", title: "Integrations & API", desc: "WhatsApp, Getir, Papara & more. Connect all your systems." },
            { icon: "🍳", color: "text-pink-300", title: "Kitchen Display", desc: "Digital kitchen tickets, real-time status, auto-assign to stations." },
            { icon: "🚗", color: "text-green-400", title: "Driver App", desc: "Live route, order tracking, performance stats for your couriers." },
            { icon: "💸", color: "text-purple-200", title: "Supplier Payments", desc: "Send, track and auto-confirm supplier payments with 1 click." },
            { icon: "💳", color: "text-fuchsia-300", title: "Advanced POS Payments", desc: "Multi-method: credit, cash, QR, Papara, IBAN auto-detect." },
            { icon: "📱", color: "text-blue-300", title: "Mobile First", desc: "Fully responsive, lightning fast — works on any device." },
            { icon: "🔒", color: "text-orange-400", title: "Enterprise Security", desc: "Roles, PINs, multi-location, audit logs, GDPR ready." },
            { icon: "⚙️", color: "text-emerald-200", title: "Ingredient Price Tracking", desc: "Auto-track ingredient price changes, get cost alerts." },
            { icon: "📈", color: "text-blue-200", title: "Profit/Loss Analyzer", desc: "Visualize net profit, best-sellers, real-time margin insights." },
            { icon: "📦", color: "text-yellow-200", title: "Inventory Links", desc: "See live inventory per product, connect sales to stock instantly." },
            { icon: "🧑‍🍳", color: "text-pink-200", title: "Staff Roles & Permissions", desc: "Custom permissions for every staff member and role." },
          ].map((f, i) => (
            <div key={i} className="p-6 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-md hover:shadow-lg transition-all flex flex-col items-center text-center">
              <div className={`text-4xl mb-2 ${f.color}`}>{f.icon}</div>
              <h3 className="text-lg font-bold mb-1">{f.title}</h3>
              <p className="text-white/80 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- ABOUT --- */}
<section id="about" className="py-12 px-8 sm:px-6">
  <h2 className="text-4xl font-bold text-center text-fuchsia-300 mb-10">{t("about_title")}</h2>
  <div className="max-w-8xl xl:max-w-6xl mx-auto bg-gradient-to-br from-[#0f0c29]/80 via-[#302b63]/70 to-fuchsia-700/70 border border-fuchsia-300/20 backdrop-blur-xl shadow-2xl rounded-3xl p-5 sm:p-8 md:p-10 text-white/90 text-base sm:text-lg">
    <p className="mb-4">
      <span className="font-bold text-fuchsia-200">Beypro</span> isn’t just a POS — it’s your restaurant’s complete command center, unifying everything from orders to payments in one seamless system.
    </p>
    <p className="mb-4">
      Every feature is <span className="font-semibold text-cyan-300">built, tested, and perfected</span> in a real restaurant. No theory — every screen and button is shaped by daily service and true business needs.
    </p>
    <p className="mb-4">
      From chaotic rush hours to slow days, Beypro is designed to handle real-world restaurant challenges so you can focus on your guests.
    </p>
    <p className="mb-4">
      Staff, kitchen, delivery, inventory, reporting, integrations — everything you need, zero mess, zero spreadsheets.
    </p>
    <p className="mb-4">
      Built for Turkey’s unique market, Beypro comes with local integrations and full multi-language support.
    </p>
    <p className="italic text-cyan-200 mt-6 flex items-center gap-2">
      <span>🍽️</span>
      <span>Built, tested & perfected in a real restaurant. Proven by daily use — not just theory.</span>
    </p>
  </div>
</section>





      {/* --- PRICING --- */}
      <section id="pricing" className="py-16 px-4 sm:px-6 bg-gradient-to-r from-white/5 via-white/10 to-white/5 rounded-3xl mx-2 sm:mx-6 mb-12 border border-white/10 shadow-xl backdrop-blur-lg">
        <h2 className="text-4xl font-bold text-center text-blue-300 mb-14">{t("pricing_title")}</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Starter */}
          <div className="rounded-2xl bg-white/10 border border-white/20 p-8 text-center shadow-lg hover:scale-[1.02] transition flex flex-col">
            <h3 className="text-2xl font-bold text-cyan-300 mb-2">Starter</h3>
            <p className="text-sm text-white/70 mb-4">Perfect for new, small or single-location restaurants.</p>
            <div className="text-4xl font-extrabold text-white mb-6">₺850<span className="text-sm text-white/60">/mo</span></div>
            <ul className="space-y-2 text-sm text-white/80 mb-8 text-left mx-auto max-w-xs">
              <li>✔️ POS, table & kitchen system</li>
              <li>✔️ 1 location & unlimited staff</li>
              <li>✔️ Basic reports & analytics</li>
              <li>✔️ Staff management</li>
              <li>✔️ Basic integrations (QR menu, WhatsApp)</li>
            </ul>
            <button className="w-full py-2 rounded-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold shadow">
              {t("choose_plan")}
            </button>
          </div>

          {/* Pro */}
          <div className="rounded-2xl bg-gradient-to-tr from-purple-700/20 to-blue-700/20 border border-fuchsia-400 p-8 text-center shadow-2xl scale-105 relative z-10 flex flex-col">
            <div className="absolute top-0 right-0 bg-fuchsia-600 text-white text-xs px-3 py-1 rounded-bl-xl font-bold tracking-wide shadow-lg">{t("most_popular")}</div>
            <h3 className="text-2xl font-bold text-fuchsia-300 mb-2">Pro</h3>
            <p className="text-sm text-white/70 mb-4">For fast-growing, multi-service restaurants and takeaways.</p>
            <div className="text-4xl font-extrabold text-white mb-6">₺1200<span className="text-sm text-white/60">/mo</span></div>
            <ul className="space-y-2 text-sm text-white/80 mb-8 text-left mx-auto max-w-xs">
              <li>✔️ All Starter features</li>
              <li>✔️ Live stock & supplier AI</li>
              <li>✔️ Full analytics, advanced reports</li>
              <li>✔️ Kitchen display & driver app</li>
              <li>✔️ Ingredient price tracking</li>
              <li>✔️ Papara & Getir integrations</li>
              <li>✔️ Advanced permissions</li>
            </ul>
            <button className="w-full py-2 rounded-full bg-gradient-to-r from-fuchsia-500 to-purple-500 hover:brightness-110 text-white font-bold shadow">
              {t("choose_plan")}
            </button>
          </div>

          {/* Enterprise */}
          <div className="rounded-2xl bg-white/10 border border-white/20 p-8 text-center shadow-lg hover:scale-[1.02] transition flex flex-col">
            <h3 className="text-2xl font-bold text-purple-300 mb-2">Enterprise</h3>
            <p className="text-sm text-white/70 mb-4">Full power for chains, franchises, and custom projects.</p>
            <div className="text-4xl font-extrabold text-white mb-6">₺2500<span className="text-sm text-white/60">/mo</span></div>
            <ul className="space-y-2 text-sm text-white/80 mb-8 text-left mx-auto max-w-xs">
              <li>✔️ All Pro features</li>
              <li>✔️ Multi-branch support</li>
              <li>✔️ Priority onboarding</li>
              <li>✔️ Dedicated account manager</li>
              <li>✔️ Custom integrations & API access</li>
            </ul>
            <button className="w-full py-2 rounded-full bg-purple-500 hover:bg-purple-600 text-white font-bold shadow">
              {t("request_quote")}
            </button>
          </div>
        </div>
      </section>

      {/* --- CONTACT --- */}
      <section id="contact" className="py-24 px-4 sm:px-6 text-center bg-white/10 backdrop-blur-md border border-white/10 rounded-3xl mx-2 sm:mx-6 shadow-inner">
        <h2 className="text-3xl md:text-4xl font-bold text-cyan-300 mb-4">{t("contact_title")}</h2>
        <p className="mb-8 text-white/80">{t("contact_desc")}</p>
        <form
          onSubmit={handleContactSubmit}
          className="max-w-md mx-auto space-y-4 text-left"
        >
          <input type="text" name="name" placeholder="Your Name" className="w-full px-4 py-2 rounded bg-white/20 text-white placeholder-white/50" required />
          <input type="email" name="email" placeholder="Your Email" className="w-full px-4 py-2 rounded bg-white/20 text-white placeholder-white/50" required />
          <textarea name="message" placeholder="Your Message" className="w-full px-4 py-2 rounded bg-white/20 text-white placeholder-white/50 h-32 resize-none" required />
          <button type="submit" className="w-full py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold shadow hover:scale-105 transition">
            {t("email_us")}
          </button>
        </form>
        {formMessage && <p className="text-sm mt-4 text-white/80">{formMessage}</p>}
      </section>

      {/* --- NEWSLETTER --- */}
      <section id="newsletter" className="mt-14 py-12 px-8 bg-gradient-to-br from-white/5 via-white/10 to-white/5 rounded-3xl mx-2 sm:mx-6 shadow-inner border border-white/10 backdrop-blur">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-400 mb-4">{t("newsletter_title")}</h2>
          <p className="text-white/80 mb-8">{t("newsletter_desc")}</p>
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <input type="email" name="email" required placeholder={t("newsletter_placeholder")} className="w-full sm:w-2/3 px-4 py-2 rounded-full bg-white/20 text-white placeholder-white/50" />
            <button type="submit" className="px-6 py-2 rounded-full bg-gradient-to-r from-blue-500 to-fuchsia-600 text-white font-bold shadow hover:scale-105 transition">
              {t("newsletter_button")}
            </button>
          </form>
          {newsletterMsg && (<p className="mt-4 text-sm text-white/70">{newsletterMsg}</p>)}
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-white/5 backdrop-blur text-white/70 text-sm py-10 px-6 mt-20 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <span className="font-bold text-white">Beypro</span> &copy; {new Date().getFullYear()} — {t("footer_rights")}
          </div>
          <div className="flex items-center space-x-4">
            <a href="#features" className="hover:text-fuchsia-300 transition">{t("features")}</a>
            <a href="#about" className="hover:text-fuchsia-300 transition">{t("about")}</a>
            <a href="#contact" className="hover:text-fuchsia-300 transition">{t("contact")}</a>
            <a href="#pricing" className="hover:text-fuchsia-300 transition">{t("pricing_title")}</a>
          </div>
        </div>
      </footer>
    </div>
  </>
);
}