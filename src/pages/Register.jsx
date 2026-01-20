import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Rocket } from "lucide-react";
import MainNav from "../components/MainNav.jsx";
import { getApiBase } from "../lib/apiBase.js";

export default function Register() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    businessName: "",
    phone: "",
    posLocation: "",
    usageType: "",
    efatura: false,
    invoiceTitle: "",
    taxOffice: "",
    invoiceType: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    billingCycle: "monthly",
    plan: "trial",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const API_BASE = getApiBase();


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
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
      const registerUrl = `${API_BASE}/register`;
      console.log("📡 Sending registration request to:", registerUrl);

      const registerRes = await fetch(registerUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: form.fullName,
          email: normalizedEmail,
          password: form.password,
          business_name: form.businessName,
          subscription_plan: form.plan,
        }),
      });
      const regText = await registerRes.text();
      let regData;
      try {
        regData = regText ? JSON.parse(regText) : null;
      } catch {
        regData = null;
      }

      if (!registerRes.ok || !regData?.success) {
        console.error("❌ /register failed", {
          url: registerUrl,
          status: registerRes.status,
          body: regText?.slice(0, 300),
        });
        throw new Error(regData?.error || `Registration failed [${registerRes.status}]`);
      }

      const loginUrl = `${API_BASE}/login`;
      console.log("📡 Auto-login after registration:", loginUrl);

      const loginRes = await fetch(loginUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: normalizedEmail, password: form.password }),
      });
      const loginText = await loginRes.text();
      let loginData;
      try {
        loginData = loginText ? JSON.parse(loginText) : null;
      } catch {
        loginData = null;
      }

      if (!loginRes.ok || !loginData?.success || !loginData?.token) {
        console.error("❌ /login after register failed", {
          url: loginUrl,
          status: loginRes.status,
          body: loginText?.slice(0, 300),
        });
        throw new Error(
          loginData?.error ||
            "Login failed after registration"
        );
      }

      localStorage.setItem("token", loginData.token);
      localStorage.setItem("beyproUser", JSON.stringify(loginData.user));
      localStorage.setItem("restaurant_id", loginData.user.restaurant_id);

      alert("🎉 Welcome to Beypro! Redirecting...");
      window.location.href = "https://pos.beypro.com/dashboard";
    } catch (err) {
      console.error("❌ Registration error:", err);
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
      {/* ===== LEFT (Brand section — shows top on mobile) ===== */}
      <div className="hidden lg:flex flex-col items-center justify-center w-1/2 
  bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white 
  p-10 relative overflow-hidden sticky top-0 h-screen">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-600/5 via-indigo-600/5 to-transparent"></div>

        <div className="relative z-10 text-center space-y-4 md:space-y-6 max-w-md mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            Beypro
          </h1>
          <p className="text-lg md:text-xl text-slate-300 font-light leading-relaxed">
            Restaurant management reimagined. Start your free 30-day trial today.
          </p>
          <div className="mt-8 inline-block p-4 rounded-2xl bg-gradient-to-br from-sky-500/10 to-indigo-600/10 border border-sky-500/20">
            <div className="text-5xl">🍽️</div>
          </div>
          <footer className="mt-12 text-sm text-slate-500">
            © {new Date().getFullYear()} Beypro — Transform Your Restaurant
          </footer>
        </div>
      </div>

      {/* ===== RIGHT (Form section) ===== */}
      <div className="flex flex-col items-center justify-center w-full lg:w-1/2 bg-white px-4 sm:px-6 md:px-10 py-10 overflow-y-auto">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-10 border border-slate-200">
          <div className="text-center mb-6 md:mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              Get Started Free
            </h2>
            <p className="text-slate-600 mt-2 text-sm md:text-base leading-relaxed">
              Create your account and unlock all features for 30 days—no card required.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            <input
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full p-3 border border-slate-300 rounded-lg text-sm md:text-base focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
              required
            />
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="w-full p-3 border border-slate-300 rounded-lg text-sm md:text-base focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
              required
            />
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full p-3 border border-slate-300 rounded-lg text-sm md:text-base focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
              required
            />
            <input
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="w-full p-3 border border-slate-300 rounded-lg text-sm md:text-base focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
              required
            />
            <input
              name="businessName"
              value={form.businessName}
              onChange={handleChange}
              placeholder="Business Name"
              className="w-full p-3 border border-slate-300 rounded-lg text-sm md:text-base focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
              required
            />
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full p-3 border border-slate-300 rounded-lg text-sm md:text-base focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
            />
            <input
              name="posLocation"
              value={form.posLocation}
              onChange={handleChange}
              placeholder="POS Location / City"
              className="w-full p-3 border border-slate-300 rounded-lg text-sm md:text-base focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
            />
            <select
              name="usageType"
              value={form.usageType}
              onChange={handleChange}
              className="w-full p-3 border border-slate-300 rounded-lg text-sm md:text-base focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
            >
              <option value="">Select POS Usage Type</option>
              <option value="restaurant">Restaurant</option>
              <option value="cafe">Cafe</option>
              <option value="retail">Retail</option>
            </select>

            {/* e-Fatura */}
            <label className="flex items-center gap-2 mt-3">
              <input
                type="checkbox"
                name="efatura"
                checked={form.efatura}
                onChange={handleChange}
                className="w-5 h-5 text-sky-600 border-slate-300 rounded"
              />
              <span className="text-slate-700 text-sm md:text-base font-medium">
                Enable e-Fatura / e-Arşiv
              </span>
            </label>

            {form.efatura && (
              <>
                <input
                  name="invoiceTitle"
                  value={form.invoiceTitle}
                  onChange={handleChange}
                  placeholder="Invoice Title"
                  className="w-full p-3 border border-slate-300 rounded-lg text-sm md:text-base focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
                />
                <input
                  name="taxOffice"
                  value={form.taxOffice}
                  onChange={handleChange}
                  placeholder="Tax Office"
                  className="w-full p-3 border border-slate-300 rounded-lg text-sm md:text-base focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
                />
                <select
                  name="invoiceType"
                  value={form.invoiceType}
                  onChange={handleChange}
                  className="w-full p-3 border border-slate-300 rounded-lg text-sm md:text-base focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
                >
                  <option value="">Select Invoice Type</option>
                  <option value="bireysel">Individual</option>
                  <option value="kurumsal">Corporate</option>
                </select>
              </>
            )}

            {/* Credit Card */}
            <h3 className="font-bold text-slate-900 mt-6 text-base md:text-lg">
              Payment Information
            </h3>
            <input
              name="cardNumber"
              value={form.cardNumber}
              onChange={handleChange}
              placeholder="Card Number"
              className="w-full p-3 border border-slate-300 rounded-lg text-sm md:text-base focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
            />
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                name="expiry"
                value={form.expiry}
                onChange={handleChange}
                placeholder="MM/YY"
                className="w-full sm:w-1/2 p-3 border border-slate-300 rounded-lg text-sm md:text-base focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
              />
              <input
                name="cvv"
                value={form.cvv}
                onChange={handleChange}
                placeholder="CVV"
                className="w-full sm:w-1/2 p-3 border border-slate-300 rounded-lg text-sm md:text-base focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
              />
            </div>

            {/* Plan + Billing */}
            <div className="flex flex-col sm:flex-row justify-between gap-3 mt-6">
              <select
                name="plan"
                value={form.plan}
                onChange={handleChange}
                className="flex-1 p-3 border border-slate-300 rounded-lg text-sm md:text-base focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
              >
                <option value="trial">Trial — 30 Days Free</option>
                <option value="basic">Basic — ₺600/mo</option>
                <option value="pro">Pro — ₺1200/mo</option>
                <option value="enterprise">Enterprise — ₺2200/mo</option>
              </select>
              <select
                name="billingCycle"
                value={form.billingCycle}
                onChange={handleChange}
                className="flex-1 p-3 border border-slate-300 rounded-lg text-sm md:text-base focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
              >
                <option value="monthly">Monthly Billing</option>
                <option value="yearly">Yearly Billing</option>
              </select>
            </div>

            {error && (
              <p className="text-red-600 text-sm font-medium bg-red-50 px-4 py-3 rounded-lg border border-red-200">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 mt-3 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all disabled:opacity-60"
            >
              <Rocket size={18} />
              {loading ? "Creating Account..." : "Start Free Trial"}
            </button>
          </form>

          <p className="text-center text-xs text-slate-600 mt-10">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-sky-600 hover:text-sky-700 font-semibold"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
      </div>
    </div>
  );
}
