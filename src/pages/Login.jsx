// src/pages/LoginRedirect.jsx or src/routes/Login.jsx
import { useEffect } from "react";

export default function LoginRedirect() {
  useEffect(() => {
    window.location.href = "https://pos.beypro.com/login";
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-white text-gray-700 text-lg">
      Redirecting to Beypro POS Login...
    </div>
  );
}
