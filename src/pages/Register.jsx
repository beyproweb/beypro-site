import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SubscriptionRegister() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const API_BASE =
    import.meta.env.VITE_API_URL ||
    (import.meta.env.MODE === "development"
      ? "http://localhost:5000/api"
      : "https://hurrypos-backend.onrender.com/api");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = e.target;
    const payload = {
      full_name: form.fullName.value,
      email: form.email.value,
      password: form.password.value,
      business_name: form.businessName.value,
      subscription_plan: form.plan.value,
    };

    try {
      // 1️⃣ Register user
      const registerRes = await fetch(`${API_BASE}/subscription/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const regData = await registerRes.json();

      if (!regData.success) {
        throw new Error(regData.error || "Registration failed");
      }

      // 2️⃣ Auto-login after successful register
      const loginRes = await fetch(`${API_BASE}/subscription/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
        }),
      });
      const loginData = await loginRes.json();

      if (!loginData.success || !loginData.token) {
        throw new Error("Login failed after registration");
      }

      // 3️⃣ Save token & user
      localStorage.setItem("token", loginData.token);
      localStorage.setItem("beyproUser", JSON.stringify(loginData.user));
      localStorage.setItem("restaurant_id", loginData.user.restaurant_id);

      // 4️⃣ Redirect
      alert("🎉 Welcome to Beypro! Redirecting...");
      window.location.href = "https://pos.beypro.com/dashboard";
    } catch (err) {
      console.error("❌ Subscription error:", err);
      setError(err.message || "Subscription failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white font-sans">
      {/* --- HEADER --- */}
      <nav className="h-20 bg-white/10 backdrop-blur-md shadow-md sticky top-0 z-50 border-b border-white/10">
        <div className="flex items-center justify-between px-4 md:px-8 h-full max-w-7xl mx-auto">
          <Link to="/" className="flex items-center">
            <img src="/Beylogo.svg" alt="Beypro Logo" className="h-12 w-auto" />
          </Link>
          <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-white/80">
            <a href="/#features" className="hover:text-fuchsia-400">Features</a>
            <a href="/#pricing" className="hover:text-fuchsia-400">Pricing</a>
            <a href="/#contact" className="hover:text-fuchsia-400">Contact</a>
          </div>
        </div>
      </nav>

      {/* --- FORM --- */}
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-cyan-300">
          Start Your Beypro Subscription
        </h1>
        <p className="mb-6 max-w-xl text-center text-white/80">
          Subscribe and get instant access to Beypro POS — manage your business smarter.
        </p>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white/10 p-8 rounded-2xl backdrop-blur-lg border border-white/20 shadow space-y-4"
        >
          <input
            type="text"
            name="fullName"
            placeholder="Your Full Name"
            className="w-full px-4 py-2 rounded bg-white/20 text-white placeholder-white/50"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="w-full px-4 py-2 rounded bg-white/20 text-white placeholder-white/50"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Create Password"
            className="w-full px-4 py-2 rounded bg-white/20 text-white placeholder-white/50"
            required
          />
          <input
            type="text"
            name="businessName"
            placeholder="Business Name"
            className="w-full px-4 py-2 rounded bg-white/20 text-white placeholder-white/50"
            required
          />
          <select
            name="plan"
            className="w-full px-4 py-2 rounded bg-white/20 text-white"
            required
          >
            <option value="" disabled>
              Choose Your Plan
            </option>
            <option value="starter">Starter — ₺850/mo</option>
            <option value="pro">Pro — ₺1200/mo</option>
            <option value="enterprise">Enterprise — ₺2500/mo</option>
          </select>

          {error && (
            <p className="text-red-400 bg-red-900/40 px-3 py-2 rounded-md text-sm">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white font-bold hover:scale-105 transition disabled:opacity-50"
          >
            {loading ? "Processing..." : "🚀 Subscribe & Login"}
          </button>
        </form>

        <p className="mt-6 text-sm text-white/60 text-center max-w-sm">
          You’ll be automatically logged in after subscribing.
        </p>
      </div>
    </div>
  );
}
