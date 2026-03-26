export default function FooterSection() {
  return (
    <footer id="contact" className="bg-[#1D2235] py-12 md:py-16 lg:py-18 pb-10 md:pb-12">
      <div className="max-w-[1080px] mx-auto px-6 md:px-8 lg:px-6">
        {/* Top Links Grid - 4 columns with specific proportions */}
        <div
          className="grid grid-cols-2 lg:grid-cols-[1.3fr_1.2fr_0.8fr_1fr] gap-4 md:gap-8 lg:gap-8 mb-10 md:mb-12 lg:mb-13 items-start"
        >
          {/* Column 1 - Contact Info */}
          <div className="flex flex-col gap-4">
            <p
              className="text-[rgba(200,195,185,0.55)] text-sm md:text-[0.88rem] leading-relaxed"
              style={{
                fontFamily: "'Instrument Sans', system-ui, sans-serif",
              }}
            >
              123 Maple Street, Springfield, IL
              <br />
              62704
            </p>
            <div>
              <p
                className="text-[rgba(200,195,185,0.55)] text-sm md:text-[0.88rem] leading-relaxed"
                style={{
                  fontFamily: "'Instrument Sans', system-ui, sans-serif",
                }}
              >
                (473) 337 8901
              </p>
              <p
                className="text-[rgba(200,195,185,0.55)] text-sm md:text-[0.88rem] leading-relaxed"
                style={{
                  fontFamily: "'Instrument Sans', system-ui, sans-serif",
                }}
              >
                hello@monchies.com
              </p>
            </div>
          </div>

          {/* Column 2 - Hours */}
          <div className="flex flex-col gap-4">
            <div>
              <p
                className="text-[rgba(200,195,185,0.55)] text-sm md:text-[0.88rem] leading-relaxed"
                style={{
                  fontFamily: "'Instrument Sans', system-ui, sans-serif",
                }}
              >
                Monday - Friday
              </p>
              <p
                className="text-[rgba(200,195,185,0.55)] text-sm md:text-[0.88rem] leading-relaxed"
                style={{
                  fontFamily: "'Instrument Sans', system-ui, sans-serif",
                }}
              >
                12:00 PM - 10:00PM
              </p>
            </div>
            <div>
              <p
                className="text-[rgba(200,195,185,0.55)] text-sm md:text-[0.88rem] leading-relaxed"
                style={{
                  fontFamily: "'Instrument Sans', system-ui, sans-serif",
                }}
              >
                Saturday - Sunday
              </p>
              <p
                className="text-[rgba(200,195,185,0.55)] text-sm md:text-[0.88rem] leading-relaxed"
                style={{
                  fontFamily: "'Instrument Sans', system-ui, sans-serif",
                }}
              >
                12:00 PM - 6:00PM
              </p>
            </div>
          </div>

          {/* Column 3 - Main Links */}
          <div className="flex flex-col gap-2">
            {["HOME", "SHOP", "ABOUT US", "CONTACT US"].map((link) => (
              <a
                key={link}
                href="#"
                className="text-[#F5F0E8] text-sm md:text-[0.88rem] font-medium no-underline tracking-wide leading-relaxed hover:opacity-80 transition-all duration-300 hover:translate-x-2"
                style={{
                  fontFamily: "'Instrument Sans', system-ui, sans-serif",
                }}
              >
                {link}
              </a>
            ))}
          </div>

          {/* Column 4 - Additional Links */}
          <div className="flex flex-col gap-2">
            {["COOKIES", "SNACK", "BESTSELLERS", "KID FAVOURITES"].map(
              (link) => (
                <a
                  key={link}
                  href="#"
                  className="text-[#F5F0E8] text-sm md:text-[0.88rem] font-medium no-underline tracking-wide leading-relaxed hover:opacity-80 transition-opacity"
                  style={{
                    fontFamily: "'Instrument Sans', system-ui, sans-serif",
                  }}
                >
                  {link}
                </a>
              )
            )}
          </div>
        </div>

        {/* Large MOONZY Logo - spaced letters, subtle opacity */}
        <div
          className="w-full flex text-center justify-center mb-12 md:mb-16 lg:mb-19"
          style={{
            textIndent: "1.55em",
          }}
        >
          <h1
            className="font-serif text-white font-extrabold"
            style={{
              fontSize: "clamp(3rem, 11vw, 11rem)",
              letterSpacing: "0.45em",
              lineHeight: 1.2,
            }}
          >
            MOONZY
          </h1>
        </div>



        {/* Bottom Bar */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-4 px-2 sm:px-0">
          <p
            className="text-[rgba(200,195,185,0.4)] text-xs md:text-[0.78rem] font-bold tracking-wider uppercase text-center sm:text-left order-2 sm:order-1"
            style={{
              fontFamily: "'Instrument Sans', system-ui, sans-serif",
            }}
          >
            © 2025 Crafted & Designed by{" "}
            <span className="text-[rgba(245,240,232,0.7)]">NXSON</span>
          </p>

          <div className="flex gap-4 sm:gap-6 md:gap-8 order-1 sm:order-2">
            {["TWITTER", "INSTAGRAM", "TIKTOK"].map((social) => (
              <a
                key={social}
                href="#"
                className="text-[#F5F0E8] text-xs md:text-[0.78rem] font-bold no-underline tracking-wider uppercase hover:opacity-80 transition-opacity"
                style={{
                  fontFamily: "'Instrument Sans', system-ui, sans-serif",
                }}
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}