const HERO_FEATURE_MARQUEE_LABELS = [
  "Hassle-free cancellations",
  "100% vegan",
  "Healthy ingredients",
] as const;

function HeroFeatureMarqueeStrip() {
  return (
    <>
      {[0, 1].map((loop) => (
        <div
          key={loop}
          className="flex shrink-0 items-center gap-8 md:gap-14 lg:gap-16 xl:gap-24 pr-8 md:pr-14 lg:pr-16"
        >
          {HERO_FEATURE_MARQUEE_LABELS.map((label) => (
            <span key={`${loop}-${label}`} className="inline-flex items-center gap-2 md:gap-2.5">
              <svg
                className="h-3 w-3 shrink-0 md:h-3.5 md:w-3.5"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.59569 13.9156C6.46281 13.1304 6.11251 12.2849 5.54477 11.3789C4.97703 10.4609 4.1677 9.60926 3.11678 8.82409C2.07794 8.03891 1.0391 7.53761 0.000257046 7.32018V6.55917C1.02702 6.31758 2.0115 5.87064 2.95371 5.21834C3.90799 4.55397 4.70524 3.75672 5.34546 2.82659C5.99775 1.87231 6.4145 0.930103 6.59569 -2.16373e-05H7.3567C7.46542 0.603955 7.68285 1.22605 8.009 1.86627C8.33514 2.4944 8.75189 3.09838 9.25923 3.6782C9.77865 4.24594 10.3585 4.75932 10.9987 5.21834C11.953 5.8948 12.9254 6.34174 13.9159 6.55917V7.32018C13.2515 7.45306 12.563 7.72485 11.8503 8.13555C11.1497 8.54626 10.4974 9.03548 9.8934 9.60322C9.28943 10.1589 8.79417 10.7447 8.40762 11.3608C7.83988 12.2668 7.48957 13.1184 7.3567 13.9156H6.59569Z"
                  fill="#F5F5F5"
                />
              </svg>
              <span className="whitespace-nowrap font-serif text-xs leading-tight text-white/85 sm:text-sm md:text-base lg:text-[18.12px]">
                {label}
              </span>
            </span>
          ))}
        </div>
      ))}
    </>
  );
}

export default function HeroSection() {
  return (
    <section id="home" className="w-full bg-[#141826] py-5 md:py-4">
      <div className="max-w-[1440px] mx-auto px-3 md:px-4 lg:px-6">
        <div style={{ backgroundColor: "#1E2235", borderRadius: "16px", overflow: "hidden" }} className="md:rounded-[20px] lg:rounded-[28px]">
          {/* Main Hero Area */}
          <div
            className="px-4 md:px-8 lg:px-12 pt-6 md:pt-10 lg:pt-12 pb-6 md:pb-8 lg:pb-10 grid gap-6 md:gap-12 lg:gap-20 xl:gap-30 items-center grid-cols-1 lg:grid-cols-[minmax(340px,420px)_1fr]"
          >
        {/* Left Side - Text Content */}
        <div className="space-y-4 md:space-y-6 lg:space-y-7 text-center lg:text-left opacity-0 animate-fadeInUp" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
          <h1
            className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-[70px]"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 600,
              fontStyle: "normal",
              lineHeight: "1.1",
              letterSpacing: "0px",
              verticalAlign: "middle",
              textTransform: "uppercase",
            }}
          >
            MADE FOR
            <br />
            NIGHTS.
          </h1>

          <p
            className="text-white/85 text-sm sm:text-base md:text-lg max-w-[340px] mx-auto lg:mx-0"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 500,
              fontStyle: "normal",
              lineHeight: "1.4",
              letterSpacing: "0px",
              verticalAlign: "middle",
            }}
          >
            You&apos;re awake. You&apos;re hungry. It&apos;s not
            <br className="hidden sm:block" />a problem. It&apos;s your time.
          </p>

          <div className="flex justify-center lg:justify-start">
            <a
              href="/product"
              className="inline-flex cursor-pointer items-center justify-center rounded-full border-none bg-[#D4A94C] px-8 py-1.5 text-xs font-bold text-[#141826] shadow-[0_18px_50px_rgba(0,0,0,0.28)] transition-all hover:-translate-y-px hover:scale-[1.03] hover:bg-[#e4bc69] hover:shadow-2xl sm:px-12 sm:text-sm md:px-14 md:py-[7px] md:text-[15.1px] lg:px-[58px]"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                lineHeight: "2.5",
                letterSpacing: "0%",
                textDecoration: "none",
              }}
            >
              Shop the Night
            </a>
          </div>
        </div>

        {/* Right Side - Bento Grid */}
        <div className="grid gap-2 md:gap-3 lg:gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-[1.7fr_1fr_1fr_1.15fr] lg:grid-rows-[170px_190px_190px] auto-rows-min opacity-0 animate-fadeInUp" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
          {/* R1C1 - Voucher Card */}
          <div
            className="bg-white overflow-hidden flex flex-col justify-between rounded-xl md:rounded-2xl lg:rounded-3xl p-3 md:p-4"
            style={{
              gridColumn: "1",
              gridRow: "1",
              padding: "18px 20px 14px",
            }}
          >
            <div>
              <p
                style={{
                  color: "#00A651",
                  fontSize: "0.58rem",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  marginBottom: "6px",
                  fontFamily: "system-ui, sans-serif",
                }}
              >
                UPGRADE DISCOUNT
              </p>
              <p
                style={{
                  color: "#3a3a3a",
                  fontSize: "0.8rem",
                  lineHeight: 1.4,
                  marginBottom: "10px",
                  fontFamily: "system-ui, sans-serif",
                }}
              >
                Upgrade today to enable
                <br />
                unlimited projects.
              </p>
              <p
                style={{
                  color: "#00A651",
                  fontSize: "2rem",
                  fontWeight: 700,
                  lineHeight: 1,
                  fontFamily: "system-ui, sans-serif",
                }}
              >
                $12.99
              </p>
            </div>
            <div
              style={{
                borderTop: "1.5px dashed #d0d0d0",
                paddingTop: "8px",
                marginTop: "6px",
              }}
            >
              <div
                className="flex justify-between items-center"
                style={{ marginBottom: "6px" }}
              >
                <p
                  style={{
                    color: "#888",
                    fontSize: "0.5rem",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    fontFamily: "system-ui, sans-serif",
                  }}
                >
                  DISCOUNT CODE
                </p>
                <p
                  style={{
                    color: "#555",
                    fontSize: "0.55rem",
                    fontFamily: "'Courier New', monospace",
                    fontWeight: 500,
                  }}
                >
                  G1S2FG35
                </p>
              </div>
              <div className="flex items-end gap-px">
                {[
                  3, 1, 2, 1, 3, 2, 1, 3, 1, 2, 3, 1, 2, 1, 3, 2, 1, 2, 3,
                  1, 2, 1, 3, 1, 2, 3, 1, 2, 1, 3, 2, 1, 3, 1, 2,
                ].map((w, i) => (
                  <div
                    key={i}
                    style={{
                      width: `${w}px`,
                      height: "20px",
                      backgroundColor: "#000",
                    }}
                  />
                ))}
                <div
                  style={{
                    width: "12px",
                    height: "20px",
                    backgroundColor: "#00A651",
                    borderRadius: "1px",
                    marginLeft: "2px",
                  }}
                />
              </div>
            </div>
          </div>

          {/* R1C2 - Urbanist Typeface */}
          <div
            className="flex flex-col justify-between overflow-hidden rounded-xl md:rounded-2xl lg:rounded-3xl p-3 md:p-4"
            style={{
              gridColumn: "2",
              gridRow: "1",
              backgroundColor: "#00A651",
              padding: "18px 20px 12px",
            }}
          >
            <p
              style={{
                color: "white",
                fontWeight: 700,
                fontSize: "1.1rem",
                lineHeight: 1.25,
                fontFamily: "system-ui, sans-serif",
              }}
            >
              Urbanist
              <br />
              typeface
            </p>
            <p
              style={{
                color: "white",
                fontWeight: 600,
                fontSize: "4.2rem",
                lineHeight: 0.85,
                fontFamily: "'Georgia', serif",
              }}
            >
              Aa
            </p>
          </div>

          {/* R1C3 - White Empty */}
          <div
            className="rounded-xl md:rounded-2xl lg:rounded-3xl hidden sm:block"
            style={{
              gridColumn: "3",
              gridRow: "1",
              backgroundColor: "white",
            }}
          />

          {/* R1-2C4 - Phone on Green Beads */}
          <div
            className="overflow-hidden relative rounded-xl md:rounded-2xl lg:rounded-3xl row-span-2 hidden sm:block"
            style={{
              gridColumn: "4",
              gridRow: "1 / 3",
              background:
                "linear-gradient(160deg, #1a7a3a 0%, #00A651 40%, #2ecc71 100%)",
            }}
          >
            <div className="absolute inset-0">
              {(() => {
                const spheres = [];
                for (let row = 0; row < 12; row++) {
                  for (let col = 0; col < 6; col++) {
                    const size = 22 + ((row * col * 7) % 18);
                    const x = col * 18 + ((row % 2) * 9) + 2;
                    const y = row * 9 + 1;
                    spheres.push(
                      <div
                        key={`${row}-${col}`}
                        className="absolute rounded-full"
                        style={{
                          width: `${size}px`,
                          height: `${size}px`,
                          left: `${x}%`,
                          top: `${y}%`,
                          background: `radial-gradient(circle at 35% 30%, #6ee69a, #00A651 50%, #006633)`,
                          boxShadow:
                            "inset -2px -3px 5px rgba(0,0,0,0.25), inset 2px 2px 4px rgba(255,255,255,0.15)",
                        }}
                      />
                    );
                  }
                }
                return spheres;
              })()}
            </div>
            <div
              className="absolute"
              style={{
                top: "8%",
                right: "-20%",
                width: "85%",
                transform: "rotate(18deg)",
              }}
            >
              <div
                style={{
                  background: "#1a1a1a",
                  borderRadius: "22px",
                  aspectRatio: "9/19",
                  boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
                  border: "3px solid #333",
                  overflow: "hidden",
                }}
              >
                <div className="relative w-full h-full">
                  <div
                    className="absolute"
                    style={{
                      top: "6%",
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: "45%",
                      height: "28%",
                      borderRadius: "16px",
                      background: "#222",
                    }}
                  >
                    <div className="absolute rounded-full" style={{ width: "16px", height: "16px", top: "15%", left: "20%", background: "radial-gradient(circle, #1a3a4a 30%, #0a1a2a 60%, #000)", border: "2px solid #333" }} />
                    <div className="absolute rounded-full" style={{ width: "16px", height: "16px", top: "15%", right: "20%", background: "radial-gradient(circle, #1a3a4a 30%, #0a1a2a 60%, #000)", border: "2px solid #333" }} />
                    <div className="absolute rounded-full" style={{ width: "16px", height: "16px", bottom: "15%", left: "50%", transform: "translateX(-50%)", background: "radial-gradient(circle, #1a3a4a 30%, #0a1a2a 60%, #000)", border: "2px solid #333" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* R2C1 - Phone Mockup on Green */}
          <div
            className="overflow-hidden relative rounded-xl md:rounded-2xl lg:rounded-3xl"
            style={{ gridColumn: "1", gridRow: "2", backgroundColor: "#00A651" }}
          >
            <div className="absolute" style={{ top: "4%", left: "6%", width: "90%", transform: "rotate(-5deg) perspective(1000px) rotateY(3deg)" }}>
              <div style={{ background: "#000", borderRadius: "18px", aspectRatio: "9/16.5", boxShadow: "0 15px 40px rgba(0,0,0,0.4)", border: "2px solid #222", overflow: "hidden", padding: "6px" }}>
                <div className="flex justify-between items-center px-2 pt-1" style={{ fontSize: "0.5rem", color: "white" }}>
                  <span style={{ fontWeight: 600 }}>11:52</span>
                  <div className="flex gap-0.5 items-center">
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="white"><rect x="0" y="5" width="2" height="3" rx="0.5" /><rect x="3" y="3" width="2" height="5" rx="0.5" /><rect x="6" y="1" width="2" height="7" rx="0.5" /></svg>
                    <svg width="12" height="7" viewBox="0 0 12 7" fill="none" stroke="white" strokeWidth="1"><rect x="0.5" y="0.5" width="9" height="6" rx="1" /><rect x="10" y="2" width="1.5" height="3" rx="0.5" fill="white" /></svg>
                  </div>
                </div>
                <div className="flex items-center justify-center mt-3 mb-2">
                  <div className="rounded-xl flex items-center gap-1.5 px-2 py-1" style={{ background: "rgba(255,59,48,0.9)" }}>
                    <span style={{ color: "white", fontSize: "0.4rem", fontWeight: 500 }}>Friday</span>
                    <span style={{ color: "white", fontSize: "0.85rem", fontWeight: 700 }}>26</span>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-x-2 gap-y-2 px-2" style={{ marginTop: "4px" }}>
                  {[
                    { bg: "#00A651", label: "Technexus" },
                    { bg: "#FF3B30", label: "Calendar" },
                    { bg: "linear-gradient(135deg, #FF9500, #FFCC00, #4CD964, #5AC8FA, #007AFF, #5856D6)", label: "Photos" },
                    { bg: "#007AFF", label: "Maps" },
                    { bg: "#007AFF", label: "Maps" },
                    { bg: "#000", label: "Clock" },
                  ].map((app, i) => (
                    <div key={i} className="flex flex-col items-center" style={{ gap: "2px" }}>
                      <div className="flex items-center justify-center" style={{ width: "28px", height: "28px", borderRadius: "7px", background: app.bg }} />
                      <span style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.3rem", textAlign: "center" }}>{app.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* R2C2-3 - Large White Empty */}
          <div className="rounded-xl md:rounded-2xl lg:rounded-3xl col-span-2 sm:col-span-2" style={{ gridColumn: "2 / 4", gridRow: "2", backgroundColor: "white" }} />

          {/* R3C1-2 - Laptop Mockup */}
          <div className="overflow-hidden relative rounded-xl md:rounded-2xl lg:rounded-3xl col-span-2" style={{ gridColumn: "1 / 3", gridRow: "3", background: "linear-gradient(155deg, #c8ccd4 0%, #a8acb4 40%, #b0b4bc 100%)" }}>
            <div className="absolute flex items-end justify-center" style={{ inset: "14px 16px 12px" }}>
              <div style={{ width: "90%", height: "85%", background: "white", borderRadius: "8px 8px 0 0", overflow: "hidden", boxShadow: "0 -2px 15px rgba(0,0,0,0.08)", border: "3px solid #888", borderBottom: "none" }}>
                <div className="flex items-center gap-1.5 px-3 py-1.5" style={{ background: "#f5f5f5", borderBottom: "1px solid #e0e0e0" }}>
                  <div className="flex gap-1">
                    <div className="rounded-full" style={{ width: "5px", height: "5px", background: "#FF5F56" }} />
                    <div className="rounded-full" style={{ width: "5px", height: "5px", background: "#FFBD2E" }} />
                    <div className="rounded-full" style={{ width: "5px", height: "5px", background: "#27C93F" }} />
                  </div>
                  <div style={{ flex: 1, background: "white", borderRadius: "4px", padding: "2px 8px", fontSize: "0.4rem", color: "#999", textAlign: "center", border: "1px solid #e0e0e0" }}>technexus</div>
                </div>
                <div className="flex flex-col items-center justify-center" style={{ padding: "12px 16px" }}>
                  <div className="flex gap-2" style={{ marginBottom: "8px" }}>
                    {[0, 1, 2].map((i) => (
                      <div key={i} className="rounded-full" style={{ width: "32px", height: "32px", background: i === 0 ? "linear-gradient(135deg, #00A651, #00D168)" : i === 1 ? "linear-gradient(135deg, #00C853, #69F0AE)" : "linear-gradient(135deg, #00A651, #00E676)", boxShadow: "0 2px 8px rgba(0,166,81,0.3)" }} />
                    ))}
                  </div>
                  <p style={{ fontSize: "0.6rem", fontWeight: 700, color: "#1a1a1a", textAlign: "center", lineHeight: 1.35 }}>Connecting Ideas,<br />Empowering Innovation</p>
                </div>
              </div>
            </div>
          </div>

          {/* R3C3 - Green Blob */}
          <div className="overflow-hidden relative rounded-xl md:rounded-2xl lg:rounded-3xl hidden sm:block" style={{ gridColumn: "3", gridRow: "3", background: "linear-gradient(145deg, #009944 0%, #00C853 50%, #76FF03 100%)" }}>
            {[{ size: 55, x: 25, y: 30 }, { size: 40, x: 60, y: 55 }, { size: 30, x: 70, y: 20 }, { size: 22, x: 18, y: 72 }, { size: 14, x: 78, y: 78 }, { size: 48, x: 42, y: 48 }, { size: 18, x: 85, y: 42 }, { size: 10, x: 50, y: 15 }].map((s, i) => (
              <div key={i} className="absolute rounded-full" style={{ width: `${s.size}px`, height: `${s.size}px`, left: `${s.x}%`, top: `${s.y}%`, transform: "translate(-50%, -50%)", background: `radial-gradient(circle at 32% 28%, rgba(255,255,255,0.35), rgba(100,220,120,0.5) 40%, rgba(0,140,60,0.85))`, boxShadow: "0 6px 18px rgba(0,0,0,0.18), inset 0 -3px 6px rgba(0,0,0,0.12), inset 0 3px 6px rgba(255,255,255,0.18)" }} />
            ))}
          </div>

          {/* R3C4 - Solid Green */}
          <div className="rounded-xl md:rounded-2xl lg:rounded-3xl hidden lg:block" style={{ gridColumn: "4", gridRow: "3", background: "linear-gradient(145deg, #00B856 0%, #00D168 60%, #00E676 100%)" }} />
        </div>
          </div>

          {/* Footer Features Bar - Split Navy/Black with Wave Curve */}
          <div className="relative overflow-hidden h-auto md:h-[73px]" style={{ backgroundColor: "#1E2235" }}>
        {/* Left navy background - full width base */}
        <div style={{ position: "absolute", inset: 0, backgroundColor: "#1E2235" }} />

        {/* Right black background with precise split mask - hidden on mobile */}
        <div
          className="hidden lg:block"
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: "511.6px",
            overflow: "hidden",
            backgroundColor: "#141826",
          }}
        >
          {/* Marquee sits under the curved SVG so copy clips along the wave */}
          <div
            className="hero-marquee-fade-x-curve pointer-events-none absolute inset-0 z-1 flex items-center overflow-hidden"
            aria-hidden
          >
            <div className="hero-marquee-track flex items-center">
              <HeroFeatureMarqueeStrip />
            </div>
          </div>
          <svg
            width="93.0993"
            height="73.0779"
            viewBox="0 0 94 74"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ position: "absolute", top: 0, left: 0, zIndex: 2 }}
          >
            <g clipPath="url(#clip0_33_691)">
              <g clipPath="url(#clip1_33_691)">
                <path d="M0 -0.00012207C0 -0.00012207 0 58.6905 0 73.0778C67.572 73.0778 29.8408 -0.00012207 93.0993 -0.00012207H0Z" fill="#1E2235" />
              </g>
            </g>
            <defs>
              <clipPath id="clip0_33_691">
                <rect width="93.0993" height="73.0779" fill="white" />
              </clipPath>
              <clipPath id="clip1_33_691">
                <rect width="93.0993" height="73.0779" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>

        {/* Content layer */}
            <div
              className="px-4 md:px-8 lg:px-12 py-4 md:py-0 flex flex-col md:flex-row items-center md:items-center gap-4 md:gap-0 h-full"
              style={{
                position: "relative",
                zIndex: 2,
              }}
            >
          {/* Left - Cookie icon + text */}
          <div className="flex items-center justify-center md:justify-start gap-2 md:gap-3 lg:gap-[14px] md:mr-auto">
            {/* Cookie icon */}
            <svg
              className="w-4 h-4 md:w-5 md:h-5 lg:w-[22px] lg:h-[22px] flex-shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(255,255,255,0.7)"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <circle cx="8" cy="9" r="1" fill="rgba(255,255,255,0.7)" />
              <circle cx="14" cy="8" r="1" fill="rgba(255,255,255,0.7)" />
              <circle cx="10" cy="14" r="1" fill="rgba(255,255,255,0.7)" />
              <circle cx="16" cy="13" r="1" fill="rgba(255,255,255,0.7)" />
              <circle cx="12" cy="11" r="0.8" fill="rgba(255,255,255,0.7)" />
              {/* Bite mark */}
              <path d="M18.5,5.5 Q21,8 19,11" stroke="rgba(255,255,255,0.7)" fill="none" />
            </svg>
            <span className="text-white text-xs sm:text-sm md:text-base lg:text-[18.12px] font-medium leading-tight text-center md:text-left">
              Join thousands of healthy kids,{" "}
              <a href="#blogs" className="underline cursor-pointer">
                Read More
              </a>
            </span>
          </div>

          {/* Below lg the black+curve column is hidden — marquee only here */}
          <div className="w-full overflow-hidden lg:hidden">
            <div className="hero-marquee-fade-x pointer-events-none flex min-h-5 items-center overflow-hidden" aria-hidden>
              <div className="hero-marquee-track flex items-center">
                <HeroFeatureMarqueeStrip />
              </div>
            </div>
          </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}