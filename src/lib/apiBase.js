export function getApiBase() {
  const rawBase =
    import.meta.env.VITE_API_URL ||
    (import.meta.env.MODE === "development"
      ? "http://localhost:5000"
      : "https://api.beypro.com");

  const normalizedBase = String(rawBase)
    .replace(/\/api\/?$/, "")
    .replace(/\/+$/, "");

  if (import.meta.env.MODE !== "development" && normalizedBase.startsWith("http://")) {
    throw new Error("In production, VITE_API_URL must be HTTPS.");
  }

  return `${normalizedBase}/api`;
}

