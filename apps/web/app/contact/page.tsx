"use client";

import { useState } from "react";
import Navigation from "../components/Navigation";
import FooterSection from "../components/FooterSection";

const PLAYFAIR = "'Playfair Display', Georgia, serif";
const INSTRUMENT_SANS = "'Instrument Sans', system-ui, sans-serif";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"}/contact`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        },
      );

      if (!response.ok) throw new Error("Failed to send message");

      setStatus("success");
      setFormData({ firstName: "", lastName: "", email: "", phone: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const fieldClass =
    "w-full rounded-xl border border-[rgba(200,195,185,0.12)] bg-[#141826]/90 px-4 py-3 text-[#F5F0E8] placeholder:text-[rgba(200,195,185,0.35)] transition-colors focus:border-[#D4A94C]/60 focus:outline-none focus:ring-2 focus:ring-[#D4A94C]/25";
  const fieldClassNumeric = `${fieldClass} tabular-nums tracking-wide`;

  return (
    <main className="relative min-h-screen bg-[#141826] text-[#F5F0E8]">
      <Navigation />

      <div style={{ fontFamily: PLAYFAIR }}>
      {/* Hero — aligned with /blog and /qr */}
      <section className="relative overflow-hidden pt-24 pb-12 md:pb-16">
        <div
          className="pointer-events-none absolute top-0 left-1/2 h-[500px] w-[800px] -translate-x-1/2 opacity-[0.07]"
          style={{
            background:
              "radial-gradient(ellipse at center, #D4A94C 0%, transparent 70%)",
          }}
        />

        <div className="relative mx-auto max-w-[1200px] px-6 text-center md:px-10 lg:px-12">
          <p
            className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-[#D4A94C] opacity-0 animate-fadeInUp"
            style={{
              animationDelay: "100ms",
              animationFillMode: "forwards",
            }}
          >
            Contact
          </p>

          <h1
            className="mb-5 text-5xl font-normal text-[#F5F0E8] opacity-0 animate-fadeInUp md:mb-6 md:text-6xl lg:text-7xl"
            style={{
              animationDelay: "200ms",
              animationFillMode: "forwards",
            }}
          >
            Get in touch
          </h1>

          <p
            className="mx-auto max-w-[620px] text-base leading-relaxed text-[rgba(200,195,185,0.6)] opacity-0 animate-fadeInUp md:text-lg"
            style={{
              animationDelay: "300ms",
              animationFillMode: "forwards",
            }}
          >
            Questions about ingredients, orders, or choosing the right snacks?
            We&apos;d love to hear from you.
          </p>

          <div
            className="mt-8 flex items-center justify-center gap-3 opacity-0 animate-fadeInUp"
            style={{ animationDelay: "400ms", animationFillMode: "forwards" }}
          >
            <span className="h-px w-16 bg-[rgba(200,195,185,0.15)]" />
            <span className="h-1.5 w-1.5 rotate-45 border border-[#D4A94C]/40" />
            <span className="h-px w-16 bg-[rgba(200,195,185,0.15)]" />
          </div>
        </div>
      </section>

      {/* Two columns — QR-style dark glass cards */}
      <section className="relative mx-auto max-w-[1200px] px-6 pb-20 md:px-10 md:pb-28 lg:px-12">
        <div className="grid grid-cols-1 gap-0 overflow-hidden rounded-[20px] border border-[rgba(200,195,185,0.08)] bg-[#1A1F33]/70 shadow-[0_8px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl lg:grid-cols-2">
          {/* Form */}
          <div
            className="relative overflow-hidden border-b border-[rgba(200,195,185,0.08)] p-6 opacity-0 animate-fadeInUp md:p-8 lg:border-r lg:border-b-0 lg:p-10"
            style={{ animationDelay: "450ms", animationFillMode: "forwards" }}
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-90"
              style={{
                background:
                  "radial-gradient(circle at top right, rgba(212,169,76,0.08), transparent 55%)",
              }}
            />

            <div className="relative">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[rgba(212,169,76,0.25)] bg-[#141826]/60 px-3.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[#D4A94C] backdrop-blur-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#D4A94C] shadow-[0_0_8px_rgba(212,169,76,0.5)]" />
                  Send a message
                </div>

                <h2
                  className="mb-2 text-2xl font-normal text-[#F5F0E8] md:text-3xl"
                >
                  We&apos;ll get back to you
                </h2>
                <p
                  className="mb-8 text-sm leading-relaxed text-[rgba(200,195,185,0.65)] md:text-base"
                >
                  Fill out the form below and our team will reply as soon as
                  possible.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="mb-2 block text-sm text-[#F5F0E8]"
                      >
                        First name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        placeholder="e.g. Alex"
                        className={fieldClass}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="lastName"
                        className="mb-2 block text-sm text-[#F5F0E8]"
                      >
                        Last name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        placeholder="e.g. Johnson"
                        className={fieldClass}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="email"
                        className="mb-2 block text-sm text-[#F5F0E8]"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="your@example.com"
                        className={fieldClass}
                        style={{ fontFamily: INSTRUMENT_SANS }}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="mb-2 block text-sm text-[#F5F0E8]"
                      >
                        Phone <span className="text-[rgba(200,195,185,0.45)]">(optional)</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+971 …"
                        className={fieldClassNumeric}
                        style={{ fontFamily: INSTRUMENT_SANS }}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="mb-2 block text-sm text-[#F5F0E8]"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Tell us how we can help…"
                      className={`${fieldClass} resize-none`}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full rounded-2xl bg-[#D4A94C] px-6 py-3.5 text-sm font-semibold tracking-wide text-[#141826] shadow-[0_18px_50px_rgba(0,0,0,0.25)] transition-all duration-150 hover:-translate-y-px hover:bg-[#e4bc69] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A94C]/50 disabled:cursor-not-allowed disabled:opacity-50 md:text-base"
                  >
                    {status === "loading"
                      ? "Sending…"
                      : status === "success"
                        ? "Message sent!"
                        : status === "error"
                          ? "Couldn't send — try again"
                          : "Submit"}
                  </button>
                </form>
              </div>
          </div>

          {/* Contact details */}
          <div
            className="relative flex h-full flex-col overflow-hidden p-6 opacity-0 animate-fadeInUp md:p-8 lg:p-10"
            style={{ animationDelay: "550ms", animationFillMode: "forwards" }}
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-90"
              style={{
                background:
                  "radial-gradient(circle at bottom left, rgba(212,169,76,0.06), transparent 50%)",
              }}
            />

            <div className="relative flex h-full flex-col">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[rgba(200,195,185,0.12)] bg-[#141826]/50 px-3.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[rgba(245,240,232,0.85)] backdrop-blur-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#D4A94C]" />
                  Reach us directly
                </div>

                <h2
                  className="mb-2 text-2xl font-normal text-[#F5F0E8] md:text-3xl"
                >
                  We&apos;re here to help
                </h2>
                <p
                  className="mb-8 text-sm leading-relaxed text-[rgba(200,195,185,0.62)] md:text-base"
                >
                  Prefer calling or messaging? Use any of the options below.
                </p>

                <div className="space-y-3">
                  {[
                    {
                      label: "Hotline",
                      value: "+971 56 498 3456",
                      valueSans: true,
                      valueTabular: true,
                      icon: (
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      ),
                    },
                    {
                      label: "SMS / WhatsApp",
                      value: "+971 56 498 3456",
                      valueSans: true,
                      valueTabular: true,
                      icon: (
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                      ),
                    },
                    {
                      label: "Email",
                      value: "support@moonzy.com",
                      valueSans: true,
                      valueTabular: false,
                      icon: (
                        <>
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                          <polyline points="22,6 12,13 2,6" />
                        </>
                      ),
                    },
                    {
                      label: "Address",
                      value: "123 Maple Street, Springfield, IL 62704",
                      valueSans: true,
                      valueTabular: true,
                      icon: (
                        <>
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                          <circle cx="12" cy="10" r="3" />
                        </>
                      ),
                    },
                  ].map((row) => (
                    <div
                      key={row.label}
                      className="flex gap-4 rounded-xl border border-[rgba(200,195,185,0.1)] bg-[#141826]/45 p-4 transition-colors hover:border-[rgba(212,169,76,0.22)]"
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[rgba(212,169,76,0.2)] bg-[#141826]/80">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#D4A94C"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden
                        >
                          {row.icon}
                        </svg>
                      </div>
                      <div className="min-w-0">
                        <p
                          className="mb-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-[#D4A94C]/90"
                        >
                          {row.label}
                        </p>
                        <p
                          className={`text-sm font-medium text-[#F5F0E8] md:text-base ${"valueTabular" in row && row.valueTabular ? "tabular-nums tracking-wide" : ""}`}
                          style={
                            "valueSans" in row && row.valueSans
                              ? { fontFamily: INSTRUMENT_SANS }
                              : undefined
                          }
                        >
                          {row.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-auto pt-8">
                  <p
                    className="mb-3 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[rgba(200,195,185,0.45)]"
                  >
                    Follow us
                  </p>
                  <div className="flex flex-wrap items-center gap-3">
                    {[
                      {
                        label: "Facebook",
                        path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
                      },
                      {
                        label: "Twitter",
                        path: "M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z",
                      },
                      {
                        label: "TikTok",
                        path: "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z",
                      },
                      {
                        label: "Instagram",
                        path: "M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z",
                      },
                    ].map((s) => (
                      <a
                        key={s.label}
                        href="#"
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(200,195,185,0.12)] bg-[#141826]/60 text-[#D4A94C] transition-all hover:border-[#D4A94C]/40 hover:bg-[#D4A94C]/10"
                        aria-label={s.label}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                          <path d={s.path} />
                        </svg>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
          </div>
        </div>
      </section>

      </div>

      <FooterSection />
    </main>
  );
}
