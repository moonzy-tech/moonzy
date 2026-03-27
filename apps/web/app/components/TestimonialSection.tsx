export default function TestimonialSection() {
  return (
    <section
      id="about"
      className="bg-[#141826] py-12 md:py-16 lg:py-20 px-6 md:px-10 lg:px-6 relative flex flex-col items-center justify-center text-center"
    >
      {/* Owl (decorative) - placed left without affecting centered text */}
      <div
        className="absolute left-2 md:left-4 lg:left-[max(1rem,calc(50%-700px))] top-1/2 -translate-y-1/2 w-32 h-40 md:w-48 md:h-60 lg:w-[255px] lg:h-[336px] pointer-events-none opacity-60 md:opacity-80 lg:opacity-100 hidden sm:block animate-float"
      >
        <img
          src="/owl.png"
          alt=""
          className="w-full h-full object-contain"
        />
      </div>

      <div className="max-w-[900px] w-full px-4 md:px-0 opacity-0 animate-fadeInUp" style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}>
      {/* Top subtitle */}
      <p
        className="font-serif italic text-[rgba(175,165,148,0.55)] text-lg md:text-xl lg:text-[1.45rem] mb-4 md:mb-5 tracking-wide"
      >
        You were never doing it wrong.
      </p>

      {/* Main headline */}
      <h2
        className="font-serif text-[#F5F0E8] text-[clamp(2rem,6.4vw,5.3rem)] md:text-[clamp(2.5rem,6.4vw,5.3rem)] lg:text-[clamp(3.2rem,6.4vw,5.3rem)] font-semibold leading-tight mb-8 md:mb-10 max-w-[900px]"
        style={{
          letterSpacing: "-0.02em",
        }}
      >
        You were just awake
        <br />
        at the{" "}
        <em
          className="italic text-[#D4A94C]"
        >
          right
        </em>{" "}
        time.
      </h2>

      {/* Dashed vertical line */}
      <div className="w-full flex justify-center mb-4 md:mb-5">
        <div
          className="w-[2.5px] h-12 md:h-14 lg:h-[60px]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to bottom, rgba(175, 165, 148, 0.35) 0 6px, rgba(0,0,0,0) 6px 12px)",
          }}
        />
      </div>

      {/* Bottom subtitle */}
      <p
        className="font-serif italic text-[rgba(175,165,148,0.55)] text-lg md:text-xl lg:text-[1.55rem] tracking-wide"
      >
        This was always yours.
      </p>
      </div>
    </section>
  );
}