import Image from "next/image";

export default function AboutUs() {
  return (
    <section
      className="py-16 md:py-24"
      aria-labelledby="about-us-heading"
    >
      <h1 className="text-sm uppercase tracking-[0.3em] text-center text-[#DB6716] lg:text-2xl mb-10">
            About Moonzy Munch
          </h1>
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 md:flex-row md:items-center lg:px-10">
        <div className="flex-1 space-y-4 md:space-y-6">
          <h2
            id="about-us-heading"
            className="text-3xl font-bold leading-tight text-[#1E3B2A] sm:text-4xl"
          >
            Snack loud, live bold,
            <br />
            crunch with character.
          </h2>
          <p className="text-sm leading-relaxed text-[#4C4A3F] sm:text-base">
            Moonzy brings together bold Indian flavours and an irresistibly
            light crunch. Every chip is crafted to be big on taste, easy on
            guilt, and perfect for sharing those unplanned, unforgettable
            moments with your people.
          </p>
          <p className="text-sm leading-relaxed text-[#4C4A3F] sm:text-base">
            From fiery masala kicks to cool, herby freshness and buttery
            caramel comfort, our flavours are made to match every mood. No
            boring bites, only snacks that keep up with your vibe.
          </p>
          <div className="flex flex-wrap gap-3">
            <span className="rounded-full bg-white/80 px-4 py-1.5 text-xs uppercase tracking-wide text-[#20562B] shadow-sm">
              Crunchy Texture
            </span>
            <span className="rounded-full bg-white/80 px-4 py-1.5 text-xs uppercase tracking-wide text-[#DB6716] shadow-sm">
              Bold Flavours
            </span>
            <span className="rounded-full bg-white/80 px-4 py-1.5 text-xs uppercase tracking-wide text-[#990E0F] shadow-sm">
              Anytime Snack
            </span>
          </div>
        </div>

        <div className="flex-1">
          <div className="relative mx-auto aspect-[4/3] max-w-md overflow-hidden rounded-3xl bg-[#1B1B1B] shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
            <Image
              src="/about_us.png"
              alt="Bowls of Moonzy chips bursting with flavour"
              fill
              sizes="(min-width: 1024px) 420px, 80vw"
              className="object-contain object-center"
              priority
            />

            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}

