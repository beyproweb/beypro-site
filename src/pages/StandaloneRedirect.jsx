import React, { useEffect } from "react";

export default function StandaloneRedirect() {
  useEffect(() => {
    const isDev = import.meta.env.MODE === "development";
    const target = isDev
      ? "http://localhost:5173/standalone/app"
      : "https://pos.beypro.com/standalone/app";
    window.location.replace(target);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
      Redirecting to standalone portal...
    </div>
  );
}
