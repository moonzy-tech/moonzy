import { notFound } from "next/navigation";
import Link from "next/link";
import type { Blog } from "@/lib/api";
import Navigation from "../../components/Navigation";
import FooterSection from "../../components/FooterSection";

function getApiBase() {
  return process.env["NEXT_PUBLIC_API_URL"] ?? "http://localhost:4000";
}

async function getBlog(slug: string) {
  const res = await fetch(`${getApiBase()}/blogs/by-slug/${slug}`, {
    cache: "no-store",
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Failed to fetch blog");
  return (await res.json()) as Blog;
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

/* ── Estimate reading time from markdown body ── */
function readingTime(text: string) {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 230));
}

/* ── Split markdown body into paragraphs for proper rendering ── */
function renderBody(markdown: string) {
  // Split into paragraphs, filter empty ones
  const paragraphs = markdown.split(/\n{2,}/).filter((p) => p.trim());

  return paragraphs.map((para, i) => {
    const trimmed = para.trim();

    // Heading detection
    if (trimmed.startsWith("### ")) {
      return (
        <h3
          key={i}
          className="text-[#F5F0E8] text-xl md:text-2xl font-normal mt-12 mb-4"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          {trimmed.replace(/^###\s*/, "")}
        </h3>
      );
    }
    if (trimmed.startsWith("## ")) {
      return (
        <h2
          key={i}
          className="text-[#F5F0E8] text-2xl md:text-3xl font-normal mt-14 mb-5"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          {trimmed.replace(/^##\s*/, "")}
        </h2>
      );
    }

    // Blockquote
    if (trimmed.startsWith("> ")) {
      return (
        <blockquote
          key={i}
          className="relative my-10 pl-8 md:pl-10 py-2 border-l-2 border-[#D4A94C]/60"
        >
          <p
            className="text-[#E8DFC8] text-lg md:text-xl leading-relaxed italic"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            {trimmed.replace(/^>\s*/, "")}
          </p>
        </blockquote>
      );
    }

    // Bullet list
    if (/^[-*]\s/.test(trimmed)) {
      const items = trimmed.split(/\n/).filter((l) => l.trim());
      return (
        <ul key={i} className="my-6 space-y-3 pl-1">
          {items.map((item, j) => (
            <li key={j} className="flex items-start gap-3">
              <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-[#D4A94C] shrink-0" />
              <span
                className="text-[#E7DEC8]/90 text-base md:text-[1.065rem] leading-[1.85]"
                style={{
                  fontFamily: "'Instrument Sans', system-ui, sans-serif",
                }}
              >
                {item.replace(/^[-*]\s*/, "")}
              </span>
            </li>
          ))}
        </ul>
      );
    }

    // Default paragraph
    return (
      <p
        key={i}
        className="text-[#E7DEC8]/90 text-base md:text-[1.065rem] leading-[1.85] mb-6"
        style={{ fontFamily: "'Instrument Sans', system-ui, sans-serif" }}
      >
        {trimmed}
      </p>
    );
  });
}

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const blog = await getBlog(slug);
  if (!blog) notFound();

  const minutes = readingTime(blog.markdownBody ?? "");

  return (
    <main className="bg-[#141826] min-h-screen">
      <Navigation />

      {/* ═══════════════════════════════════════════
          HERO — Full-bleed image with overlaid text
          ═══════════════════════════════════════════ */}
      <section className="relative w-full h-[60vh] min-h-[420px] max-h-[680px] overflow-hidden">
        {/* Background Image */}
        <img
          src={blog.coverImageUrl}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover scale-[1.02]"
        />

        {/* Gradient Overlay — dark at top (blend into navbar bg) + dark at bottom for readability */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, #141826 0%, rgba(20,24,38,0.45) 18%, rgba(20,24,38,0.15) 40%, rgba(20,24,38,0.40) 65%, #141826 100%)",
          }}
        />

        {/* Subtle grain texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Back link — top left */}
        <div className="absolute top-24 md:top-28 left-0 w-full z-10">
          <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-12">
            <Link
              href="/blog"
              className="inline-flex items-center text-[rgba(245,240,232,0.6)] hover:text-[#D4A94C] text-xs font-semibold uppercase tracking-[0.15em] transition-colors duration-300"
              style={{
              fontFamily: "'Instrument Sans', system-ui, sans-serif",
            }}
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Journal
            </Link>
          </div>
        </div>

        {/* Overlaid Title Area — pinned to bottom of hero */}
        <div className="absolute bottom-0 left-0 w-full z-10 pb-10 md:pb-14">
          <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-12">
            {/* Meta row */}
            <div
              className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-4 opacity-0 animate-fadeInUp"
              style={{
                animationDelay: "200ms",
                animationFillMode: "forwards",
              }}
            >
              <span
                className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-[#D4A94C] sm:text-xs sm:tracking-[0.18em]"
                style={{
                  fontFamily: "'Instrument Sans', system-ui, sans-serif",
                }}
              >
                {blog.author}
              </span>
              <span className="h-1 w-1 rounded-full bg-[rgba(200,195,185,0.35)]" />
              <span
                className="text-[0.65rem] uppercase tracking-[0.08em] text-[rgba(200,195,185,0.55)] sm:text-xs sm:tracking-[0.12em]"
                style={{
                  fontFamily: "'Instrument Sans', system-ui, sans-serif",
                }}
              >
                {formatDate(blog.publishDate)}
              </span>
              <span className="h-1 w-1 rounded-full bg-[rgba(200,195,185,0.35)]" />
              <span
                className="text-[0.65rem] uppercase tracking-[0.08em] text-[rgba(200,195,185,0.55)] sm:text-xs sm:tracking-[0.12em]"
                style={{
                  fontFamily: "'Instrument Sans', system-ui, sans-serif",
                }}
              >
                {minutes} min read
              </span>
            </div>

            {/* Title */}
            <h1
              className="text-[#F5F0E8] text-3xl sm:text-4xl md:text-5xl lg:text-[3.4rem] font-normal leading-[1.15] max-w-[900px] opacity-0 animate-fadeInUp"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                animationDelay: "350ms",
                animationFillMode: "forwards",
              }}
            >
              {blog.title}
            </h1>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          ARTICLE BODY
          ═══════════════════════════════════════════ */}
      <article className="relative max-w-[720px] mx-auto px-6 md:px-10 lg:px-0 pt-10 md:pt-14 pb-20 md:pb-28">
        {/* Excerpt / Lede — larger, lighter text */}
        {blog.excerpt && (
          <p
            className="text-[#E8DFC8] text-lg md:text-xl leading-[1.75] mb-10 md:mb-14 opacity-0 animate-fadeInUp"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              animationDelay: "500ms",
              animationFillMode: "forwards",
            }}
          >
            {blog.excerpt}
          </p>
        )}

        {/* Thin accent rule */}
        <div
          className="w-16 h-[2px] bg-[#D4A94C]/50 mb-10 md:mb-14 opacity-0 animate-fadeInUp"
          style={{ animationDelay: "550ms", animationFillMode: "forwards" }}
        />

        {/* Body Content — proper paragraph rendering */}
        <div
          className="opacity-0 animate-fadeInUp"
          style={{ animationDelay: "650ms", animationFillMode: "forwards" }}
        >
          {renderBody(blog.markdownBody ?? "")}
        </div>

        {/* ── End-of-article ornament ── */}
        <div className="flex items-center justify-center gap-3 mt-16 mb-14">
          <span className="h-px w-12 bg-[rgba(200,195,185,0.2)]" />
          <span className="w-2 h-2 rotate-45 border border-[#D4A94C]/40" />
          <span className="h-px w-12 bg-[rgba(200,195,185,0.2)]" />
        </div>

        {/* ── Author Card ── */}
        <div className="mb-14 flex items-center gap-3 rounded-2xl border border-[rgba(200,195,185,0.08)] bg-[#1A1F33]/80 p-5 sm:gap-4 sm:p-6">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#D4A94C] to-[#B8922E] text-lg font-bold text-[#1E2235] sm:h-14 sm:w-14 sm:text-xl">
            {blog.author[0]}
          </div>
          <div className="min-w-0">
            <p
              className="text-[0.8rem] font-semibold text-[#F5F0E8] sm:text-[0.9rem]"
              style={{
                fontFamily: "'Instrument Sans', system-ui, sans-serif",
              }}
            >
              Written by {blog.author}
            </p>
            <p
              className="mt-0.5 text-[0.7rem] text-[rgba(200,195,185,0.5)] sm:text-xs"
              style={{
                fontFamily: "'Instrument Sans', system-ui, sans-serif",
              }}
            >
              Published {formatDate(blog.publishDate)}
            </p>
          </div>
        </div>

        {/* ── Share Row ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <p
            className="text-[rgba(200,195,185,0.5)] text-xs uppercase tracking-[0.18em] font-semibold"
            style={{
              fontFamily: "'Instrument Sans', system-ui, sans-serif",
            }}
          >
            Share this story
          </p>

          <div className="flex items-center gap-3">
            {/* Twitter / X */}
            <button className="group w-10 h-10 rounded-full bg-[#1E2235] border border-[rgba(200,195,185,0.1)] flex items-center justify-center text-[rgba(200,195,185,0.5)] hover:bg-[#D4A94C] hover:text-[#1E2235] hover:border-transparent transition-all duration-300">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
              </svg>
            </button>
            {/* Facebook */}
            <button className="group w-10 h-10 rounded-full bg-[#1E2235] border border-[rgba(200,195,185,0.1)] flex items-center justify-center text-[rgba(200,195,185,0.5)] hover:bg-[#D4A94C] hover:text-[#1E2235] hover:border-transparent transition-all duration-300">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
              </svg>
            </button>
            {/* LinkedIn */}
            <button className="group w-10 h-10 rounded-full bg-[#1E2235] border border-[rgba(200,195,185,0.1)] flex items-center justify-center text-[rgba(200,195,185,0.5)] hover:bg-[#D4A94C] hover:text-[#1E2235] hover:border-transparent transition-all duration-300">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
              </svg>
            </button>
            {/* Copy link */}
            <button className="group w-10 h-10 rounded-full bg-[#1E2235] border border-[rgba(200,195,185,0.1)] flex items-center justify-center text-[rgba(200,195,185,0.5)] hover:bg-[#D4A94C] hover:text-[#1E2235] hover:border-transparent transition-all duration-300">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* ── Back to Journal CTA ── */}
        <div className="mt-14 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-transparent text-[#D4A94C] border border-[#D4A94C]/40 rounded-full text-xs font-semibold uppercase tracking-[0.15em] transition-all duration-300 hover:bg-[#D4A94C] hover:text-[#1E2235] hover:border-transparent"
            style={{
              fontFamily: "'Instrument Sans', system-ui, sans-serif",
            }}
          >
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Journal
          </Link>
        </div>
      </article>

      <FooterSection />
    </main>
  );
}