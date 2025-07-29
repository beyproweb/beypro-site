import React from 'react';
import { Link } from 'react-router-dom';
const API_URL = import.meta.env.VITE_API_URL;
export default function Register() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white font-sans">

      {/* --- HEADER --- */}
      <nav className="h-20 bg-white/10 backdrop-blur-md shadow-md sticky top-0 z-50 border-b border-white/10">
        <div className="flex items-center justify-between px-4 md:px-8 h-full max-w-7xl mx-auto">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="/Beylogo.svg"
              alt="Beypro Logo"
              className="h-12 w-auto"
            />
          </Link>

          {/* Links */}
          <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-white/80">
            <a href="/#features" className="hover:text-fuchsia-400 transition">Features</a>
            <a href="/#about" className="hover:text-fuchsia-400 transition">About</a>
            <a href="/#pricing" className="hover:text-fuchsia-400 transition">Pricing</a>
            <a href="/#contact" className="hover:text-fuchsia-400 transition">Contact</a>
          </div>
        </div>
      </nav>


{/* --- FORM SECTION --- */}
<div className="flex flex-col items-center justify-center py-12 px-4">
  <h1 className="text-3xl md:text-4xl font-bold mb-4 text-cyan-300">Start Your 30-Day Free Trial</h1>
  <p className="mb-6 max-w-xl text-center text-white/80">
    No credit card required. Create your account and get full access to Beypro POS.
  </p>

  <form
  className="w-full max-w-md bg-white/10 p-8 rounded-2xl backdrop-blur-lg border border-white/20 shadow space-y-4"
  onSubmit={async (e) => {
    e.preventDefault();
    const form = e.target;

    const payload = {
      email: form.email.value,
      fullName: form.fullName.value,
      password: form.password.value,
      businessName: form.businessName.value,
      plan: form.plan.value,
    };

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        alert("🎉 Welcome! Redirecting to your Beypro dashboard...");
        window.location.href = "http://localhost:3000/"; // 👈 redirect to live POS dashboard
      } else {
        alert("❌ " + (data.error || "Registration failed."));
      }
    } catch (err) {
      console.error("Registration error:", err);
      alert("❌ Server error. Please try again.");
    }
  }}
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
    defaultValue=""
    required
  >
    <option value="" disabled>Choose Your Plan</option>
    <option value="starter">Starter — ₺850/mo</option>
    <option value="pro">Pro — ₺1200/mo</option>
    <option value="enterprise">Enterprise — ₺2500/mo</option>
  </select>

  <button
    type="submit"
    className="w-full py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white font-bold hover:scale-105 transition"
  >
    Start Free Trial
  </button>
</form>


  <p className="mt-6 text-sm text-white/60 text-center max-w-sm">
    Full features included. Cancel anytime before your trial ends.
  </p>
</div>

    </div>
  );
}
