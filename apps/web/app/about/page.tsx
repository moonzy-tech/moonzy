"use client";

import Navigation from "../components/Navigation";
import FooterSection from "../components/FooterSection";

export default function AboutPage() {
  return (
    <main className="bg-[#141826] min-h-screen">
      <Navigation />

      {/* ═══════════════════════════════════════════
          HERO — Editorial masthead
          ═══════════════════════════════════════════ */}
      <section className="relative pt-24 pb-16 md:pb-20 overflow-hidden">
        {/* Subtle radial glow behind the heading */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] pointer-events-none opacity-[0.07]"
          style={{
            background:
              "radial-gradient(ellipse at center, #D4A94C 0%, transparent 70%)",
          }}
        />

        <div className="relative max-w-[1200px] mx-auto px-6 md:px-10 lg:px-12 text-center">
          {/* Eyebrow */}
          <p
            className="text-[#D4A94C] text-xs font-semibold uppercase tracking-[0.25em] mb-5 opacity-0 animate-fadeInUp"
            style={{
              fontFamily: "'Instrument Sans', system-ui, sans-serif",
              animationDelay: "100ms",
              animationFillMode: "forwards",
            }}
          >
            Our Story
          </p>

          {/* Title */}
          <h1
            className="text-[#F5F0E8] text-5xl md:text-6xl lg:text-7xl font-normal mb-5 md:mb-6 opacity-0 animate-fadeInUp"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              animationDelay: "200ms",
              animationFillMode: "forwards",
            }}
          >
            Made for midnight cravings
          </h1>

          {/* Subtitle */}
          <p
            className="text-[rgba(200,195,185,0.6)] text-base md:text-lg max-w-[620px] mx-auto leading-relaxed opacity-0 animate-fadeInUp"
            style={{
              fontFamily: "'Instrument Sans', system-ui, sans-serif",
              animationDelay: "300ms",
              animationFillMode: "forwards",
            }}
          >
            We turn everyday snack moments into happy, healthy ones. Crafting
            fruity sips, crunchy cookies, and wholesome snacks using simple
            ingredients and lots of care.
          </p>

          {/* Decorative rule */}
          <div
            className="flex items-center justify-center gap-3 mt-8 opacity-0 animate-fadeInUp"
            style={{ animationDelay: "400ms", animationFillMode: "forwards" }}
          >
            <span className="h-px w-16 bg-[rgba(200,195,185,0.15)]" />
            <span className="w-1.5 h-1.5 rotate-45 border border-[#D4A94C]/40" />
            <span className="h-px w-16 bg-[rgba(200,195,185,0.15)]" />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          STATS SECTION — 4 column grid
          ═══════════════════════════════════════════ */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-12 mb-16 md:mb-24">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {[
            {
              percent: "100%",
              title: "Kid-Friendly Goodness",
              desc: "Made with real fruit, with care and quality ingredients.",
              delay: "450ms",
            },
            {
              percent: "97%",
              title: "Customer Satisfaction",
              desc: "Loved by parents and kids for taste, quality & peace of mind.",
              delay: "500ms",
            },
            {
              percent: "85%",
              title: "Less Unnecessary Extras",
              desc: "Clean labels, simple recipes, and nothing kids don't need.",
              delay: "550ms",
            },
            {
              percent: "95%",
              title: "Snack-Time Favorites",
              desc: "A favorite choice for happy, healthy snack moments.",
              delay: "600ms",
            },
          ].map((stat, index) => (
            <div
              key={index}
              className="rounded-[16px] md:rounded-[20px] bg-[#1A1F33]/60 border border-[rgba(200,195,185,0.07)] p-6 md:p-8 opacity-0 animate-fadeInUp"
              style={{
                animationDelay: stat.delay,
                animationFillMode: "forwards",
              }}
            >
              <h2
                className="text-[#F5F0E8] text-4xl md:text-5xl font-normal mb-3 md:mb-4"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {stat.percent}
              </h2>
              <h3
                className="text-[#D4A94C] text-sm md:text-base font-semibold uppercase tracking-[0.1em] mb-2 md:mb-3"
                style={{ fontFamily: "'Instrument Sans', system-ui, sans-serif" }}
              >
                {stat.title}
              </h3>
              <p
                className="text-[rgba(200,195,185,0.55)] text-sm leading-relaxed"
                style={{ fontFamily: "'Instrument Sans', system-ui, sans-serif" }}
              >
                {stat.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          MISSION SECTION — Image + Text (Two Column)
          ═══════════════════════════════════════════ */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-12 mb-16 md:mb-24">
        <div
          className="grid lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12 items-center opacity-0 animate-fadeInUp"
          style={{ animationDelay: "650ms", animationFillMode: "forwards" }}
        >
          {/* Image */}
          <div className="relative rounded-[20px] md:rounded-[28px] overflow-hidden aspect-[4/3]">
            <img
              src="/placeholder-about-1.jpg"
              alt="Wholesome snacks for happy, growing kids"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.background = "#2B2D3A";
              }}
            />
          </div>

          {/* Text Content */}
          <div>
            <p
              className="text-[#D4A94C] text-xs font-semibold uppercase tracking-[0.2em] mb-4"
              style={{ fontFamily: "'Instrument Sans', system-ui, sans-serif" }}
            >
              Wholesome Snacks
            </p>
            <h2
              className="text-[#F5F0E8] text-3xl md:text-4xl lg:text-5xl font-normal mb-5 md:mb-6 leading-[1.15]"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              For happy, growing kids
            </h2>
            <p
              className="text-[rgba(200,195,185,0.6)] text-base md:text-lg leading-relaxed mb-6"
              style={{ fontFamily: "'Instrument Sans', system-ui, sans-serif" }}
            >
              We make fruit smoothies, cookies, and snacks that kids love and
              parents can trust. Thoughtfully crafted with clean ingredients and
              simple recipes, our treats are designed to support growing bodies
              while making snack time fun, easy, and worry-free.
            </p>

            {/* Feature List */}
            <div className="space-y-4">
              {[
                {
                  title: "100% Natural Ingredients",
                  icon: (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  ),
                },
                {
                  title: "Gently Baked, Perfectly Crunchy",
                  icon: (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                    </svg>
                  ),
                },
                {
                  title: "No Artificial Sweeteners",
                  icon: (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  ),
                },
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#D4A94C]/15 text-[#D4A94C]">
                    {feature.icon}
                  </div>
                  <p
                    className="text-[#F5F0E8] text-sm md:text-base font-medium"
                    style={{ fontFamily: "'Instrument Sans', system-ui, sans-serif" }}
                  >
                    {feature.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          STORY SECTION — Reverse Layout (Text + Image)
          ═══════════════════════════════════════════ */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-12 mb-20 md:mb-28">
        <div
          className="grid lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12 items-center opacity-0 animate-fadeInUp"
          style={{ animationDelay: "700ms", animationFillMode: "forwards" }}
        >
          {/* Text Content — comes first on mobile, second on desktop */}
          <div className="lg:order-2">
            <p
              className="text-[#D4A94C] text-xs font-semibold uppercase tracking-[0.2em] mb-4"
              style={{ fontFamily: "'Instrument Sans', system-ui, sans-serif" }}
            >
              About Us
            </p>
            <h2
              className="text-[#F5F0E8] text-3xl md:text-4xl lg:text-5xl font-normal mb-5 md:mb-6 leading-[1.15]"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Made for kids. Trusted by parents.
            </h2>
            <p
              className="text-[rgba(200,195,185,0.6)] text-base md:text-lg leading-relaxed mb-5"
              style={{ fontFamily: "'Instrument Sans', system-ui, sans-serif" }}
            >
              We wanted to create food that feels joyful for kids and reassuring
              for parents. What began as a small passion for better kids&apos;
              nutrition grew into a range of fruit smoothies, cookies, and snacks
              made to fit real family life.
            </p>
            <p
              className="text-[rgba(200,195,185,0.6)] text-base md:text-lg leading-relaxed"
              style={{ fontFamily: "'Instrument Sans', system-ui, sans-serif" }}
            >
              From busy mornings to after-school breaks, we&apos;re here to make
              everyday moments a little healthier and a lot happier.
            </p>

            {/* Key Points */}
            <div className="mt-8 space-y-3">
              {[
                "Certified Premium Ingredients",
                "Thoughtfully Balanced Nutrition",
                "Enjoy Doorstep Delivery",
              ].map((point, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D4A94C]" />
                  <p
                    className="text-[#F5F0E8] text-sm md:text-base"
                    style={{ fontFamily: "'Instrument Sans', system-ui, sans-serif" }}
                  >
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Image — comes second on mobile, first on desktop */}
          <div className="lg:order-1 relative rounded-[20px] md:rounded-[28px] overflow-hidden aspect-[4/3]">
            <img
              src="/placeholder-about-2.jpg"
              alt="Made for kids, trusted by parents"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.background = "#2B2D3A";
              }}
            />
          </div>
        </div>
      </section>

      <FooterSection />
    </main>
  );
}
