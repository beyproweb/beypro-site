import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import MainNav from "../components/MainNav.jsx";
import { getApiBase } from "../lib/apiBase.js";

export default function StandaloneStaffLogin() {
  const API_BASE = getApiBase();
  const { t } = useTranslation();
  const [form, setForm] = useState({ email: "", password: "" });
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
      const res = await fetch(`${API_BASE}/standalone/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: normalizedEmail, password: form.password, planKey: "staff" }),
      });

      const raw = await res.text();
      const data = raw ? JSON.parse(raw) : null;
      if (!res.ok || !data?.token) {
        throw new Error(data?.error || "Login failed");
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
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-slate-200">
        <MainNav tone="dark" />
      </div>

      <div className="max-w-3xl mx-auto px-6 py-14">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
          <h1 className="text-3xl font-bold text-slate-900">{t("staff_standalone_login_title")}</h1>
          <p className="text-sm text-slate-500 mt-1">{t("staff_standalone_login_sub")}</p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
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
              {loading ? t("signing_in") : t("sign_in")}
            </button>
          </form>

          <p className="text-sm text-gray-600 mt-4">
            {t("dont_have_account")}{" "}
            <Link className="text-indigo-600 font-semibold" to="/standalone/staff/register">
              {t("register")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
