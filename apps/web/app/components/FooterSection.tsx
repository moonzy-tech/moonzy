export default function FooterSection() {
  return (
    <footer id="contact" className="bg-[#1D2235] pt-16 pb-10">
      <div className="max-w-[1080px] mx-auto px-auto">
        {/* Top Links Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-36 mb-16">
          {/* Contact Info */}
          <div className="flex flex-col gap-4">
            <p className="text-[rgba(200,195,185,0.55)] text-sm leading-relaxed font-[system-ui]">
              123 Maple Street, Springfield, IL<br />62704
            </p>
            <div>
              <p className="text-[rgba(200,195,185,0.55)] text-sm leading-relaxed font-[system-ui]">(473) 337 8901</p>
              <p className="text-[rgba(200,195,185,0.55)] text-sm leading-relaxed font-[system-ui]">hello@monchies.com</p>
            </div>
          </div>

          {/* Hours */}
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-[rgba(200,195,185,0.55)] text-sm leading-relaxed font-[system-ui]">Monday - Friday</p>
              <p className="text-[rgba(200,195,185,0.55)] text-sm leading-relaxed font-[system-ui]">12:00 PM - 10:00PM</p>
            </div>
            <div>
              <p className="text-[rgba(200,195,185,0.55)] text-sm leading-relaxed font-[system-ui]">Saturday - Sunday</p>
              <p className="text-[rgba(200,195,185,0.55)] text-sm leading-relaxed font-[system-ui]">12:00 PM - 6:00PM</p>
            </div>
          </div>

          {/* Nav Links */}
          <div className="flex flex-col gap-2">
            {["HOME", "SHOP", "ABOUT US", "CONTACT US"].map((link) => (
              <a key={link} href="#" className="text-[#F5F0E8] text-sm font-medium no-underline tracking-wide leading-loose hover:opacity-80 transition-opacity font-[system-ui]">
                {link}
              </a>
            ))}
          </div>

          {/* More Links */}
          <div className="flex flex-col gap-2">
            {["COOKIES", "SNACK", "BESTSELLERS", "KID FAVOURITES"].map((link) => (
              <a key={link} href="#" className="text-[#F5F0E8] text-sm font-medium no-underline tracking-wide leading-loose hover:opacity-80 transition-opacity font-[system-ui]">
                {link}
              </a>
            ))}
          </div>
        </div>

        {/* MOONZY Logo */}
        <div className="text-center mb-16">
          <h1 className="font-serif text-white font-bold tracking-[0.45em] leading-none" style={{ fontSize: "clamp(4rem, 11vw, 11rem)" }}>
            MOONZY
          </h1>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[rgba(200,195,185,0.4)] text-xs font-bold tracking-wider uppercase font-[system-ui]">
            © 2025 Crafted & Designed by <span className="text-[rgba(245,240,232,0.7)]">NXSON</span>
          </p>
          <div className="flex gap-8">
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