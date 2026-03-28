export default function Hero() {
  return (
    <section
      className="relative w-full bg-[#8B84C7] overflow-hidden"
      style={{ minHeight: "calc(100vh - 68px)" }}
    >
      {/* Corner Pins */}
      <Pin className="absolute top-3 left-3 z-10" />
      <Pin className="absolute top-3 right-3 z-10" />
      <Pin className="absolute bottom-3 left-3 z-10" />
      <Pin className="absolute bottom-3 right-3 z-10" />

      {/* Top-left candy stripe */}
      <div
        className="absolute top-0 left-0 z-10"
        style={{
          width: 120,
          height: 28,
          background:
            "repeating-linear-gradient(45deg, #D93F2E 0px, #D93F2E 13px, #fff 13px, #fff 26px)",
        }}
      />

      {/* Text block */}
      <div
        className="flex flex-col select-none"
        style={{ padding: "2px 0 0 8px", lineHeight: 0.88 }}
      >
        {/* Line 1 */}
        <HeroText>Let me show</HeroText>

        {/* Line 2 — character inline */}
        <div className="flex items-center" style={{ marginTop: "-4px" }}>
          <HeroText>you</HeroText>
          <div
            className="shrink-0 relative"
            style={{
              width: "clamp(90px, 11.5vw, 170px)",
              alignSelf: "center",
              marginBottom: "2%",
              zIndex: 2,
            }}
          >
            <CloudCharacter />
          </div>
          <HeroText>where</HeroText>
        </div>

        {/* Line 3 */}
        <div style={{ marginTop: "-4px" }}>
          <HeroText>we can go</HeroText>
        </div>
      </div>
    </section>
  );
}

function HeroText({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="text-[#F2E84B] font-black block"
      style={{
        fontFamily: "'Boogaloo', sans-serif",
        fontSize: "clamp(55px, 19.5vw, 280px)",
        lineHeight: 0.88,
        letterSpacing: "-0.01em",
      }}
    >
      {children}
    </span>
  );
}

function Pin({ className }: { className?: string }) {
  return (
    <div className={className}>
      <svg width="18" height="18" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10" cy="10" r="9" fill="#5B8FD4" stroke="#3A6EB5" strokeWidth="1.5" />
        <circle cx="10" cy="10" r="3.5" fill="#2A5EA0" />
        <circle cx="7.5" cy="7.5" r="1.5" fill="white" opacity="0.55" />
      </svg>
    </div>
  );
}

function CloudCharacter() {
  return (
    <svg
      viewBox="0 0 180 220"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto"
    >
      {/* Shadow/depth */}
      <ellipse cx="92" cy="215" rx="38" ry="6" fill="rgba(0,0,0,0.18)" />

      {/* Body fill */}
      <path
        d="M50 155 Q32 142 28 118 Q24 92 36 72 Q44 50 58 40 Q70 24 88 24 Q106 22 120 38 Q138 50 142 74 Q150 96 144 118 Q140 142 124 155 Q112 166 92 166 Q72 166 50 155Z"
        fill="white"
      />

      {/* Body outline */}
      <path
        d="M50 155 Q32 142 28 118 Q24 92 36 72 Q44 50 58 40 Q70 24 88 24 Q106 22 120 38 Q138 50 142 74 Q150 96 144 118 Q140 142 124 155 Q112 166 92 166 Q72 166 50 155Z"
        fill="none"
        stroke="black"
        strokeWidth="4.5"
        strokeLinejoin="round"
      />

      {/* LEFT EYE — full black circle with white shine */}
      <circle cx="68" cy="95" r="22" fill="black" />
      <circle cx="68" cy="95" r="18" fill="#111" />
      <ellipse cx="61" cy="87" rx="6" ry="5" fill="white" opacity="0.9" />

      {/* RIGHT EYE — slightly cooler angle */}
      <circle cx="112" cy="93" r="20" fill="black" />
      <circle cx="112" cy="93" r="16" fill="#111" />
      <ellipse cx="106" cy="86" rx="5" ry="4" fill="white" opacity="0.9" />

      {/* Nose */}
      <ellipse cx="90" cy="122" rx="5" ry="3.5" fill="#d4c9b0" />

      {/* Right arm pointing */}
      <path
        d="M138 118 Q155 108 162 98"
        fill="none"
        stroke="black"
        strokeWidth="9"
        strokeLinecap="round"
      />
      {/* Pointing finger extended */}
      <line x1="162" y1="98" x2="172" y2="88" stroke="black" strokeWidth="6" strokeLinecap="round" />
      {/* Curled fingers */}
      <path d="M160 101 Q165 110 160 118" fill="none" stroke="black" strokeWidth="5" strokeLinecap="round" />
      <path d="M156 104 Q158 114 153 120" fill="none" stroke="black" strokeWidth="4.5" strokeLinecap="round" />

      {/* Left arm up/crossed */}
      <path
        d="M42 118 Q26 108 20 98"
        fill="none"
        stroke="black"
        strokeWidth="9"
        strokeLinecap="round"
      />

      {/* Left leg */}
      <path d="M74 162 Q66 182 56 192" fill="none" stroke="black" strokeWidth="12" strokeLinecap="round" />
      <ellipse cx="50" cy="196" rx="16" ry="8" fill="black" />

      {/* Right leg */}
      <path d="M108 162 Q116 182 126 192" fill="none" stroke="black" strokeWidth="12" strokeLinecap="round" />
      <ellipse cx="132" cy="196" rx="16" ry="8" fill="black" />
    </svg>
  );
}
