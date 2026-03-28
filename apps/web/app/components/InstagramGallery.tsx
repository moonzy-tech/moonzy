"use client";

export default function InstagramGallery() {
  const cards = [
    {
      type: "image" as const,
      src: "/instagram/kid-icecream.jpg",
      alt: "Kid eating ice cream",
      emoji: "🍦",
      fallbackBg: "linear-gradient(145deg, #4a8a5a, #2a5a3a)",
    },
    {
      type: "image" as const,
      src: "/instagram/cookies.jpg",
      alt: "Cookies",
      emoji: "🍪",
      fallbackBg: "linear-gradient(145deg, #c9a87a, #8a6a4a)",
    },
    {
      type: "image" as const,
      src: "/instagram/girl-cookie.jpg",
      alt: "Girl with cookie",
      emoji: "😊",
      fallbackBg: "linear-gradient(145deg, #9a6aaa, #6a4a7a)",
    },
    {
      type: "image" as const,
      src: "/instagram/kid-snack.jpg",
      alt: "Kid with snack",
      emoji: "🍿",
      fallbackBg: "linear-gradient(145deg, #5a7a9a, #3a4a5a)",
    },
  ];

  // Figma desktop positions (unchanged)
  const desktopCards = [
    { top: -15.22, left: -33.41,  angle: 10,  zIndex: 1, ...cards[0] },
    { type: "cta" as const, top: 34.77, left: 270.34, angle: -5, zIndex: 2 },
    { top: 25.87,  left: 568.48, angle: 2,   zIndex: 3, ...cards[1] },
    { top: 46.91,  left: 842.98, angle: -6,  zIndex: 2, ...cards[2] },
    { top: 8.78,   left: 1118.59, angle: 10,  zIndex: 1, ...cards[3] },
  ];

  const CARD_W = 288;
  const CARD_H = 405;
  const FRAME_W = 1440;
  const FRAME_H = 362;

  /** Mobile strip: no rotation — tilt was clipping inside overflow containers. */
  const mobileCardStyle = {
    width: "min(220px, calc(100vw - 2.5rem))",
    height: "min(300px, 72vw)",
    scrollSnapAlign: "center" as const,
    boxShadow: "0 20px 60px rgba(0,0,0,0.45)",
  };

  return (
    <section className="w-full bg-[#141826] pt-8 pb-2 md:pt-10 md:pb-3 lg:overflow-hidden lg:py-10">

      {/* ─── MOBILE layout: horizontal scroll strip ─── */}
      <div className="block max-lg:overflow-x-clip lg:hidden">
        <div
          className="flex items-stretch gap-3 overflow-x-auto scroll-smooth px-4 pb-0 pt-1 sm:gap-4 sm:px-6"
          style={{
            scrollSnapType: "x mandatory",
            scrollPaddingLeft: "1rem",
            scrollPaddingRight: "1rem",
            WebkitOverflowScrolling: "touch",
            msOverflowStyle: "none",
            scrollbarWidth: "none",
          }}
        >
          {/* CTA card first on mobile */}
          <div
            className="flex shrink-0 cursor-pointer flex-col items-center justify-center gap-4 rounded-2xl p-5 sm:p-6"
            style={{
              ...mobileCardStyle,
              background: "linear-gradient(155deg, #F5F0E8 0%, #EDE8DF 100%)",
            }}
          >
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#2a2020" strokeWidth="1.5">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="5" />
              <circle cx="17.5" cy="6.5" r="1.5" fill="#2a2020" stroke="none" />
            </svg>
            <p style={{ fontFamily: "system-ui, -apple-system, sans-serif", fontSize: "1rem", fontWeight: 800, color: "#2a2020", letterSpacing: "0.03em" }}>
              #BEMOONZY
            </p>
            <button
              type="button"
              className="w-[85%] rounded-full border-none bg-[#D4A94C] px-5 py-2.5 text-[#141826] transition-colors hover:bg-[#e4bc69]"
              style={{
                fontFamily: "system-ui, -apple-system, sans-serif",
                fontSize: "0.85rem",
                fontWeight: 600,
                cursor: "pointer",
                letterSpacing: "0.03em",
              }}
            >
              Follow Us
            </button>
          </div>

          {/* Image cards */}
          {cards.map((card) => (
            <div
              key={card.src}
              className="relative shrink-0 cursor-pointer overflow-hidden rounded-2xl"
              style={mobileCardStyle}
            >
              <img
                src={card.src}
                alt={card.alt}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  const fb = e.currentTarget.nextElementSibling as HTMLElement;
                  if (fb) fb.style.display = "flex";
                }}
              />
              <div style={{ display: "none", width: "100%", height: "100%", position: "absolute", inset: 0, background: card.fallbackBg, alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "12px" }}>
                <span style={{ fontSize: "3rem" }}>{card.emoji}</span>
                <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem", fontFamily: "system-ui, sans-serif" }}>{card.alt}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── DESKTOP layout: exact Figma positions ─── */}
      <div className="hidden lg:block">
        <div className="relative mx-auto" style={{ maxWidth: `${FRAME_W}px`, height: `${FRAME_H}px` }}>
          {desktopCards.map((card, index) => {
            if (card.type === "cta") {
              return (
                <div
                  key={index}
                  className="absolute rounded-2xl flex flex-col items-center justify-center gap-5 p-9 cursor-pointer transition-all duration-500 hover:scale-[1.03] hover:z-50 hover:shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
                  style={{
                    width: `${CARD_W}px`, height: `${CARD_H}px`,
                    top: `${card.top}px`, left: `${card.left}px`,
                    transform: `rotate(${card.angle}deg)`,
                    transformOrigin: "center center",
                    zIndex: card.zIndex,
                    background: "linear-gradient(155deg, #F5F0E8 0%, #EDE8DF 100%)",
                    boxShadow: "0 20px 60px rgba(0,0,0,0.45)",
                  }}
                >
                  <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#2a2020" strokeWidth="1.5">
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <circle cx="12" cy="12" r="5" />
                    <circle cx="17.5" cy="6.5" r="1.5" fill="#2a2020" stroke="none" />
                  </svg>
                  <p style={{ fontFamily: "system-ui, -apple-system, sans-serif", fontSize: "1.2rem", fontWeight: 800, color: "#2a2020", letterSpacing: "0.03em" }}>
                    #BEMOONZY
                  </p>
                  <button
                    type="button"
                    className="w-4/5 rounded-full border-none bg-[#D4A94C] px-7 py-3.5 text-[#141826] transition-colors hover:bg-[#e4bc69]"
                    style={{
                      fontFamily: "system-ui, -apple-system, sans-serif",
                      fontSize: "0.95rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      letterSpacing: "0.03em",
                    }}
                  >
                    Follow Us
                  </button>
                </div>
              );
            }

            return (
              <div
                key={index}
                className="absolute rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.03] hover:z-50 hover:shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
                style={{
                  width: `${CARD_W}px`, height: `${CARD_H}px`,
                  top: `${card.top}px`, left: `${card.left}px`,
                  transform: `rotate(${card.angle}deg)`,
                  transformOrigin: "center center",
                  zIndex: card.zIndex,
                  boxShadow: "0 20px 60px rgba(0,0,0,0.45)",
                }}
              >
                <img
                  src={(card as any).src}
                  alt={(card as any).alt}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    const fb = e.currentTarget.nextElementSibling as HTMLElement;
                    if (fb) fb.style.display = "flex";
                  }}
                />
                <div style={{ display: "none", width: "100%", height: "100%", position: "absolute", inset: 0, background: (card as any).fallbackBg, alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "12px" }}>
                  <span style={{ fontSize: "3.5rem" }}>{(card as any).emoji}</span>
                  <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem", fontFamily: "system-ui, sans-serif" }}>{(card as any).alt}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
}