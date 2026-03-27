"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";

type BlogPost = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImageUrl: string;
  author: string;
  publishDate: string;
};

function formatDate(value: string) {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function JournalSection() {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    api<BlogPost[]>("/blogs")
      .then((blogs) => setPosts(blogs))
      .catch(() => setPosts([]));
  }, []);

  return (
    <section
      id="blogs"
      className="bg-[#141826] py-12 md:py-16 lg:py-18 xl:py-20"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-12">
        {/* Header Row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 md:mb-10 lg:mb-9">
          <h2 className="font-serif text-[#F5F0E8] text-2xl sm:text-3xl md:text-4xl lg:text-[2.8rem] font-bold tracking-wide">
            From the Moonzy Journal
          </h2>

          {/* See More - Gradient border button */}
          <Link
            href="/blog"
            className="rounded-full p-[1.5px] overflow-hidden transition-shadow duration-300 hover:shadow-[0_0_24px_rgba(155,89,182,0.35)]"
            style={{
              background:
                "linear-gradient(90deg, #4A6CF7 0%, #9B59B6 40%, #E74C8A 70%, #F39C12 100%)",
            }}
          >
            <span
              className="block bg-[#15172a] text-[#F5F0E8] px-6 md:px-8 py-2 md:py-2.5 rounded-full text-sm md:text-[0.95rem] font-serif font-semibold transition-all duration-300 hover:bg-[#171a30]"
              style={{
                letterSpacing: "0.02em",
              }}
            >
              See More
            </span>
          </Link>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {posts.slice(0, 3).map((post, index) => (
            <Link
              href={`/blog/${post.slug}`}
              key={post._id}
              className="rounded-2xl md:rounded-3xl lg:rounded-[20px] overflow-hidden cursor-pointer relative bg-[#1E2235] transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:-translate-y-1 opacity-0 animate-fadeInUp"
              style={{
                animationDelay: `${index * 200}ms`,
                animationFillMode: "forwards",
              }}
            >
              {/* Image Area — reduced from 1:1 to 4:3 */}
              <div className="relative overflow-hidden" style={{ aspectRatio: "4 / 3" }}>
                <img
                  src={post.coverImageUrl}
                  alt={post.title}
                  className="w-full h-full object-cover block"
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
                  className="hidden absolute inset-0 items-center justify-center flex-col gap-2"
                  style={{
                    background:
                      index === 0
                        ? "linear-gradient(145deg, #3d2b1f 0%, #1a1208 100%)"
                        : index === 1
                        ? "linear-gradient(145deg, #2c3e50 0%, #1a252f 100%)"
                        : "linear-gradient(145deg, #1a4a7a 0%, #0a2a4a 100%)",
                  }}
                >
                  <span className="text-[2.5rem]">📝</span>
                  <span className="text-white/30 text-[0.7rem]">
                    Blog Image
                  </span>
                </div>
              </div>

              {/* Dashed Separator with Perforation Notches */}
              <div className="relative h-0">
                {/* Dashed line — sits exactly on the image/card-body seam */}
                <svg
                  className="absolute left-0 right-0 w-full"
                  height="2"
                  style={{ top: "0px" }}
                >
                  <line
                    x1="0"
                    y1="1"
                    x2="100%"
                    y2="1"
                    stroke="white"
                    strokeWidth="2"
                    strokeDasharray="12 8"
                    strokeLinecap="square"
                  />
                </svg>
                {/* Left notch — white perforation */}
                <div
                  className="absolute"
                  style={{
                    top: "-10px",
                    left: "-5px",
                    width: "10px",
                    height: "20px",
                    borderRadius: "0 10px 10px 0",
                    backgroundColor: "#F5F0E8",
                  }}
                />
                {/* Right notch — white perforation */}
                <div
                  className="absolute"
                  style={{
                    top: "-10px",
                    right: "-5px",
                    width: "10px",
                    height: "20px",
                    borderRadius: "10px 0 0 10px",
                    backgroundColor: "#F5F0E8",
                  }}
                />
              </div>

              {/* Text Info Area */}
              <div className="p-5 md:p-6 pb-6 md:pb-7 bg-[#1E2235]">
                {/* Title */}
                <h3 className="font-serif text-[#F5F0E8] text-base md:text-lg lg:text-xl font-medium mb-2.5 md:mb-3 leading-tight italic">
                  {post.title}
                </h3>

                {/* Author & Date Row */}
                <div className="flex items-center gap-5">
                  {/* Author */}
                  <div className="flex items-center gap-2.5">
                    <div
                      className="shrink-0 overflow-hidden"
                      style={{
                        width: "24px",
                        height: "24px",
                        borderRadius: "6px",
                        background:
                          "linear-gradient(135deg, #8899aa, #667788)",
                      }}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 28 28"
                        fill="rgba(255,255,255,0.6)"
                      >
                        <circle cx="14" cy="10" r="5" />
                        <ellipse cx="14" cy="26" rx="9" ry="7" />
                      </svg>
                    </div>
                    <span
                      className="text-[rgba(200,195,185,0.65)] text-[0.8rem] font-medium"
                      style={{
                        fontFamily: "system-ui, -apple-system, sans-serif",
                      }}
                    >
                      {post.author}
                    </span>
                  </div>

                  {/* Date */}
                  <div className="flex items-center gap-2">
                    <svg
                      width="14"
                      height="14"
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
                      className="text-[rgba(200,195,185,0.65)] text-[0.8rem] font-medium"
                      style={{
                        fontFamily: "system-ui, -apple-system, sans-serif",
                      }}
                    >
                      {formatDate(post.publishDate)}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}