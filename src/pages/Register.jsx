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

  const RAW_BASE =
    import.meta.env.VITE_API_URL ||
    (import.meta.env.MODE === "development"
      ? "http://localhost:5000/api"
      : "https://hurrypos-backend.onrender.com/api");

  const API_BASE =
    String(RAW_BASE)
      .replace(/\/api\/?$/, "")
      .replace(/\/+$/, "") + "/api";

  console.log("🌐 Beypro site API base:", API_BASE);


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
      const registerUrl = `${API_BASE}/register`;
      console.log("📡 Sending registration request to:", registerUrl);

      const registerRes = await fetch(registerUrl, {
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
        body: JSON.stringify({ email: form.email, password: form.password }),
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
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-gray-50">
      {/* ===== LEFT (Brand section — shows top on mobile) ===== */}
      <div className="hidden lg:flex flex-col items-center justify-center w-1/2 
  bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-500 text-white 
  p-10 relative overflow-hidden sticky top-0 h-screen">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(255,255,255,0.1),_transparent_70%)]"></div>

        <div className="relative z-10 text-center space-y-4 md:space-y-6 max-w-md mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight drop-shadow-md">
            Beypro
          </h1>
          <p className="text-base md:text-lg font-light opacity-90">
            Level up your business — start your 30-day trial now.
          </p>
          <img
            src="https://res.cloudinary.com/ds8xkm0ue/image/upload/v1727714974/beypro-gradient-illustration.png"
            alt="Beypro illustration"
            className="w-48 md:w-80 mx-auto mt-6 md:mt-10 opacity-95"
          />
          <footer className="mt-6 md:mt-12 text-sm opacity-80">
            © {new Date().getFullYear()} Beypro — Level Up
          </footer>
        </div>
      </div>

      {/* ===== RIGHT (Form section) ===== */}
      <div className="flex flex-col items-center justify-center w-full lg:w-1/2 bg-white px-4 sm:px-6 md:px-10 py-10 overflow-y-auto">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-10">
          <div className="text-center mb-6 md:mb-8">
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">
              Create Your Account 🚀
            </h2>
            <p className="text-gray-500 mt-1 text-sm md:text-base">
              Start your free trial today
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            <input
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full p-3 border border-gray-300 rounded-xl text-sm md:text-base focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              required
            />
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="w-full p-3 border border-gray-300 rounded-xl text-sm md:text-base focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              required
            />
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-xl text-sm md:text-base focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              required
            />
            <input
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="w-full p-3 border border-gray-300 rounded-xl text-sm md:text-base focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              required
            />
            <input
              name="businessName"
              value={form.businessName}
              onChange={handleChange}
              placeholder="Business Name"
              className="w-full p-3 border border-gray-300 rounded-xl text-sm md:text-base"
              required
            />
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full p-3 border border-gray-300 rounded-xl text-sm md:text-base"
            />
            <input
              name="posLocation"
              value={form.posLocation}
              onChange={handleChange}
              placeholder="POS Location / City"
              className="w-full p-3 border border-gray-300 rounded-xl text-sm md:text-base"
            />
            <select
              name="usageType"
              value={form.usageType}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-xl text-sm md:text-base"
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
                className="w-5 h-5 text-indigo-600 border-gray-300 rounded"
              />
              <span className="text-gray-700 text-sm md:text-base font-medium">
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
                  className="w-full p-3 border border-gray-300 rounded-xl text-sm md:text-base"
                />
                <input
                  name="taxOffice"
                  value={form.taxOffice}
                  onChange={handleChange}
                  placeholder="Tax Office"
                  className="w-full p-3 border border-gray-300 rounded-xl text-sm md:text-base"
                />
                <select
                  name="invoiceType"
                  value={form.invoiceType}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-xl text-sm md:text-base"
                >
                  <option value="">Select Invoice Type</option>
                  <option value="bireysel">Individual</option>
                  <option value="kurumsal">Corporate</option>
                </select>
              </>
            )}

            {/* Credit Card */}
            <h3 className="font-semibold text-gray-800 mt-6 text-base md:text-lg">
              Payment Info
            </h3>
            <input
              name="cardNumber"
              value={form.cardNumber}
              onChange={handleChange}
              placeholder="Card Number"
              className="w-full p-3 border border-gray-300 rounded-xl text-sm md:text-base"
            />
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                name="expiry"
                value={form.expiry}
                onChange={handleChange}
                placeholder="MM/YY"
                className="w-full sm:w-1/2 p-3 border border-gray-300 rounded-xl text-sm md:text-base"
              />
              <input
                name="cvv"
                value={form.cvv}
                onChange={handleChange}
                placeholder="CVV"
                className="w-full sm:w-1/2 p-3 border border-gray-300 rounded-xl text-sm md:text-base"
              />
            </div>

            {/* Plan + Billing */}
            <div className="flex flex-col sm:flex-row justify-between gap-3 mt-6">
              <select
                name="plan"
                value={form.plan}
                onChange={handleChange}
                className="flex-1 p-3 border border-gray-300 rounded-xl text-sm md:text-base"
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
                className="flex-1 p-3 border border-gray-300 rounded-xl text-sm md:text-base"
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
