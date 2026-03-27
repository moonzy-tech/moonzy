import Link from "next/link";
import type { Blog } from "@/lib/api";
import Navigation from "../components/Navigation";
import FooterSection from "../components/FooterSection";

function getApiBase() {
  return process.env["NEXT_PUBLIC_API_URL"] ?? "http://localhost:4000";
}

async function getBlogs() {
  const res = await fetch(`${getApiBase()}/blogs`, { cache: "no-store" });
  if (!res.ok) return [] as Blog[];
  return (await res.json()) as Blog[];
}

function formatDate(value: string) {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

/* ── Reading time estimate ── */
function readingTime(text?: string) {
  if (!text) return 1;
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 230));
}

export default async function BlogListPage() {
  const blogs = await getBlogs();
  const featuredBlog = blogs[0];
  const otherBlogs = blogs.slice(1);

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
            The Journal
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
            Moonzy Journal
          </h1>

          {/* Subtitle */}
          <p
            className="text-[rgba(200,195,185,0.6)] text-base md:text-lg max-w-[520px] mx-auto leading-relaxed opacity-0 animate-fadeInUp"
            style={{
              fontFamily: "'Instrument Sans', system-ui, sans-serif",
              animationDelay: "300ms",
              animationFillMode: "forwards",
            }}
          >
            Stories, cravings, and night-time thoughts from the world of
            midnight snacking.
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
          FEATURED POST — Immersive hero card
          ═══════════════════════════════════════════ */}
      {featuredBlog && (
        <section className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-12 mb-16 md:mb-24">
          <Link
            href={`/blog/${featuredBlog.slug}`}
            className="group block relative rounded-[20px] md:rounded-[28px] overflow-hidden opacity-0 animate-fadeInUp"
            style={{ animationDelay: "450ms", animationFillMode: "forwards" }}
          >
            {/* Full-bleed cover image */}
            <div className="relative aspect-[16/9] md:aspect-[21/9]">
              <img
                src={featuredBlog.coverImageUrl}
                alt={featuredBlog.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />

              {/* Multi-layer gradient overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to right, rgba(20,24,38,0.92) 0%, rgba(20,24,38,0.65) 45%, rgba(20,24,38,0.15) 100%)",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141826]/60 via-transparent to-transparent" />

              {/* Content overlay */}
              <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 lg:p-14">
                {/* Featured badge */}
                <div className="mb-auto">
                  <span
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#D4A94C]/15 border border-[#D4A94C]/30 text-[#D4A94C] text-[0.65rem] font-semibold uppercase tracking-[0.18em] backdrop-blur-sm"
                    style={{
                      fontFamily: "'Instrument Sans', system-ui, sans-serif",
                    }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4A94C]" />
                    Featured
                  </span>
                </div>

                {/* Meta row */}
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-3">
                  <span
                    className="text-[#D4A94C] text-xs font-semibold uppercase tracking-[0.15em]"
                    style={{
                      fontFamily: "'Instrument Sans', system-ui, sans-serif",
                    }}
                  >
                    {featuredBlog.author}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-[rgba(200,195,185,0.3)]" />
                  <span
                    className="text-[rgba(245,240,232,0.45)] text-xs uppercase tracking-[0.1em]"
                    style={{
                      fontFamily: "'Instrument Sans', system-ui, sans-serif",
                    }}
                  >
                    {formatDate(featuredBlog.publishDate)}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-[rgba(200,195,185,0.3)]" />
                  <span
                    className="text-[rgba(245,240,232,0.45)] text-xs uppercase tracking-[0.1em]"
                    style={{
                      fontFamily: "'Instrument Sans', system-ui, sans-serif",
                    }}
                  >
                    {readingTime(featuredBlog.markdownBody)} min read
                  </span>
                </div>

                {/* Title */}
                <h2
                  className="text-[#F5F0E8] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal leading-[1.15] max-w-[700px] mb-3 md:mb-4 group-hover:text-[#D4A94C] transition-colors duration-500"
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                  }}
                >
                  {featuredBlog.title}
                </h2>

                {/* Excerpt */}
                <p
                  className="text-[rgba(245,240,232,0.55)] text-sm md:text-base leading-relaxed max-w-[540px] line-clamp-2 mb-5"
                  style={{
                    fontFamily: "'Instrument Sans', system-ui, sans-serif",
                  }}
                >
                  {featuredBlog.excerpt}
                </p>

                {/* Read CTA */}
                <div
                  className="inline-flex items-center gap-2 text-[#D4A94C] text-xs font-semibold uppercase tracking-[0.15em] group-hover:gap-3 transition-all duration-300"
                  style={{
                    fontFamily: "'Instrument Sans', system-ui, sans-serif",
                  }}
                >
                  Read Story
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* ═══════════════════════════════════════════
          SECTION LABEL
          ═══════════════════════════════════════════ */}
      {otherBlogs.length > 0 && (
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-12 mb-8 md:mb-10">
          <div className="flex items-center gap-4">
            <span
              className="text-[rgba(200,195,185,0.4)] text-xs font-semibold uppercase tracking-[0.2em]"
              style={{
                fontFamily: "'Instrument Sans', system-ui, sans-serif",
              }}
            >
              Latest Stories
            </span>
            <span className="flex-1 h-px bg-[rgba(200,195,185,0.08)]" />
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════
          BLOG GRID — Magazine-style cards
          ═══════════════════════════════════════════ */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-12 pb-20 md:pb-28">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
          {otherBlogs.map((blog, index) => (
            <Link
              href={`/blog/${blog.slug}`}
              key={blog._id}
              className="group opacity-0 animate-fadeInUp"
              style={{
                animationDelay: `${500 + index * 80}ms`,
                animationFillMode: "forwards",
              }}
            >
              <article className="relative h-full rounded-[16px] md:rounded-[20px] overflow-hidden bg-[#1A1F33]/60 border border-[rgba(200,195,185,0.07)] transition-all duration-500 hover:border-[rgba(212,169,76,0.25)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.3)] hover:-translate-y-1">
                {/* Image */}
                <div className="relative aspect-[3/2] overflow-hidden">
                  <img
                    src={blog.coverImageUrl}
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  />
                  {/* Soft bottom fade into card body */}
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#1A1F33]/90 to-transparent" />
                </div>

                {/* Card body */}
                <div className="p-5 md:p-6">
                  {/* Meta */}
                  <div className="flex items-center gap-x-2.5 mb-3">
                    <span
                      className="text-[#D4A94C]/70 text-[0.65rem] font-semibold uppercase tracking-[0.12em]"
                      style={{
                        fontFamily:
                          "'Instrument Sans', system-ui, sans-serif",
                      }}
                    >
                      {blog.author}
                    </span>
                    <span className="w-0.5 h-0.5 rounded-full bg-[rgba(200,195,185,0.25)]" />
                    <span
                      className="text-[rgba(200,195,185,0.4)] text-[0.65rem] uppercase tracking-[0.1em]"
                      style={{
                        fontFamily:
                          "'Instrument Sans', system-ui, sans-serif",
                      }}
                    >
                      {formatDate(blog.publishDate)}
                    </span>
                  </div>

                  {/* Title */}
                  <h2
                    className="text-[#F5F0E8] text-lg md:text-xl font-normal leading-snug mb-2.5 group-hover:text-[#D4A94C] transition-colors duration-400 line-clamp-2"
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                    }}
                  >
                    {blog.title}
                  </h2>

                  {/* Excerpt */}
                  <p
                    className="text-[rgba(200,195,185,0.55)] text-[0.82rem] leading-[1.7] line-clamp-2 mb-4"
                    style={{
                      fontFamily: "'Instrument Sans', system-ui, sans-serif",
                    }}
                  >
                    {blog.excerpt}
                  </p>

                  {/* Read link */}
                  <span
                    className="inline-flex items-center gap-1.5 text-[#D4A94C]/60 text-[0.7rem] font-semibold uppercase tracking-[0.12em] group-hover:text-[#D4A94C] group-hover:gap-2.5 transition-all duration-300"
                    style={{
                      fontFamily: "'Instrument Sans', system-ui, sans-serif",
                    }}
                  >
                    Read
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>

      <FooterSection />
    </main>
  );
}