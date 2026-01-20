import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import MainNav from "../../components/MainNav";
import { ArrowLeft, Check } from "lucide-react";

export default function Delivery() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Helmet>
        <title>Delivery Management | Beypro</title>
        <meta name="description" content="Track and optimize deliveries with Beypro's management system" />
      </Helmet>

      <MainNav className="bg-white border-b border-slate-200" tone="dark" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <Link
          to="/features"
          className="inline-flex items-center gap-2 text-sky-600 hover:text-sky-700 font-semibold mb-8 sm:mb-12"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Features
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 mb-4 sm:mb-6">
              Delivery Management
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 mb-6 sm:mb-8">
              Track and optimize your deliveries with intelligent routing and real-time monitoring.
            </p>

            <div className="space-y-4">
              {[
                "Real-time GPS tracking",
                "Route optimization",
                "Driver assignment",
                "Customer notifications",
                "Delivery analytics",
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <Check className="w-6 h-6 text-sky-600 flex-shrink-0" />
                  <span className="text-base sm:text-lg text-slate-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative w-full aspect-square">
            <img 
              src="/assets/screenshots/Evening%20food%20delivery%20in%20the%20city.png" 
              alt="Delivery Management" 
              className="w-full h-full object-cover rounded-2xl shadow-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
