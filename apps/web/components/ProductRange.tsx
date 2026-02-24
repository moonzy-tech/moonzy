import Image from "next/image";
import Link from "next/link";

const products = [
  {
    id: "peri",
    name: "Peri Peri Chips",
    tag: "Fiery & Bold",
    description:
      "Turn up the heat with a punchy chilli kick and smoky notes in every crisp.",
    bgClass: "bg-peri",
    image: "/Peri.png",
    accent: "#FCD9BF",
  },
  {
    id: "pudina",
    name: "Pudina Mint Chips",
    tag: "Fresh & Zesty",
    description:
      "Cool mint, herby vibes and a light crunch that keeps things refreshingly snappy.",
    bgClass: "bg-pudina",
    image: "/Mint.png",
    accent: "#E8F8D5",
  },
  {
    id: "caramel",
    name: "Caramel Chips",
    tag: "Sweet & Comforting",
    description:
      "Warm caramel, buttery notes and a mellow sweetness made for slow-snack moments.",
    bgClass: "bg-caramel",
    image: "/Caramel.png",
    accent: "#FFE4C2",
  },
  {
    id: "hing",
    name: "Hing Chutney Chips",
    tag: "Iconic & Desi",
    description:
      "Nostalgic street-style masala with big hing character and a seriously loud crunch.",
    bgClass: "bg-hing",
    image: "/Hing.png",
    accent: "#D5F6E3",
  },
] as const;

export default function ProductRange() {
  return (
    <section
      id="products"
      className="relative py-16 md:py-24"
      aria-labelledby="product-range-heading"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-1/2 bg-linear-to-b from-[#10251A]/70 via-[#0B1811]/40 to-transparent" />

      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <div className="mb-10 flex flex-col items-center text-center md:mb-14">
          <p className="text-xs uppercase tracking-[0.3em] text-[#4d2305] md:text-2xl">
            The Moonzy Line-Up
          </p>
          <h2
            id="product-range-heading"
            className="mt-3 text-2xl font-bold leading-tight text-[#13241A] sm:text-3xl md:text-4xl"
          >
            A flavour for every mood.
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#4C4A3F] sm:text-base">
            From fiery to fresh, sweet to desi-nostalgic – explore the full
            Moonzy munch range in one bold spread.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product, index) => (
            <Link
              key={product.id}
              href={`/product?flavor=${product.id}`}
              aria-label={`View ${product.name}`}
              className="group"
            >
              <article
                className="relative overflow-hidden rounded-3xl border border-white/40 bg-[#0E1913]/95 p-4 pt-5 shadow-[0_18px_45px_rgba(0,0,0,0.55)] transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_24px_60px_rgba(0,0,0,0.7)] animate-in fade-in-10 slide-in-from-bottom-8"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div
                  className={`pointer-events-none absolute inset-0 opacity-50 mix-blend-screen ${product.bgClass}`}
                />

                <div className="relative z-10 flex flex-col">
                  <span
                    className="mb-3 inline-flex w-fit items-center rounded-full px-3 py-1 text-[0.65rem] font-sans font-bold uppercase tracking-[0.2em]"
                    style={{
                      backgroundColor: `${product.accent}E6`,
                      color: "#20562B",
                    }}
                  >
                    {product.tag}
                  </span>

                  <h3 className="text-base font-bold font-sans leading-snug text-white sm:text-lg">
                    {product.name}
                  </h3>

                  <p className="mt-2 text-xs max-w-32 leading-relaxed text-white/85 sm:text-sm">
                    {product.description}
                  </p>

                  <div className="mt-5 flex flex-1 justify-center">
                    <div className="relative h-32 w-28 sm:h-36 sm:w-32 lg:h-60 lg:w-48">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="(min-width: 1024px) 8rem, (min-width: 640px) 7rem, 6rem"
                        className="object-contain drop-shadow-[0_18px_40px_rgba(0,0,0,0.7)] transition-transform duration-500 group-hover:-translate-y-1.5 group-hover:rotate-[-7deg] group-hover:scale-[1.04]"
                      />
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

