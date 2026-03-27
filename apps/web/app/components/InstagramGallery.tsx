"use client";

export default function InstagramGallery() {
  /*
    Exact Figma values:
    Card 1: 288×405, top:-15.22, left:-33.41,  angle:-10°
    Card 2: 288×405, top:34.77,  left:270.34,  angle:5°    (CTA)
    Card 3: 288×405, top:25.87,  left:568.48,  angle:-2°
    Card 4: 288×405, top:46.91,  left:842.98,  angle:6°
    Card 5: 288×405, top:8.78,   left:1118.59, angle:-10°

    Figma frame is 1440×362.
    We need to figure out the visual bounding box with rotations.
    The cards overflow the 362px frame — that's by design.
    We'll set the container to the Figma frame height and clip bottom overflow.
  */

  const cards = [
    {
      type: "image" as const,
      src: "/instagram/kid-icecream.jpg",
      alt: "Kid eating ice cream",
      emoji: "🍦",
      fallbackBg: "linear-gradient(145deg, #4a8a5a, #2a5a3a)",
      top: -15.22,
      left: -33.41,
      angle: 10,
      zIndex: 1,
    },
    {
      type: "cta" as const,
      top: 34.77,
      left: 270.34,
      angle: -5,
      zIndex: 2,
    },
    {
      type: "image" as const,
      src: "/instagram/cookies.jpg",
      alt: "Cookies",
      emoji: "🍪",
      fallbackBg: "linear-gradient(145deg, #c9a87a, #8a6a4a)",
      top: 25.87,
      left: 568.48,
      angle: 2,
      zIndex: 3,
    },
    {
      type: "image" as const,
      src: "/instagram/girl-cookie.jpg",
      alt: "Girl with cookie",
      emoji: "😊",
      fallbackBg: "linear-gradient(145deg, #9a6aaa, #6a4a7a)",
      top: 46.91,
      left: 842.98,
      angle: -6,
      zIndex: 2,
    },
    {
      type: "image" as const,
      src: "/instagram/kid-snack.jpg",
      alt: "Kid with snack",
      emoji: "🍿",
      fallbackBg: "linear-gradient(145deg, #5a7a9a, #3a4a5a)",
      top: 8.78,
      left: 1118.59,
      angle: 10,
      zIndex: 1,
    },
  ];

  const CARD_W = 288;
  const CARD_H = 405;
  const FRAME_W = 1440;
  const FRAME_H = 362; // Figma frame height

  return (
    <section
      className="bg-[#141826] py-8 md:py-10 overflow-hidden"
    >
      <div
        className="max-w-[1440px] mx-auto relative h-[280px] sm:h-[320px] md:h-[350px] lg:h-[362px] scale-[0.65] sm:scale-75 md:scale-90 lg:scale-100 origin-top"
      >
        {cards.map((card, index) => {
          const isOuter = index === 0 || index === 4; // First and last cards

          if (card.type === "cta") {
            return (
              <div
                key={index}
                className="absolute rounded-2xl flex flex-col items-center justify-center gap-4 md:gap-5 p-6 md:p-9 cursor-pointer transition-all duration-500 hover:scale-[1.03] hover:z-50 hover:shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
                style={{
                  width: `${CARD_W}px`,
                  height: `${CARD_H}px`,
                  top: `${card.top}px`,
                  left: `${card.left}px`,
                  transform: `rotate(${card.angle}deg)`,
                  transformOrigin: "center center",
                  zIndex: card.zIndex,
                  background:
                    "linear-gradient(155deg, #F5F0E8 0%, #EDE8DF 100%)",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.45)",
                }}
              >
                {/* Instagram Icon */}
                <svg
                  width="44"
                  height="44"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#2a2020"
                  strokeWidth="1.5"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="5" />
                  <circle
                    cx="17.5"
                    cy="6.5"
                    r="1.5"
                    fill="#2a2020"
                    stroke="none"
                  />
                </svg>

                <p
                  style={{
                    fontFamily: "system-ui, -apple-system, sans-serif",
                    fontSize: "1.2rem",
                    fontWeight: 800,
                    color: "#2a2020",
                    letterSpacing: "0.03em",
                  }}
                >
                  #BEMOONZY
                </p>

                {/* Follow Button with gradient border */}
                <div
                  style={{
                    borderRadius: "999px",
                    padding: "1.5px",
                    background:
                      "linear-gradient(90deg, #4A6CF7 0%, #9B59B6 40%, #E74C8A 70%, #F39C12 100%)",
                    width: "80%",
                  }}
                >
                  <button
                    style={{
                      width: "100%",
                      padding: "13px 28px",
                      borderRadius: "999px",
                      border: "none",
                      backgroundColor: "#1a1a2e",
                      color: "#F5F0E8",
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
              </div>
            );
          }

          return (
            <div
              key={index}
              className={`absolute rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.03] hover:z-50 hover:shadow-[0_30px_80px_rgba(0,0,0,0.6)] ${isOuter ? 'hidden md:block' : ''}`}
              style={{
                width: `${CARD_W}px`,
                height: `${CARD_H}px`,
                top: `${card.top}px`,
                left: `${card.left}px`,
                transform: `rotate(${card.angle}deg)`,
                transformOrigin: "center center",
                zIndex: card.zIndex,
                boxShadow: "0 20px 60px rgba(0,0,0,0.45)",
              }}
            >
              <img
                src={card.src}
                alt={card.alt}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  if (e.currentTarget.nextElementSibling) {
                    (
                      e.currentTarget.nextElementSibling as HTMLElement
                    ).style.display = "flex";
                  }
                }}
              />
              <div
                style={{
                  display: "none",
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  inset: 0,
                  background: card.fallbackBg,
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                <span style={{ fontSize: "3.5rem" }}>{card.emoji}</span>
                <span
                  style={{
                    color: "rgba(255,255,255,0.4)",
                    fontSize: "0.75rem",
                    fontFamily: "system-ui, sans-serif",
                  }}
                >
                  {card.alt}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}