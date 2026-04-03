import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import MainNav from "../components/MainNav.jsx";
import { getApiBase } from "../lib/apiBase.js";

export default function StandaloneStaffRegister() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const API_BASE = getApiBase();
  const [form, setForm] = useState({
    fullName: "",
    businessName: "",
    email: "",
    phone: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const normalizedEmail = String(form.email || "").trim().toLowerCase();
      const res = await fetch(`${API_BASE}/standalone/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: form.fullName,
          business_name: form.businessName,
          email: normalizedEmail,
          password: form.password,
          phone: form.phone,
          planKey: "staff",
        }),
      });

      const raw = await res.text();
      const data = raw ? JSON.parse(raw) : null;
      if (!res.ok || !data?.token) {
        throw new Error(data?.error || "Registration failed");
      }

      const targetBase =
        import.meta.env.MODE === "development"
          ? "http://localhost:5173"
          : "https://pos.beypro.com";
      const next = "/standalone/staff";
      const redirectUrl = `${targetBase}/standalone/redirect?next=${encodeURIComponent(
        next
      )}&token=${encodeURIComponent(data.token)}`;
      window.location.href = redirectUrl;
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-slate-200">
        <MainNav tone="dark" />
      </div>

      <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-10 px-6 py-14">
        <div className="bg-slate-900 text-white rounded-2xl p-10 shadow-2xl">
          <div className="text-xs uppercase tracking-[0.35em] text-white/60">Beypro</div>
          <h1 className="mt-3 text-4xl font-bold">{t("staff_standalone_title")}</h1>
          <p className="mt-4 text-white/80 text-sm leading-relaxed">{t("staff_standalone_hero_desc")}</p>
          <ul className="mt-8 space-y-2 text-sm text-white/80">
            <li>• {t("staff_standalone_f1")}</li>
            <li>• {t("staff_standalone_f2")}</li>
            <li>• {t("staff_standalone_f3")}</li>
            <li>• {t("staff_standalone_f4")}</li>
          </ul>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
          <h2 className="text-2xl font-bold text-slate-900">{t("staff_standalone_register_title")}</h2>
          <p className="text-sm text-slate-500 mt-1">{t("staff_standalone_register_sub")}</p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <input
              name="businessName"
              value={form.businessName}
              onChange={handleChange}
              placeholder={t("company_name")}
              className="w-full p-3 border border-slate-300 rounded-lg"
              required
            />
            <input
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder={t("full_name")}
              className="w-full p-3 border border-slate-300 rounded-lg"
              required
            />
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder={t("phone")}
              className="w-full p-3 border border-slate-300 rounded-lg"
              required
            />
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder={t("email")}
              className="w-full p-3 border border-slate-300 rounded-lg"
              required
            />
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder={t("password")}
              className="w-full p-3 border border-slate-300 rounded-lg"
              required
            />

            {error && (
              <div className="text-red-600 text-sm bg-red-50 px-3 py-2 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition disabled:opacity-60"
            >
              {loading ? t("creating") : t("start_15_day_trial")}
            </button>
          </form>

          <p className="text-sm text-gray-600 mt-4">
            {t("already_have_account")}{" "}
            <Link className="text-indigo-600 font-semibold" to="/standalone/staff/login">
              {t("sign_in")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
