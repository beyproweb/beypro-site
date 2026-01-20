import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import MainNav from "../../components/MainNav";
import { ArrowLeft, Check } from "lucide-react";

export default function Trial() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Helmet>
        <title>Trial Plan | Beypro Pricing</title>
        <meta name="description" content="Get started with Beypro's free trial plan" />
      </Helmet>

      <MainNav className="bg-white border-b border-slate-200" tone="dark" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <Link
          to="/pricing"
          className="inline-flex items-center gap-2 text-sky-600 hover:text-sky-700 font-semibold mb-8 sm:mb-12"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Pricing
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 mb-4">
              Trial Plan
            </h1>
            <p className="text-3xl font-bold text-sky-600 mb-2">Free</p>
            <p className="text-lg sm:text-xl text-slate-600 mb-6 sm:mb-8">
              Get started with Beypro and experience our core features at no cost.
            </p>

            <div className="space-y-3 mb-8">
              {[
                "Basic POS system",
                "Up to 100 daily transactions",
                "Kitchen display system",
                "Email support",
                "7-day trial period",
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <Check className="w-6 h-6 text-sky-600 flex-shrink-0" />
                  <span className="text-base sm:text-lg text-slate-700">{feature}</span>
                </div>
              ))}
            </div>

            <button className="w-full sm:w-auto px-8 py-4 bg-sky-600 text-white font-bold rounded-lg hover:bg-sky-700 transition">
              Start Free Trial
            </button>
          </div>

          <div className="relative w-full aspect-square">
            <img 
              src="https://images.unsplash.com/photo-1460925895917-adf4e565db18?w=800&h=800&fit=crop" 
              alt="Trial Plan Features" 
              className="w-full h-full object-cover rounded-2xl shadow-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
