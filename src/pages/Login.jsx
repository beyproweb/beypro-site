import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_RAW =
    import.meta.env.VITE_API_URL ||
    (import.meta.env.MODE === "development"
      ? "http://localhost:5000/api"
      : "https://hurrypos-backend.onrender.com/api");

  const API_URL = String(API_RAW)
    .replace(/\/api\/?$/, "")
    .replace(/\/+$/, "") + "/api";

  const POS_URL =
    import.meta.env.VITE_POS_URL || "http://localhost:3000";

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok || !data?.token) {
        throw new Error(data?.error || "Invalid credentials");
      }

      const user = data.user?.user || data.user || {};
      const restaurant_id = user.restaurant_id;

      // Save token + tenant info
      localStorage.setItem("token", data.token);
      if (restaurant_id) localStorage.setItem("restaurant_id", restaurant_id);
      localStorage.setItem(
        "beyproUser",
        JSON.stringify({
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role || "staff",
          restaurant_id,
          token: data.token,
        })
      );

      alert("✅ Login successful! Redirecting...");

      // ✅ Tenant-safe redirect
      const tenantUrl = restaurant_id
        ? `${POS_URL}/dashboard?identifier=${encodeURIComponent(restaurant_id)}`
        : `${POS_URL}/dashboard`;
      window.location.href = tenantUrl;
    } catch (err) {
      console.error("Login failed:", err);
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white font-sans">
      {/* --- HEADER --- */}
      <nav className="h-20 bg-white/10 backdrop-blur-md shadow-md sticky top-0 z-50 border-b border-white/10">
        <div className="flex items-center justify-between px-4 md:px-8 h-full max-w-7xl mx-auto">
          <Link to="/" className="flex items-center">
            <img src="/Beylogo.svg" alt="Beypro Logo" className="h-12 w-auto" />
          </Link>
          <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-white/80">
            <a href="/#features" className="hover:text-fuchsia-400 transition">Features</a>
            <a href="/#about" className="hover:text-fuchsia-400 transition">About</a>
            <a href="/#pricing" className="hover:text-fuchsia-400 transition">Pricing</a>
            <a href="/#contact" className="hover:text-fuchsia-400 transition">Contact</a>
            <Link
              to="/register"
              className="ml-4 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold shadow hover:scale-105 transition"
            >
              Register
            </Link>
          </div>
        </div>
      </nav>

      {/* --- LOGIN FORM --- */}
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-cyan-300">
          Login to Beypro
        </h1>
        <p className="mb-6 max-w-xl text-center text-white/80">
          Enter your email and password to access your Beypro dashboard.
        </p>
        <form
          className="w-full max-w-md bg-white/10 p-8 rounded-2xl backdrop-blur-lg border border-white/20 shadow space-y-4"
          onSubmit={handleLogin}
        >
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
            placeholder="Password"
            className="w-full px-4 py-2 rounded bg-white/20 text-white placeholder-white/50"
            required
          />
          {error && (
            <p className="text-red-400 text-sm font-semibold text-center">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white font-bold hover:scale-105 transition disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="mt-6 text-sm text-white/60 text-center max-w-sm">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="underline text-cyan-300 hover:text-fuchsia-400">
            Start your free trial
          </Link>
        </p>
      </div>
    </div>
  );
}
