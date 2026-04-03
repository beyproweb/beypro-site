import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

const POS_QR_BASE_URL = "https://pos.beypro.com";

export default function RestaurantSlugRedirect() {
  const { restaurantSlug = "" } = useParams();
  const location = useLocation();

  useEffect(() => {
    const slug = String(restaurantSlug || "").trim();
    if (!slug) return;

    const destination =
      `${POS_QR_BASE_URL}/${encodeURIComponent(slug)}` +
      `${location.search || ""}` +
      `${location.hash || ""}`;

    window.location.replace(destination);
  }, [restaurantSlug, location.search, location.hash]);

  return null;
}
