"use client";

export default function JournalSection() {
  const posts = [
    {
      title: "Midnight Coffee With Myself",
      emoji: "☕",
      author: "Amber Gibson",
      date: "Dec 31, 2025",
      image: "/blog/coffee.jpg",
    },
    {
      title: "Midnight Sweet Cravings",
      emoji: "🍦",
      author: "Amber Gibson",
      date: "Dec 31, 2025",
      image: "/blog/sweet.jpg",
    },
    {
      title: "Night Owl",
      emoji: "🦉",
      author: "Amber Gibson",
      date: "Dec 31, 2025",
      image: "/blog/owl.jpg",
    },
  ];

  return (
    <section className="bg-[#141826] py-12 md:py-16 lg:py-18 xl:py-20">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-12">
        {/* Header Row */}
        <div
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 md:mb-10 lg:mb-9"
        >
          <h2
            className="font-serif text-[#F5F0E8] text-2xl sm:text-3xl md:text-4xl lg:text-[2.8rem] font-bold tracking-wide"
          >
            From the Moonzy Journal
          </h2>

          {/* See More - Gradient border button */}
          <div
            className="rounded-full p-[1.5px]"
            style={{
              background:
                "linear-gradient(90deg, #4A6CF7 0%, #9B59B6 40%, #E74C8A 70%, #F39C12 100%)",
            }}
          >
            <button
              className="bg-[#15172a] text-[#F5F0E8] px-6 md:px-8 py-2 md:py-2.5 rounded-full text-sm md:text-[0.95rem] font-serif font-semibold cursor-pointer border-none transition-all duration-300 hover:scale-110 hover:shadow-xl"
              style={{
                letterSpacing: "0.02em",
              }}
            >
              See More
            </button>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
        >
          {posts.map((post, index) => (
            <div
              key={index}
              className="rounded-2xl md:rounded-3xl lg:rounded-[20px] overflow-hidden cursor-pointer relative bg-[#1E2235] transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:-translate-y-2 opacity-0 animate-fadeInUp"
              style={{
                animationDelay: `${index * 200}ms`,
                animationFillMode: 'forwards'
              }}
            >
              {/* Image Area */}
              <div
                style={{
                  aspectRatio: "1 / 1",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <img
                  src={post.image}
                  alt={post.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    if (e.currentTarget.nextElementSibling) {
                      (
                        e.currentTarget.nextElementSibling as HTMLElement
                      ).style.display = "flex";
                    }
                  }}
                />
                {/* Fallback */}
                <div
                  style={{
                    display: "none",
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    inset: 0,
                    background:
                      index === 0
                        ? "linear-gradient(145deg, #3d2b1f 0%, #1a1208 100%)"
                        : index === 1
                        ? "linear-gradient(145deg, #2c3e50 0%, #1a252f 100%)"
                        : "linear-gradient(145deg, #1a4a7a 0%, #0a2a4a 100%)",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  <span style={{ fontSize: "2.5rem" }}>{post.emoji}</span>
                  <span
                    style={{
                      color: "rgba(255,255,255,0.3)",
                      fontSize: "0.7rem",
                    }}
                  >
                    Blog Image
                  </span>
                </div>
              </div>

              {/* Dashed Separator with WHITE Perforation Circles */}
              <div
                style={{
                  position: "relative",
                  height: "0px",
                }}
              >
                {/* Dashed line */}
                <div
                  style={{
                    position: "absolute",
                    top: "0",
                    left: "20px",
                    right: "20px",
                    borderTop: "2.5px dashed rgba(245, 240, 232, 0.35)",
                  }}
                />
                {/* Left white circle notch - 10x24 from Figma */}
                <div
                  style={{
                    position: "absolute",
                    top: "-12px",
                    left: "-5px",
                    width: "10px",
                    height: "24px",
                    borderRadius: "0 12px 12px 0",
                    backgroundColor: "#F5F0E8",
                  }}
                />
                {/* Right white circle notch - 10x24 from Figma */}
                <div
                  style={{
                    position: "absolute",
                    top: "-12px",
                    right: "-5px",
                    width: "10px",
                    height: "24px",
                    borderRadius: "12px 0 0 12px",
                    backgroundColor: "#F5F0E8",
                  }}
                />
              </div>

              {/* Text Info Area */}
              <div
                className="p-6 md:p-7 pb-7 md:pb-8 bg-[#1E2235]"
              >
                {/* Title */}
                <h3
                  className="font-serif text-[#F5F0E8] text-lg md:text-xl lg:text-2xl font-medium mb-3 md:mb-4 leading-tight italic"
                >
                  {post.title} {post.emoji}
                </h3>

                {/* Author & Date Row */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "24px",
                  }}
                >
                  {/* Author */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    {/* Avatar - rounded square */}
                    <div
                      style={{
                        width: "28px",
                        height: "28px",
                        borderRadius: "7px",
                        background:
                          "linear-gradient(135deg, #8899aa, #667788)",
                        overflow: "hidden",
                        flexShrink: 0,
                      }}
                    >
                      <svg
                        width="28"
                        height="28"
                        viewBox="0 0 28 28"
                        fill="rgba(255,255,255,0.6)"
                      >
                        <circle cx="14" cy="10" r="5" />
                        <ellipse cx="14" cy="26" rx="9" ry="7" />
                      </svg>
                    </div>
                    <span
                      style={{
                        color: "rgba(200, 195, 185, 0.65)",
                        fontSize: "0.9rem",
                        fontFamily: "system-ui, -apple-system, sans-serif",
                        fontWeight: 500,
                      }}
                    >
                      {post.author}
                    </span>
                  </div>

                  {/* Date */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    {/* Calendar icon */}
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="rgba(200, 195, 185, 0.55)"
                      strokeWidth="1.8"
                    >
                      <rect x="3" y="4" width="18" height="18" rx="2" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <path
                        d="M8 14h2v2H8zM14 14h2v2h-2z"
                        fill="rgba(200,195,185,0.55)"
                        stroke="none"
                      />
                    </svg>
                    <span
                      style={{
                        color: "rgba(200, 195, 185, 0.65)",
                        fontSize: "0.9rem",
                        fontFamily: "system-ui, -apple-system, sans-serif",
                        fontWeight: 500,
                      }}
                    >
                      {post.date}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}