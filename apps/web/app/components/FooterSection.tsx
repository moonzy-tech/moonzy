export default function FooterSection() {
  return (
    <footer id="contact" className="bg-[#1D2235] pt-16 pb-10">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-12">
        {/* Top Links Grid */}
        <div className="mb-10 grid grid-cols-2 gap-5 sm:mb-12 sm:gap-8 lg:mb-16 lg:grid-cols-4 lg:gap-16">
          {/* Contact Info */}
          <div className="flex flex-col gap-3">
            <p className="text-[rgba(200,195,185,0.55)] text-xs sm:text-sm leading-relaxed font-[system-ui]">
              123 Maple Street, Springfield, IL<br />62704
            </p>
            <div>
              <p className="text-[rgba(200,195,185,0.55)] text-xs sm:text-sm leading-relaxed font-[system-ui]">(473) 337 8901</p>
              <p className="hidden sm:block text-[rgba(200,195,185,0.55)] text-sm leading-relaxed font-[system-ui]">hello@monchies.com</p>
            </div>
          </div>

          {/* Hours */}
          <div className="flex flex-col gap-3">
            <div>
              <p className="text-[rgba(200,195,185,0.55)] text-xs sm:text-sm leading-relaxed font-[system-ui]">Monday - Friday</p>
              <p className="text-[rgba(200,195,185,0.55)] text-xs sm:text-sm leading-relaxed font-[system-ui]">12:00 PM - 10:00PM</p>
            </div>
            <div>
              <p className="text-[rgba(200,195,185,0.55)] text-xs sm:text-sm leading-relaxed font-[system-ui]">Saturday - Sunday</p>
              <p className="text-[rgba(200,195,185,0.55)] text-xs sm:text-sm leading-relaxed font-[system-ui]">12:00 PM - 6:00PM</p>
            </div>
          </div>

          {/* Nav Links */}
          <div className="flex flex-col gap-1 sm:gap-2">
            {["HOME", "SHOP", "ABOUT US", "CONTACT US"].map((link, idx) => (
              <a
                key={link}
                href="#"
                className={`text-[#F5F0E8] text-xs sm:text-sm font-medium no-underline tracking-wide leading-loose hover:opacity-80 transition-opacity font-[system-ui] ${idx > 1 ? "hidden sm:block" : ""}`}
              >
                {link}
              </a>
            ))}
          </div>

          {/* More Links */}
          <div className="flex flex-col gap-1 sm:gap-2">
            {["COOKIES", "SNACK", "BESTSELLERS", "KID FAVOURITES"].map((link, idx) => (
              <a
                key={link}
                href="#"
                className={`text-[#F5F0E8] text-xs sm:text-sm font-medium no-underline tracking-wide leading-loose hover:opacity-80 transition-opacity font-[system-ui] ${idx > 1 ? "hidden sm:block" : ""}`}
              >
                {link}
              </a>
            ))}
          </div>
        </div>

        {/* MOONZY Logo */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h1
            className="font-serif text-white font-bold tracking-[0.18em] sm:tracking-[0.25em] md:tracking-[0.45em] leading-none"
            style={{ fontSize: "clamp(3rem, 11vw, 11rem)" }}
          >
            MOONZY
          </h1>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-center sm:text-left text-[rgba(200,195,185,0.4)] text-xs font-bold tracking-wider uppercase font-[system-ui]">
            © 2025 Crafted & Designed by <span className="text-[rgba(245,240,232,0.7)]">NXSON</span>
          </p>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-4 sm:gap-8">
            {["TWITTER", "INSTAGRAM", "TIKTOK"].map((social) => (
              <a key={social} href="#" className="text-[#F5F0E8] text-xs font-bold no-underline tracking-wider uppercase hover:opacity-80 transition-opacity font-[system-ui]">
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}