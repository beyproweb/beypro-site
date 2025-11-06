import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Rocket } from "lucide-react";

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

  const API_BASE =
    import.meta.env.VITE_API_URL ||
    (import.meta.env.MODE === "development"
      ? "http://localhost:5000/api"
      : "https://hurrypos-backend.onrender.com/api");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      // Register
      const registerRes = await fetch(`${API_BASE}/subscription/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: form.fullName,
          email: form.email,
          password: form.password,
          business_name: form.businessName,
          subscription_plan: form.plan,
        }),
      });
      const regData = await registerRes.json();
      if (!regData.success) throw new Error(regData.error || "Registration failed");

      // Auto login
      const loginRes = await fetch(`${API_BASE}/subscription/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });
      const loginData = await loginRes.json();
      if (!loginData.success || !loginData.token)
        throw new Error("Login failed after registration");

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
    <div className="flex flex-col lg:flex-row h-screen w-screen bg-gray-50">
      {/* LEFT - Brand Gradient */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-500 text-white items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(255,255,255,0.1),_transparent_70%)]"></div>
        <div className="relative z-10 text-center px-10">
          <h1 className="text-6xl font-extrabold tracking-tight mb-4 drop-shadow-md">
            Beypro
          </h1>
          <p className="text-lg font-light opacity-90">
            Level up your business — start your 30-day trial now.
          </p>
          <img
            src="https://res.cloudinary.com/ds8xkm0ue/image/upload/v1727714974/beypro-gradient-illustration.png"
            alt="Beypro illustration"
            className="w-80 mx-auto mt-10 opacity-95"
          />
          <footer className="mt-16 text-sm opacity-80">
            © {new Date().getFullYear()} Beypro — Level Up
          </footer>
        </div>
      </div>

      {/* RIGHT - Registration Form */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-6 sm:p-10 bg-white overflow-y-auto">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 mb-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Create Your Account 🚀
            </h2>
            <p className="text-gray-500 mt-1">Start your free trial today</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              required
            />
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              required
            />
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              required
            />
            <input
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              required
            />
            <input
              name="businessName"
              value={form.businessName}
              onChange={handleChange}
              placeholder="Business Name"
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              required
            />
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            />
            <input
              name="posLocation"
              value={form.posLocation}
              onChange={handleChange}
              placeholder="POS Location / City"
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            />
            <select
              name="usageType"
              value={form.usageType}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            >
              <option value="">Select POS Usage Type</option>
              <option value="restaurant">Restaurant</option>
              <option value="cafe">Cafe</option>
              <option value="retail">Retail</option>
            </select>

            {/* e-Fatura */}
            <label className="flex items-center gap-3 mt-3">
              <input
                type="checkbox"
                name="efatura"
                checked={form.efatura}
                onChange={handleChange}
                className="w-5 h-5 text-indigo-600 border-gray-300 rounded"
              />
              <span className="text-gray-700 font-medium">
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
                  className="w-full p-3 border border-gray-300 rounded-xl"
                />
                <input
                  name="taxOffice"
                  value={form.taxOffice}
                  onChange={handleChange}
                  placeholder="Tax Office"
                  className="w-full p-3 border border-gray-300 rounded-xl"
                />
                <select
                  name="invoiceType"
                  value={form.invoiceType}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-xl"
                >
                  <option value="">Select Invoice Type</option>
                  <option value="bireysel">Individual</option>
                  <option value="kurumsal">Corporate</option>
                </select>
              </>
            )}

            {/* Credit Card */}
            <h3 className="font-semibold text-gray-800 mt-6">Payment Info</h3>
            <input
              name="cardNumber"
              value={form.cardNumber}
              onChange={handleChange}
              placeholder="Card Number"
              className="w-full p-3 border border-gray-300 rounded-xl"
            />
            <div className="flex gap-4">
              <input
                name="expiry"
                value={form.expiry}
                onChange={handleChange}
                placeholder="MM/YY"
                className="w-1/2 p-3 border border-gray-300 rounded-xl"
              />
              <input
                name="cvv"
                value={form.cvv}
                onChange={handleChange}
                placeholder="CVV"
                className="w-1/2 p-3 border border-gray-300 rounded-xl"
              />
            </div>

            {/* Plan + Billing */}
            <div className="flex flex-col sm:flex-row justify-between gap-3 mt-6">
              <select
                name="plan"
                value={form.plan}
                onChange={handleChange}
                className="flex-1 p-3 border border-gray-300 rounded-xl"
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
                className="flex-1 p-3 border border-gray-300 rounded-xl"
              >
                <option value="monthly">Monthly Billing</option>
                <option value="yearly">Yearly Billing</option>
              </select>
            </div>

            {error && (
              <p className="text-red-500 text-sm font-medium bg-red-50 px-3 py-2 rounded-lg">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 mt-3 bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-semibold rounded-xl shadow hover:scale-[1.02] transition-all disabled:opacity-60"
            >
              <Rocket size={18} />
              {loading ? "Creating Account..." : "Subscribe & Start Now"}
            </button>
          </form>

          <p className="text-center text-xs text-gray-400 mt-10">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
