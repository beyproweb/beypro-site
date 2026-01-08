import React, { useState } from "react";
import MainNav from "../components/MainNav.jsx";
import { getApiBase } from "../lib/apiBase.js";

function normalizeIban(value) {
  return String(value || "")
    .toUpperCase()
    .replace(/\s+/g, "")
    .trim();
}

function isValidIban(value) {
  const v = normalizeIban(value);
  return /^TR\d{24}$/.test(v);
}

export default function RestaurantRegister() {
  const API_BASE = getApiBase();

  const [form, setForm] = useState({
    restaurantName: "",
    legalCompanyName: "",
    authorizedPerson: "",
    phone: "",
    email: "",
    city: "",
    fullAddress: "",
    mapsPin: "",

    companyType: "Sahis",
    taxNumber: "",
    taxOffice: "",
    iban: "",

    deliveryRadiusKm: "5",
    operatingHours: "",
    avgPrepTimeMin: "20",
    entrancePickupAccepted: false,

    billingCycle: "weekly",
    acceptsRestaurantContract: false,
    acceptsEntrancePickupPolicy: false,
    acceptsCancellationNoShowRules: false,
    kvkkConsent: false,

    notes: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [contractScrolled, setContractScrolled] = useState(false);

  const contractText = `BEYPRO RESTAURANT DELIVERY CONTRACT (v1)

1) Parties & Scope
Beypro acts as a delivery service provider. Beypro is not the food seller and does not manufacture the food.

2) Orders & Responsibility
The Restaurant is solely responsible for food quality, preparation, packaging, allergens, and compliance with applicable food safety regulations.

3) Pricing, Fees & Invoicing
Delivery fee agreement: ₺50 per delivery (example). Invoicing and settlement are performed according to Beypro billing rules and the selected billing cycle.

4) Customer No‑Show / Cancellation
The Restaurant accepts Beypro’s cancellation and no-show rules. Orders may be billed or adjusted according to platform policies and evidence (time-stamps, courier logs).

5) Payment Terms
Settlements are paid to the Restaurant’s provided IBAN on a weekly or monthly basis, subject to reconciliations, refunds, and chargebacks where applicable.

6) Entrance Pickup Policy
Entrance pickup is accepted by the Restaurant when the courier arrives, as part of the agreed operational policy.

7) Termination
Either party may terminate the relationship. Beypro may suspend the Restaurant for fraud, repeated complaints, unsafe food practices, or breach of contract.

8) Jurisdiction
Any dispute shall be subject to İzmir Courts and Enforcement Offices.
`;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckbox = (e) => {
    const { name, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: checked }));
  };

  const onContractScroll = (e) => {
    const el = e.currentTarget;
    const nearBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 10;
    if (nearBottom) setContractScrolled(true);
  };

  const validate = () => {
    if (!form.restaurantName.trim()) return "Restaurant name is required.";
    if (!form.legalCompanyName.trim()) return "Legal company name is required.";
    if (!form.authorizedPerson.trim()) return "Authorized person is required.";
    if (!form.phone.trim()) return "Phone number is required.";
    if (!String(form.email || "").trim()) return "Email is required.";
    if (!form.city.trim()) return "City is required.";
    if (!form.fullAddress.trim()) return "Full address is required.";
    if (!form.mapsPin.trim()) return "Google Maps pin is required.";

    if (!form.companyType) return "Company type is required.";
    if (!form.taxNumber.trim()) return "Tax number is required.";
    if (!form.taxOffice.trim()) return "Tax office is required.";
    if (!isValidIban(form.iban)) return "IBAN must be a valid Turkish IBAN (TR + 24 digits).";

    const radius = Number(form.deliveryRadiusKm);
    if (!Number.isFinite(radius) || radius <= 0 || radius > 20) return "Delivery radius must be between 1 and 20 km.";
    if (!form.operatingHours.trim()) return "Operating hours are required.";
    const prep = Number(form.avgPrepTimeMin);
    if (!Number.isFinite(prep) || prep <= 0 || prep > 240) return "Average preparation time must be 1–240 minutes.";
    if (!form.entrancePickupAccepted) return "Entrance pickup policy must be accepted.";

    if (!contractScrolled) return "Please scroll the contract to the bottom to continue.";
    if (!form.acceptsRestaurantContract) return "You must accept the Beypro Restaurant Delivery Contract.";
    if (!form.acceptsEntrancePickupPolicy) return "You must accept the entrance-pickup policy.";
    if (!form.acceptsCancellationNoShowRules) return "You must accept cancellation & no-show rules.";
    if (!form.kvkkConsent) return "KVKK consent is required.";

    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(`${API_BASE}/public/restaurant-register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          restaurant_name: form.restaurantName.trim(),
          legal_company_name: form.legalCompanyName.trim(),
          authorized_person: form.authorizedPerson.trim(),
          phone: form.phone.trim(),
          email: String(form.email || "").trim().toLowerCase(),
          city: form.city.trim(),
          full_address: form.fullAddress.trim(),
          maps_pin: form.mapsPin.trim(),

          company_type: form.companyType,
          tax_number: form.taxNumber.trim(),
          tax_office: form.taxOffice.trim(),
          iban: normalizeIban(form.iban),

          delivery_radius_km: Number(form.deliveryRadiusKm),
          operating_hours: form.operatingHours.trim(),
          avg_prep_time_min: Number(form.avgPrepTimeMin),
          entrance_pickup_accepted: !!form.entrancePickupAccepted,

          delivery_fee_per_delivery: 50,
          billing_cycle: form.billingCycle,

          contract_scrolled: contractScrolled,
          contract_accepted: !!form.acceptsRestaurantContract,
          entrance_pickup_policy_accepted: !!form.acceptsEntrancePickupPolicy,
          cancellation_no_show_rules_accepted: !!form.acceptsCancellationNoShowRules,
          kvkk_consent: !!form.kvkkConsent,
          contract_version: "v1",
          contract_text: contractText,

          notes: form.notes.trim() || null
        }),
      });

      const text = await res.text();
      let data;
      try {
        data = text ? JSON.parse(text) : null;
      } catch {
        data = null;
      }

      if (!res.ok || !data?.success) {
        throw new Error(data?.error || `Submission failed [${res.status}]`);
      }

      setSuccess(true);
    } catch (err) {
      setError(err?.message || "Submission failed.");
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-slate-200">
          <MainNav tone="dark" />
        </div>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
          <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-8">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Your application has been received.
            </h1>
            <p className="mt-3 text-slate-600 whitespace-pre-line">
              Our team will review your information and contact you shortly.
              {"\n"}Status: Pending Approval
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-slate-200">
        <MainNav tone="dark" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Register Your Restaurant
          </h1>
          <p className="text-slate-600 mt-2">
            Leave your details and we’ll get back to you. Status will be <span className="font-semibold">PENDING_REVIEW</span>.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="rounded-2xl bg-white border border-slate-200 shadow-sm p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <h2 className="sm:col-span-2 text-lg font-bold text-slate-900">A. Business Information</h2>
            <input
              name="restaurantName"
              value={form.restaurantName}
              onChange={handleChange}
              placeholder="Restaurant Name"
              className="w-full p-3 border border-slate-300 rounded-xl"
              required
            />
            <input
              name="legalCompanyName"
              value={form.legalCompanyName}
              onChange={handleChange}
              placeholder="Legal Company Name"
              className="w-full p-3 border border-slate-300 rounded-xl"
              required
            />
            <input
              name="authorizedPerson"
              value={form.authorizedPerson}
              onChange={handleChange}
              placeholder="Authorized Person"
              className="w-full p-3 border border-slate-300 rounded-xl"
              required
            />
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full p-3 border border-slate-300 rounded-xl"
              required
            />
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full p-3 border border-slate-300 rounded-xl"
              required
            />
            <input
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder="City"
              className="w-full p-3 border border-slate-300 rounded-xl"
              required
            />
            <textarea
              name="fullAddress"
              value={form.fullAddress}
              onChange={handleChange}
              placeholder="Full Address"
              rows={3}
              className="w-full p-3 border border-slate-300 rounded-xl sm:col-span-2"
              required
            />
            <input
              name="mapsPin"
              value={form.mapsPin}
              onChange={handleChange}
              placeholder="Google Maps Pin (link or lat,lng)"
              className="w-full p-3 border border-slate-300 rounded-xl sm:col-span-2"
              required
            />

            <h2 className="sm:col-span-2 text-lg font-bold text-slate-900 mt-2">B. Tax Information</h2>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Company Type</label>
              <select
                name="companyType"
                value={form.companyType}
                onChange={handleChange}
                className="w-full p-3 border border-slate-300 rounded-xl"
              >
                <option value="Sahis">Şahıs</option>
                <option value="Limited">Limited</option>
                <option value="Anonim">Anonim</option>
              </select>
            </div>
            <input
              name="taxNumber"
              value={form.taxNumber}
              onChange={handleChange}
              placeholder="Tax Number (Vergi No)"
              className="w-full p-3 border border-slate-300 rounded-xl"
              required
            />
            <input
              name="taxOffice"
              value={form.taxOffice}
              onChange={handleChange}
              placeholder="Tax Office (Vergi Dairesi)"
              className="w-full p-3 border border-slate-300 rounded-xl"
              required
            />
            <input
              name="iban"
              value={form.iban}
              onChange={handleChange}
              placeholder="IBAN (TR...)"
              className="w-full p-3 border border-slate-300 rounded-xl"
              required
            />

            <h2 className="sm:col-span-2 text-lg font-bold text-slate-900 mt-2">C. Delivery Settings</h2>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Delivery Radius (max 20 km)</label>
              <select
                name="deliveryRadiusKm"
                value={form.deliveryRadiusKm}
                onChange={handleChange}
                className="w-full p-3 border border-slate-300 rounded-xl"
              >
                {Array.from({ length: 20 }, (_, i) => i + 1).map((km) => (
                  <option key={km} value={String(km)}>
                    {km} km
                  </option>
                ))}
              </select>
            </div>
            <input
              name="operatingHours"
              value={form.operatingHours}
              onChange={handleChange}
              placeholder="Operating Hours (e.g. 10:00-22:00)"
              className="w-full p-3 border border-slate-300 rounded-xl"
              required
            />
            <input
              name="avgPrepTimeMin"
              value={form.avgPrepTimeMin}
              onChange={handleChange}
              placeholder="Average Preparation Time (minutes)"
              inputMode="numeric"
              className="w-full p-3 border border-slate-300 rounded-xl"
              required
            />
            <label className="sm:col-span-2 flex items-start gap-3">
              <input
                type="checkbox"
                name="entrancePickupAccepted"
                checked={form.entrancePickupAccepted}
                onChange={handleCheckbox}
                className="mt-1"
                required
              />
              <span className="text-slate-700">Entrance pickup accepted (mandatory)</span>
            </label>

            <h2 className="sm:col-span-2 text-lg font-bold text-slate-900 mt-2">D. Pricing &amp; Agreement</h2>
            <div className="sm:col-span-2 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="text-sm text-slate-700">
                  <span className="font-semibold">Delivery Fee Agreement:</span> ₺50 per delivery
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-slate-700">Billing Cycle</label>
                  <select
                    name="billingCycle"
                    value={form.billingCycle}
                    onChange={handleChange}
                    className="p-2 border border-slate-300 rounded-lg bg-white"
                  >
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="sm:col-span-2">
              <p className="text-sm text-slate-600 mb-2">Restaurant Contract (scroll to the bottom to continue)</p>
              <div
                onScroll={onContractScroll}
                className="h-56 overflow-y-auto rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-800 whitespace-pre-wrap"
              >
                {contractText}
              </div>
              <div className="mt-3 space-y-2">
                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    name="acceptsRestaurantContract"
                    checked={form.acceptsRestaurantContract}
                    onChange={handleCheckbox}
                    className="mt-1"
                    required
                  />
                  <span className="text-slate-700">I accept Beypro Restaurant Delivery Contract {!contractScrolled ? "(scroll required)" : ""}</span>
                </label>
                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    name="acceptsEntrancePickupPolicy"
                    checked={form.acceptsEntrancePickupPolicy}
                    onChange={handleCheckbox}
                    className="mt-1"
                    required
                  />
                  <span className="text-slate-700">I accept entrance-pickup policy</span>
                </label>
                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    name="acceptsCancellationNoShowRules"
                    checked={form.acceptsCancellationNoShowRules}
                    onChange={handleCheckbox}
                    className="mt-1"
                    required
                  />
                  <span className="text-slate-700">I accept cancellation &amp; no-show rules</span>
                </label>
                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    name="kvkkConsent"
                    checked={form.kvkkConsent}
                    onChange={handleCheckbox}
                    className="mt-1"
                    required
                  />
                  <span className="text-slate-700">I consent to the processing of my personal data under KVKK</span>
                </label>
              </div>
            </div>

            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="Notes (optional)"
              rows={3}
              className="w-full p-3 border border-slate-300 rounded-xl sm:col-span-2"
            />
          </div>

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 text-red-700 p-4">
              {error}
            </div>
          )}

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-slate-900 text-white font-semibold shadow-sm hover:bg-slate-800 disabled:opacity-60"
            >
              {submitting ? "Submitting..." : "Submit"}
            </button>
            <span className="text-sm text-slate-600">
              Your application will be reviewed for approval.
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
