"use client";

export default function CreateBoxSection() {
  const steps = [
    { num: 1, text: "Choose Your Favorites" },
    { num: 2, text: "Mix & Match Freely" },
    { num: 3, text: "Enjoy Doorstep Delivery" },
  ];

  return (
    <section className="bg-[#141826] py-12 md:py-16 lg:py-20">
      <div
        className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6 items-stretch"
      >
        {/* Left Side - Card */}
        <div
          className="bg-[#1E2235] rounded-2xl md:rounded-3xl lg:rounded-[24px] p-8 md:p-12 lg:p-14 flex flex-col justify-between min-h-[500px] md:min-h-[580px] lg:min-h-[640px] transform transition-all duration-700 hover:scale-[1.02] hover:shadow-2xl opacity-0 animate-fadeInUp"
          style={{
            animationDelay: '100ms',
            animationFillMode: 'forwards'
          }}
        >
          <div>
            {/* Heading */}
            <h2
              className="font-serif text-[#F5F0E8] text-3xl sm:text-4xl md:text-5xl lg:text-[3.2rem] font-semibold leading-tight mb-4 md:mb-5"
              style={{
                letterSpacing: "0.03em",
              }}
            >
              Create a Box for
              <br />
              night owls
            </h2>

            {/* Description */}
            <p
              className="text-white text-sm md:text-base leading-relaxed max-w-[520px] mb-8 md:mb-10 lg:mb-11"
              style={{
                fontFamily: "'Instrument Sans', sans-serif",
                fontWeight: 350,
                letterSpacing: "0.03em",
              }}
            >
              Mix and match smoothies, cookies, and snacks to create the perfect
              box for your family. Choose what your kids love most, enjoy the
              freedom to customize, and have it delivered right to your door.
            </p>

            {/* Steps */}
            <div className="flex flex-col gap-4 md:gap-5">
              {steps.map((step) => (
                <div
                  key={step.num}
                  className="flex items-center gap-3 md:gap-4"
                >
                  {/* Number circle */}
                  <div
                    className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-[#878A86] flex items-center justify-center shrink-0"
                    style={{
                      boxShadow:
                        "inset 0 1px 2px rgba(255,255,255,0.15), 0 2px 6px rgba(0,0,0,0.3)",
                    }}
                  >
                    <span
                      className="font-serif text-[#D4A94C] text-sm md:text-[0.9rem] font-semibold"
                    >
                      {step.num}
                    </span>
                  </div>

                  {/* Step text */}
                  <span
                    className="font-serif text-[#F5F0E8] text-base md:text-lg lg:text-xl"
                  >
                    {step.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Button with gradient border */}
          <div
            className="mt-8 md:mt-10 lg:mt-11 relative rounded-full p-[1.5px]"
            style={{
              background:
                "linear-gradient(90deg, #4A6CF7 0%, #9B59B6 40%, #E74C8A 70%, #F39C12 100%)",
            }}
          >
            <button
              className="w-full px-6 md:px-8 py-3 md:py-4 rounded-full border-none bg-[#15172a] text-[#F5F0E8] font-serif text-sm md:text-base font-semibold cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              style={{
                letterSpacing: "0.02em",
              }}
            >
              Shop the Night
            </button>
          </div>
        </div>

        {/* Right Side - Product Box Image */}
        <div
          className="rounded-2xl md:rounded-3xl lg:rounded-[24px] overflow-hidden relative min-h-[400px] md:min-h-[500px] lg:min-h-[640px] transform transition-all duration-700 hover:scale-[1.02] hover:shadow-2xl opacity-0 animate-fadeInUp"
          style={{
            animationDelay: '300ms',
            animationFillMode: 'forwards'
          }}
        >
          <img
            src="/products/moonzy-box.png"
            alt="Moonzy snack box with assorted millet puffs and chips"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
            onError={(e) => {
              e.currentTarget.style.display = "none";
              if (e.currentTarget.nextElementSibling) {
                (e.currentTarget.nextElementSibling as HTMLElement).style.display = "flex";
              }
            }}
          />
          {/* Fallback placeholder */}
          <div
            style={{
              display: "none",
              width: "100%",
              height: "100%",
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(145deg, #1a1c2e 0%, #12141f 50%, #0a0b14 100%)",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "16px",
              borderRadius: "24px",
            }}
          >
            {/* Moonzy logo placeholder */}
            <div
              style={{
                fontSize: "2.5rem",
                fontWeight: 900,
                color: "white",
                fontFamily: "system-ui, sans-serif",
                letterSpacing: "0.05em",
              }}
            >
              M
              <span style={{ color: "#F5C518" }}>OO</span>
              NZY
            </div>

            {/* Product packets representation */}
            <div
              style={{
                display: "flex",
                gap: "8px",
                marginTop: "20px",
              }}
            >
              {[
                { color: "#7BF0A8", label: "Pudina" },
                { color: "#F5A84B", label: "Caramel" },
                { color: "#F07878", label: "Peri-Peri" },
                { color: "#7BF0A8", label: "Pudina" },
              ].map((p, i) => (
                <div
                  key={i}
                  style={{
                    width: "80px",
                    height: "120px",
                    backgroundColor: p.color,
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transform: `rotate(${-8 + i * 5}deg)`,
                    boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.5rem",
                      color: "#1a1a1a",
                      fontWeight: 700,
                      textAlign: "center",
                    }}
                  >
                    {p.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Red shredded paper effect */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "30%",
                background:
                  "linear-gradient(0deg, rgba(200,40,40,0.3) 0%, transparent 100%)",
                borderRadius: "0 0 24px 24px",
              }}
            />

            {/* Sleep mask */}
            <div
              style={{
                marginTop: "12px",
                width: "100px",
                height: "36px",
                backgroundColor: "#222",
                borderRadius: "999px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
              }}
            >
              <span
                style={{
                  fontSize: "0.45rem",
                  color: "white",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                }}
              >
                MOONZY
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}