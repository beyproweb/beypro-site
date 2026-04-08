import React from "react";

export default function BrandLogo({ variant = "nav", className = "" }) {
  const sizeClass =
    variant === "footer"
      ? "h-6 w-[128px] sm:w-[140px]"
      : variant === "compact"
      ? "h-5 w-[112px] sm:w-[124px]"
      : "h-8 w-[148px] sm:w-[176px]";

  return (
    <span className={`inline-flex shrink-0 ${sizeClass} ${className}`}>
      <img
        src="/beypro-logo-colorful-pie-wide.png"
        alt="Beypro"
        className="h-full w-full object-contain"
        loading="eager"
      />
    </span>
  );
}
