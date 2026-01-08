import React, { useMemo, useRef, useState } from "react";
import MainNav from "../components/MainNav.jsx";
import { getApiBase } from "../lib/apiBase.js";

function normalizeIban(value) {
  return String(value || "")
    .toUpperCase()
    .replace(/\s+/g, "")
    .trim();
}

function isValidTurkishId(value) {
  const v = String(value || "").trim();
  return /^\d{11}$/.test(v);
}

function isValidIban(value) {
  const v = normalizeIban(value);
  return /^TR\d{24}$/.test(v);
}

export default function DriverRegister() {
  const API_BASE = getApiBase();
  const contractBoxRef = useRef(null);

  const contractText = useMemo(
    () =>
      `BEYPRO DRIVER CONTRACT (v1)

1) Relationship
The Driver is an independent contractor. Beypro is not an employer and does not provide employment benefits.

2) Scope
The Driver may accept delivery tasks through Beypro systems. The Driver may refuse tasks without penalty unless otherwise required by applicable platform rules.

3) Payment
Payment is per completed delivery (example: ₺40 per delivery). Beypro may update rates with prior notice in the platform.

4) Payouts
Payouts may be made daily or weekly according to Beypro payout rules and operational requirements. The Driver must provide a valid IBAN for payouts.

5) Compliance & Documents
The Driver must maintain valid traffic insurance and valid courier/transport insurance where applicable. Beypro may request proof and supporting documents at any time.

6) Vehicle & Safety
The Driver is responsible for vehicle roadworthiness, licenses, and compliance with traffic regulations.

7) Fines, Accidents, Liability
The Driver is solely responsible for traffic fines, penalties, accidents, claims, and damages arising from the Driver’s actions or vehicle operation.

8) Termination
Either party may terminate this relationship at any time. Beypro may suspend access for safety, fraud, compliance, or breach.

9) Jurisdiction
Any dispute shall be subject to İzmir Courts and Enforcement Offices.
`,
    []
  );

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    turkishId: "",
    dateOfBirth: "",

    vehicleType: "Motorbike",
    plateNumber: "",
    licenseType: "",
    vehicleOwnership: "Owned",

    taxStatus: "Individual",
    taxNumber: "",
    taxCity: "",
    iban: "",

    hasTrafficInsurance: false,
    hasCourierInsurance: false,
    acceptsDocRequests: false,
    acceptsDriverContract: false,
    kvkkConsent: false,
  });

  const [files, setFiles] = useState({
    driverLicense: null,
    vehicleRegistration: null,
    insurancePolicy: null,
  });

  const [contractScrolled, setContractScrolled] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const onContractScroll = () => {
    const el = contractBoxRef.current;
    if (!el) return;
    const nearBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 10;
    if (nearBottom) setContractScrolled(true);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleFile = (e) => {
    const { name, files: picked } = e.target;
    setFiles((prev) => ({ ...prev, [name]: picked?.[0] || null }));
  };

  const validate = () => {
    if (!form.fullName.trim()) return "Full Name is required.";
    if (!form.phone.trim()) return "Phone Number is required.";
    if (!String(form.email || "").trim()) return "Email is required.";
    if (!isValidTurkishId(form.turkishId)) return "Turkish ID Number (TC Kimlik) must be 11 digits.";
    if (!form.dateOfBirth) return "Date of Birth is required.";

    if (!form.plateNumber.trim()) return "Plate Number is required.";
    if (!form.licenseType.trim()) return "License Type is required.";

    if (!form.taxStatus) return "Tax Status is required.";
    if (!String(form.taxNumber || "").trim()) return "Tax Number (Vergi No) is required.";
    if (!String(form.taxCity || "").trim()) return "City of Tax Registration is required.";

    if (!isValidIban(form.iban)) return "IBAN must be a valid Turkish IBAN (TR + 24 digits).";

    if (!form.hasTrafficInsurance) return "Traffic insurance confirmation is required.";
    if (!form.hasCourierInsurance) return "Courier/transport insurance confirmation is required.";
    if (!form.acceptsDocRequests) return "Document request acceptance is required.";

    if (!contractScrolled) return "Please scroll the contract box to the bottom to continue.";
    if (!form.acceptsDriverContract) return "You must accept the Beypro Driver Contract.";
    if (!form.kvkkConsent) return "KVKK consent is required.";

    if (!files.driverLicense) return "Driver License upload is required.";
    if (!files.vehicleRegistration) return "Vehicle Registration upload is required.";

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
      const fd = new FormData();

      fd.set("full_name", form.fullName.trim());
      fd.set("phone", form.phone.trim());
      fd.set("email", String(form.email || "").trim().toLowerCase());
      fd.set("turkish_id", String(form.turkishId || "").trim());
      fd.set("date_of_birth", form.dateOfBirth);

      fd.set("vehicle_type", form.vehicleType);
      fd.set("plate_number", form.plateNumber.trim());
      fd.set("license_type", form.licenseType.trim());
      fd.set("vehicle_ownership", form.vehicleOwnership);

      fd.set("tax_status", form.taxStatus);
      fd.set("tax_number", String(form.taxNumber || "").trim());
      fd.set("tax_city", String(form.taxCity || "").trim());
      fd.set("iban", normalizeIban(form.iban));

      fd.set("has_traffic_insurance", String(form.hasTrafficInsurance));
      fd.set("has_courier_insurance", String(form.hasCourierInsurance));
      fd.set("accepts_doc_requests", String(form.acceptsDocRequests));
      fd.set("contract_scrolled", String(contractScrolled));
      fd.set("contract_accepted", String(form.acceptsDriverContract));
      fd.set("kvkk_consent", String(form.kvkkConsent));
      fd.set("contract_version", "v1");

      fd.set("contract_text", contractText);

      fd.append("driver_license", files.driverLicense);
      fd.append("vehicle_registration", files.vehicleRegistration);
      if (files.insurancePolicy) fd.append("insurance_policy", files.insurancePolicy);

      const res = await fetch(`${API_BASE}/public/driver-register`, {
        method: "POST",
        body: fd,
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

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Become a Driver
          </h1>
          <p className="text-slate-600 mt-2">
            Submit your details and documents. Status will be <span className="font-semibold">PENDING_REVIEW</span>.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <section className="rounded-2xl bg-white border border-slate-200 shadow-sm p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-4">A. Personal Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                placeholder="Full Name"
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
                name="turkishId"
                value={form.turkishId}
                onChange={handleChange}
                placeholder="Turkish ID Number (TC Kimlik)"
                inputMode="numeric"
                maxLength={11}
                className="w-full p-3 border border-slate-300 rounded-xl"
                required
              />
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">Date of Birth</label>
                <input
                  name="dateOfBirth"
                  type="date"
                  value={form.dateOfBirth}
                  onChange={handleChange}
                  className="w-full p-3 border border-slate-300 rounded-xl"
                  required
                />
              </div>
            </div>
          </section>

          <section className="rounded-2xl bg-white border border-slate-200 shadow-sm p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-4">B. Vehicle Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Vehicle Type</label>
                <select
                  name="vehicleType"
                  value={form.vehicleType}
                  onChange={handleChange}
                  className="w-full p-3 border border-slate-300 rounded-xl"
                >
                  <option value="Motorbike">Motorbike</option>
                  <option value="Scooter">Scooter</option>
                  <option value="Electric">Electric</option>
                </select>
              </div>
              <input
                name="plateNumber"
                value={form.plateNumber}
                onChange={handleChange}
                placeholder="Plate Number"
                className="w-full p-3 border border-slate-300 rounded-xl"
                required
              />
              <input
                name="licenseType"
                value={form.licenseType}
                onChange={handleChange}
                placeholder="License Type"
                className="w-full p-3 border border-slate-300 rounded-xl"
                required
              />
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Vehicle Ownership</label>
                <select
                  name="vehicleOwnership"
                  value={form.vehicleOwnership}
                  onChange={handleChange}
                  className="w-full p-3 border border-slate-300 rounded-xl"
                >
                  <option value="Owned">Owned</option>
                  <option value="Rented">Rented</option>
                </select>
              </div>
            </div>
          </section>

          <section className="rounded-2xl bg-white border border-slate-200 shadow-sm p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-4">C. Legal &amp; Tax</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Tax Status</label>
                <select
                  name="taxStatus"
                  value={form.taxStatus}
                  onChange={handleChange}
                  className="w-full p-3 border border-slate-300 rounded-xl"
                >
                  <option value="Individual">Individual (Şahıs)</option>
                  <option value="CourierCompany">Courier Company</option>
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
                name="taxCity"
                value={form.taxCity}
                onChange={handleChange}
                placeholder="City of Tax Registration"
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
            </div>
          </section>

          <section className="rounded-2xl bg-white border border-slate-200 shadow-sm p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-4">D. Insurance &amp; Compliance</h2>

            <div className="space-y-3">
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  name="hasTrafficInsurance"
                  checked={form.hasTrafficInsurance}
                  onChange={handleChange}
                  className="mt-1"
                  required
                />
                <span className="text-slate-700">I have valid traffic insurance</span>
              </label>
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  name="hasCourierInsurance"
                  checked={form.hasCourierInsurance}
                  onChange={handleChange}
                  className="mt-1"
                  required
                />
                <span className="text-slate-700">I have valid courier/transport insurance</span>
              </label>
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  name="acceptsDocRequests"
                  checked={form.acceptsDocRequests}
                  onChange={handleChange}
                  className="mt-1"
                  required
                />
                <span className="text-slate-700">I accept that Beypro may request insurance documents</span>
              </label>
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  name="kvkkConsent"
                  checked={form.kvkkConsent}
                  onChange={handleChange}
                  className="mt-1"
                  required
                />
                <span className="text-slate-700">I consent to the processing of my personal data under KVKK</span>
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Driver License (PDF/JPG)
                </label>
                <input
                  type="file"
                  name="driverLicense"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFile}
                  className="w-full"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Vehicle Registration (PDF/JPG)
                </label>
                <input
                  type="file"
                  name="vehicleRegistration"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFile}
                  className="w-full"
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Insurance Policy (optional at MVP)
                </label>
                <input
                  type="file"
                  name="insurancePolicy"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFile}
                  className="w-full"
                />
              </div>
            </div>
          </section>

          <section className="rounded-2xl bg-white border border-slate-200 shadow-sm p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-4">Driver Contract</h2>
            <p className="text-sm text-slate-600 mb-3">
              Scroll to the bottom to enable submission.
            </p>
            <div
              ref={contractBoxRef}
              onScroll={onContractScroll}
              className="h-56 overflow-y-auto rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-800 whitespace-pre-wrap"
            >
              {contractText}
            </div>
            <div className="mt-4">
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  name="acceptsDriverContract"
                  checked={form.acceptsDriverContract}
                  onChange={handleChange}
                  className="mt-1"
                  required
                />
                <span className="text-slate-700">
                  I have read and accept the Beypro Driver Contract
                  {!contractScrolled && (
                    <span className="block text-xs text-slate-500 mt-1">
                      (scroll required)
                    </span>
                  )}
                </span>
              </label>
            </div>
          </section>

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
              {submitting ? "Submitting..." : "Submit Application"}
            </button>
            <span className="text-sm text-slate-600">
              We will review and contact you.
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
