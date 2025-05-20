import React, { useState, useEffect, useRef } from "react";

const slides = [
  {
    title: "The Next-Gen POS Platform",
    desc: "Supercharge your restaurant with real-time orders, live stock, and staff automation. Cloud-native, always secure.",
    img: "/Beylogo.svg",
    alt: "Beypro POS Logo",
    button: {
      label: "Get Started Free",
       href: "/register",
    },
  },
  {
    title: "AI-Powered Operations",
    desc: "Let our AI assistant manage daily tasks, auto-remind your team, and deliver instant reports. Spend less time on admin, more on growth.",
    img: "/ai-bot.svg", // Or use your favorite SVG
    alt: "AI Assistant Graphic",
  },
  {
    title: "Works Beautifully on Every Device",
    desc: "Tablet, phone, or desktop — Beypro adapts instantly. Designed for staff on the move and managers who demand visibility anywhere.",
    img: "/devices.svg", // Swap for any device graphic you like
    alt: "Responsive Devices",
  },
  {
    title: "Built for Real Restaurants",
    desc: "Features shaped by real-world feedback. No theory — everything tested in daily restaurant rush.",
    img: "/restaurant-illustration.svg",
    alt: "Restaurant Illustration",
  },
];


export default function Carousel() {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef();

  useEffect(() => {
    timeoutRef.current = setTimeout(
      () => setCurrent((c) => (c + 1) % slides.length),
      6500 // longer so users can read
    );
    return () => clearTimeout(timeoutRef.current);
  }, [current]);

  // Touch drag support
  const startX = useRef(0);
  const handleTouchStart = (e) => { startX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e) => {
    let dx = e.changedTouches[0].clientX - startX.current;
    if (dx > 50) setCurrent((c) => (c - 1 + slides.length) % slides.length);
    else if (dx < -50) setCurrent((c) => (c + 1) % slides.length);
  };

return (
  <>
    <section
      className="relative w-full max-w-8xl mx-auto my-0 rounded-[rem] overflow-hidden shadow-2xl
      bg-gradient-to-br from-[#18143a] via-[#302b63] to-[#2b1f47] min-h-[430px] flex items-center justify-center"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="Highlights"
      style={{ minHeight: 440 }}
    >
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6 md:px-20 py-10 md:py-16 transition-opacity duration-700
            ${i === current ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"}`}
          style={{ minHeight: 400 }}
        >
          {/* LOGO / IMAGE - always centered */}
          <div className="flex flex-col items-center justify-center w-full">
           <img
  src={slide.img}
  alt={slide.alt}
  className={`drop-shadow-2xl mb-3 ${
    i === 0 ? "h-20 mt-4 mx-auto" : ""
  } ${i === 1 ? "h-48 mt-4 mx-auto" : ""}
    ${i === 2 ? "h-44 mt-4 mx-auto" : ""}
    ${i === 3 ? "h-56 mt-4 mx-auto" : ""}`}
  draggable="false"
/>


            {slide.button && (
              <a
                href={slide.button.href}
                className="mt-8 inline-block max-w-[260px] px-7 py-3 rounded-full bg-gradient-to-r from-blue-600 to-fuchsia-600 text-white font-bold text-base md:text-lg shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300"
                style={{
                  fontSize: 'clamp(1rem, 1vw, 1.1rem)',
                  fontWeight: 800
                }}
              >
                {slide.button.label}
              </a>
            )}
          </div>
          {/* TEXT */}
          <div className="flex flex-col items-center text-center max-w-2xl w-full mt-12">
            <h3 className="text-lg md:text-2xl xl:text-3xl font-extrabold bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-purple-400 bg-clip-text text-transparent drop-shadow mb-2 xl:mb-4 tracking-tight">
              {slide.title}
            </h3>
            <p className="text-sm md:text-base xl:text-lg text-white/90 font-medium mb-2 md:mb-5 max-w-xl">
              {slide.desc}
            </p>
          </div>
        </div>
      ))}
    </section>
    {/* Dots OUTSIDE the carousel, fixed below (responsive for all screens) */}
    <div className="w-full flex justify-center mt-4 mb-4">
      <div className="flex gap-3 z-30 pointer-events-auto">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`w-4 h- rounded-full border-2 border-white transition-all duration-200
              ${i === current
                ? "bg-gradient-to-tr from-fuchsia-400 to-cyan-400 shadow-xl scale-125"
                : "bg-white/30 opacity-70"
              }`}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  </>
);



}
