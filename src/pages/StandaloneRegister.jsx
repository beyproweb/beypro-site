import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import MainNav from "../components/MainNav.jsx";
import { getApiBase } from "../lib/apiBase.js";

export default function StandaloneRegister() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    businessName: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const API_BASE = getApiBase();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const normalizedEmail = String(form.email || "").trim().toLowerCase();
    if (!normalizedEmail) {
      setError("Email is required");
      setLoading(false);
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const registerRes = await fetch(`${API_BASE}/standalone/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: form.fullName,
          email: normalizedEmail,
          password: form.password,
          business_name: form.businessName,
        }),
      });

      const raw = await registerRes.text();
      const data = raw ? JSON.parse(raw) : null;
      if (!registerRes.ok || !data?.token) {
        throw new Error(data?.error || "Registration failed");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("beyproUser", JSON.stringify(data.user));
      if (data.user?.restaurant_id) {
        localStorage.setItem("restaurant_id", data.user.restaurant_id);
      }

      const isDev = import.meta.env.MODE === "development";
      window.location.href = isDev
        ? "http://localhost:5173/standalone/app"
        : "https://pos.beypro.com/standalone/app";
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-slate-200">
        <MainNav tone="dark" />
      </div>

      <div className="w-full flex flex-col lg:flex-row">
        <div className="hidden lg:flex flex-col items-center justify-center w-1/2 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white p-10 sticky top-0 h-screen">
          <div className="text-center space-y-4 max-w-md mx-auto">
            <h1 className="text-5xl font-bold tracking-tight">QR Menu + Kitchen</h1>
            <p className="text-lg text-slate-300">
              15 days free, then <span className="font-semibold">₺99 / month</span>.
            </p>
            <div className="mt-8 inline-block p-4 rounded-2xl bg-white/10 border border-white/10">
              <div className="text-5xl">📱🍳</div>
            </div>
            <footer className="mt-12 text-sm text-slate-400">
              © {new Date().getFullYear()} Beypro
            </footer>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center w-full lg:w-1/2 bg-white px-4 sm:px-6 md:px-10 py-10">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-10 border border-slate-200">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-slate-900">Start Free Trial</h2>
              <p className="text-slate-600 mt-2 text-sm">
                15 days free for QR Menu + Kitchen. Then ₺99/month.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full p-3 border border-slate-300 rounded-lg"
                required
              />
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="w-full p-3 border border-slate-300 rounded-lg"
                required
              />
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full p-3 border border-slate-300 rounded-lg"
                required
              />
              <input
                name="confirmPassword"
                type="password"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                className="w-full p-3 border border-slate-300 rounded-lg"
                required
              />
              <input
                name="businessName"
                value={form.businessName}
                onChange={handleChange}
                placeholder="Business Name"
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
                {loading ? "Creating Account..." : "Start 15-Day Trial"}
              </button>
            </form>

            <p className="text-sm text-gray-600 mt-4 text-center">
              Prefer the full POS?{" "}
              <Link className="text-indigo-600 font-semibold" to="/register">
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
