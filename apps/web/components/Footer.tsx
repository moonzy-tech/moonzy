export default function Footer() {
  return (
    <footer id="contact" className="bg-[#0B1811] text-white">
      <div className="mx-auto max-w-6xl px-6 py-10 lg:px-10 lg:py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="space-y-3 md:space-y-4">
            <p className="text-xs uppercase tracking-[0.35em] text-[#F2D9A2]">
              Moonzy
            </p>
            <h2 className="text-2xl font-bold leading-snug sm:text-3xl">
              Bold crunch. Big flavour.
            </h2>
            <p className="max-w-md text-xs leading-relaxed text-white/75 sm:text-sm">
              Late-night binge, game night or chai break – there&apos;s a Moonzy
              mood for every moment. Snack loud, live bold, and share the crunch
              with your crew.
            </p>
          </div>

          <div className="flex flex-col gap-6 text-sm md:text-xs lg:text-sm">
            <div className="flex flex-wrap gap-3 md:justify-end">
              <a
                href="#about-us-heading"
                className="rounded-full bg-[#F2D9A2] px-5 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[#1E3B2A] shadow-lg shadow-black/30 transition hover:-translate-y-0.5 hover:shadow-xl"
              >
                About
              </a>
              <a
                href="#product-range-heading"
                className="rounded-full border border-white/30 px-4 py-1.5 text-[0.7rem] uppercase tracking-[0.2em] text-white/90 transition hover:-translate-y-0.5 hover:border-white hover:bg-white/10"
              >
                Flavours
              </a>
            </div>

            <div className="flex flex-col gap-3 text-xs text-white/65 md:items-end md:text-right">
              <div className="space-y-1">
                <p className="font-medium text-white">Contact</p>
                <p>Email: <a href="mailto:bemoonzy@gmail.com" className="underline underline-offset-2 hover:text-white">bemoonzy@gmail.com</a></p>
                <p>Phone: <a href="tel:+918390255117" className="underline underline-offset-2 hover:text-white">+91 83902 55117</a></p>
              </div>
              <p>Made with extra crunch and extra character in India.</p>
              <p className="text-[0.65rem] text-white/45">
                © {new Date().getFullYear()} Moonzy. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

