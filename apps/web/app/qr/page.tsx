"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useMemo, useState } from "react";
import Navigation from "../components/Navigation";
import FooterSection from "../components/FooterSection";

const GENRES = [
  "All",
  "Action",
  "Comedy",
  "Romance",
  "Thriller",
  "Sci-Fi",
  "Drama",
  "Horror",
  "Anime",
  "Family",
] as const;

type Genre = (typeof GENRES)[number];

type TmdbMovie = {
  id: number;
  title?: string;
  name?: string;
  backdrop_path?: string | null;
  overview?: string;
  vote_average?: number;
  release_date?: string;
  genre_ids?: number[];
};

type Recommendation = {
  id: number;
  title: string;
  year?: number;
  tagline: string;
  ottPlatform: string;
  ottUrl: string;
  backdropUrl: string;
  rating: number;
};

const GENRE_TO_TMDB_ID: Record<Genre, number | null> = {
  All: null,
  Action: 28,
  Comedy: 35,
  Romance: 10749,
  Thriller: 53,
  "Sci-Fi": 878,
  Drama: 18,
  Horror: 27,
  Anime: 16,
  Family: 10751,
};

function getHourlyIndex(seed: number, listLength: number, now: Date) {
  if (listLength === 0) return 0;
  const hour = now.getHours();
  const dayOfYear = Math.floor(
    (Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) -
      Date.UTC(now.getFullYear(), 0, 0)) /
      (1000 * 60 * 60 * 24),
  );

  const composite = hour + dayOfYear * 24 + seed * 97;
  const safe = Math.abs(composite);
  return safe % listLength;
}

export default function QRPage() {
  const [selectedGenres, setSelectedGenres] = useState<Genre[]>(["All"]);
  const [now, setNow] = useState<Date | null>(null);
  const [recommendation, setRecommendation] = useState<Recommendation | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setNow(new Date());
    const interval = setInterval(() => {
      setNow(new Date());
    }, 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!now) return;

    const controller = new AbortController();

    const loadRecommendation = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const activeGenres =
          selectedGenres.includes("All") && selectedGenres.length === 1
            ? ([] as Genre[])
            : selectedGenres.filter((g) => g !== "All");

        const genresKey =
          activeGenres.length === 0
            ? "All"
            : activeGenres.slice().sort().join(",");

        const seed =
          activeGenres.length === 0
            ? 1
            : activeGenres.join("-").length + activeGenres.length * 17;

        const dayOfYear = Math.floor(
          (Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) -
            Date.UTC(now.getFullYear(), 0, 0)) /
            (1000 * 60 * 60 * 24),
        );
        const hour = now.getHours();

        const storageKey = `qrRecommendation:${dayOfYear}:${hour}:${seed}:${genresKey}`;

        if (typeof window !== "undefined") {
          const cached = window.localStorage.getItem(storageKey);
          if (cached) {
            try {
              const parsed = JSON.parse(cached) as Recommendation;
              setRecommendation(parsed);
              setIsLoading(false);
              return;
            } catch {
              // ignore parse errors and fall through to fetch
            }
          }
        }

        const genreIds = activeGenres
          .map((g) => GENRE_TO_TMDB_ID[g])
          .filter((id): id is number => typeof id === "number");

        const params = new URLSearchParams();
        if (genreIds.length > 0) {
          params.set("with_genres", genreIds.join(","));
        }

        const res = await fetch(
          `/api/movies${params.toString() ? `?${params.toString()}` : ""}`,
          { signal: controller.signal },
        );

        if (!res.ok) {
          throw new Error("Failed to fetch movies");
        }

        const data = (await res.json()) as { results: TmdbMovie[] };
        const movies = Array.isArray(data.results) ? data.results : [];

        if (!movies.length) {
          setRecommendation(undefined);
          return;
        }

        const index = getHourlyIndex(seed, movies.length, now);
        const movie = movies[index];

        if (!movie) {
          setRecommendation(undefined);
          return;
        }

        const title = movie.title ?? movie.name ?? "Untitled";
        const year = movie.release_date
          ? new Date(movie.release_date).getFullYear()
          : undefined;

        const backdropUrl = movie.backdrop_path
          ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
          : "https://images.pexels.com/photos/7991378/pexels-photo-7991378.jpeg?auto=compress&cs=tinysrgb&w=1600";

        const overview = movie.overview?.trim() ?? "";
        const shortOverview =
          overview.length > 180 ? `${overview.slice(0, 177)}...` : overview;

        const ottUrl = `https://www.themoviedb.org/movie/${movie.id}`;

        const builtRecommendation: Recommendation = {
          id: movie.id,
          title,
          year,
          tagline:
            shortOverview ||
            "A trending pick that matches your vibe right now.",
          ottPlatform: "TMDB",
          ottUrl,
          backdropUrl,
          rating: movie.vote_average ?? 0,
        };

        setRecommendation(builtRecommendation);

        if (typeof window !== "undefined") {
          window.localStorage.setItem(
            storageKey,
            JSON.stringify(builtRecommendation),
          );
        }
      } catch (err) {
        if ((err as Error).name === "AbortError") return;
        setError("Could not load movies right now. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    loadRecommendation();

    return () => controller.abort();
  }, [selectedGenres, now]);

  const timeFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat(undefined, {
        hour: "2-digit",
        minute: "2-digit",
      }),
    [],
  );

  const handleToggleGenre = (genre: Genre) => {
    if (genre === "All") {
      setSelectedGenres(["All"]);
      return;
    }

    setSelectedGenres((prev) => {
      const withoutAll = prev.filter((g) => g !== "All");
      if (withoutAll.includes(genre)) {
        const updated = withoutAll.filter((g) => g !== genre);
        return updated.length === 0 ? ["All"] : updated;
      }
      return [...withoutAll, genre];
    });
  };

  return (
    <main className="relative min-h-screen bg-[#141826] text-[#F5F0E8]">
      <Navigation />

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
            className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-[#D4A94C]"
            style={{ fontFamily: "'Instrument Sans', system-ui, sans-serif" }}
          >
            Movie Night Picks
          </p>
          <h1
            className="mb-5 text-5xl font-normal text-[#F5F0E8] md:mb-6 md:text-6xl lg:text-7xl"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Stuck on what to watch?
          </h1>
          <p
            className="mx-auto max-w-[620px] text-base leading-relaxed text-[rgba(200,195,185,0.6)] md:text-lg"
            style={{ fontFamily: "'Instrument Sans', system-ui, sans-serif" }}
          >
            One fresh pick every hour — choose your vibe, then stream. Built
            for nights with Moonzy.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <span className="h-px w-16 bg-[rgba(200,195,185,0.15)]" />
            <span className="h-1.5 w-1.5 rotate-45 border border-[#D4A94C]/40" />
            <span className="h-px w-16 bg-[rgba(200,195,185,0.15)]" />
          </div>
        </div>
      </section>

      <section className="relative mx-auto flex max-w-[1200px] flex-col gap-10 px-6 pb-20 md:flex-row md:items-stretch md:px-10 lg:px-12 md:pb-28">
        {/* Left: Copy + Genres */}
        <div className="flex flex-1 flex-col justify-between gap-10">
          <div className="space-y-4 md:space-y-6">
            <p className="inline-flex items-center gap-2 rounded-full border border-[rgba(200,195,185,0.12)] bg-[#1A1F33]/60 px-4 py-1 text-xs font-medium uppercase tracking-[0.2em] text-[#D4A94C] backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-[#D4A94C] shadow-[0_0_10px_rgba(212,169,76,0.6)]" />
              Movie of the hour
            </p>

            <h2
              className="text-2xl font-normal leading-tight text-[#F5F0E8] md:text-3xl lg:text-4xl"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Let us pick your perfect movie.
            </h2>

            <p
              className="max-w-xl text-sm text-[rgba(200,195,185,0.72)] md:text-base"
              style={{ fontFamily: "'Instrument Sans', system-ui, sans-serif" }}
            >
              Choose your vibe and we&apos;ll serve a fresh, curated movie
              recommendation that automatically refreshes every hour. One click,
              and you&apos;re on the OTT platform ready to stream.
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-[rgba(200,195,185,0.75)] md:text-sm">
              <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(212,169,76,0.25)] bg-[#141826]/80 px-3 py-1">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#D4A94C] opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#D4A94C]" />
                </span>
                Refreshed at the top of every hour
              </div>
              <span className="hidden h-5 w-px bg-[rgba(200,195,185,0.2)] md:block" />
              <span className="flex items-center gap-2 rounded-full border border-[rgba(200,195,185,0.12)] bg-[#1A1F33]/50 px-3 py-1">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#141826] text-[0.7rem]">
                  ⏰
                </span>
                It&apos;s currently{" "}
                {now ? (
                  <span className="font-semibold text-[#D4A94C]">
                    {timeFormatter.format(now)}
                  </span>
                ) : (
                  <span className="inline-flex h-3 w-12 animate-pulse rounded-full bg-white/10" />
                )}
                — this is your movie of the hour.
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-[rgba(200,195,185,0.55)] md:text-[0.7rem]">
                Choose your genres
              </h3>
              <span className="text-[0.7rem] text-[rgba(200,195,185,0.45)]">
                Tap to toggle • mix &amp; match
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {GENRES.map((genre) => {
                const isActive = selectedGenres.includes(genre);
                return (
                  <button
                    key={genre}
                    type="button"
                    onClick={() => handleToggleGenre(genre)}
                    className={[
                      "group relative rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-200 md:text-sm",
                      "border backdrop-blur hover:-translate-y-px",
                      isActive
                        ? "border-[#D4A94C]/70 bg-[#D4A94C]/15 text-[#F5F0E8] shadow-[0_0_20px_rgba(212,169,76,0.2)]"
                        : "border-[rgba(200,195,185,0.12)] bg-[#1A1F33]/40 text-[rgba(245,240,232,0.9)] hover:border-[#D4A94C]/45 hover:bg-[#D4A94C]/10",
                    ].join(" ")}
                  >
                    <span className="relative z-10">{genre}</span>
                    {isActive && (
                      <span className="pointer-events-none absolute inset-0 rounded-full bg-[#D4A94C]/10 blur-sm" />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="mt-2 rounded-[16px] border border-[rgba(200,195,185,0.08)] bg-[#1A1F33]/65 p-3 text-xs text-[rgba(200,195,185,0.85)] ring-1 ring-[rgba(200,195,185,0.06)] backdrop-blur md:text-sm">
              <div className="flex items-center gap-3">
                <div className="relative h-12 w-12 overflow-hidden rounded-xl border border-[rgba(200,195,185,0.12)] bg-[#141826] shadow-md md:h-14 md:w-14">
                  <img
                    src="/about_us.png"
                    alt="Moonzy snacks illustration"
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div>
                  <p className="mb-0.5 font-medium text-[#D4A94C]">
                    Perfect movie. Perfect munchies.
                  </p>
                  <p>
                    Planning to actually watch this? Don&apos;t forget to stock
                    up your snack cart on{" "}
                    <span className="font-semibold text-[#F5F0E8]">Moonzy</span>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Recommendation card */}
        <div className="relative flex flex-1 items-stretch">
          <div className="relative w-full overflow-hidden rounded-[20px] border border-[rgba(200,195,185,0.08)] bg-[#1A1F33]/70 shadow-[0_8px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,169,76,0.12),transparent_55%),radial-gradient(circle_at_bottom,rgba(20,24,38,0.5),transparent_55%)] opacity-90" />

            <div className="relative flex h-full flex-col overflow-hidden">
              <div className="relative h-56 w-full overflow-hidden sm:h-64 md:h-72">
                <div className="absolute inset-0 bg-linear-to-b from-transparent via-[#141826]/30 to-[#141826]/80" />
                {recommendation && (
                  <img
                    src={recommendation.backdropUrl}
                    alt={recommendation.title}
                    className="h-full w-full object-cover object-center transition-transform duration-2500 ease-out hover:scale-105"
                    loading="lazy"
                  />
                )}
                <div className="pointer-events-none absolute inset-x-4 bottom-4 flex items-center justify-between gap-3 text-xs text-[#F5F0E8] md:text-sm">
                  <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(200,195,185,0.15)] bg-black/55 px-3 py-1 backdrop-blur">
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#D4A94C] text-xs font-semibold text-[#141826] shadow">
                      ★
                    </span>
                    <span className="font-semibold">
                      {recommendation
                        ? recommendation.rating.toFixed(1)
                        : "—"}
                    </span>
                    <span className="text-[rgba(200,195,185,0.75)]">/ 10</span>
                  </div>
                  <div className="hidden items-center gap-2 rounded-full border border-[rgba(200,195,185,0.12)] bg-[#141826]/70 px-3 py-1 text-[0.7rem] uppercase tracking-[0.2em] text-[rgba(245,240,232,0.9)] backdrop-blur md:inline-flex">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#D4A94C]" />
                    Auto-refreshed hourly
                  </div>
                </div>
              </div>

              <div className="relative flex flex-1 flex-col justify-between gap-4 p-5 md:p-7">
                <div className="space-y-3 md:space-y-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="inline-flex items-center gap-2 rounded-full border border-[#D4A94C]/35 bg-[#D4A94C]/10 px-3 py-1 text-[0.7rem] font-medium uppercase tracking-[0.2em] text-[#D4A94C]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#D4A94C] shadow-[0_0_10px_rgba(212,169,76,0.5)]" />
                      Curated for you
                    </div>
                    {now ? (
                      <span className="rounded-full border border-[rgba(200,195,185,0.12)] bg-[#141826]/60 px-3 py-1 text-[0.65rem] text-[rgba(200,195,185,0.85)]">
                        New pick in{" "}
                        <span className="font-semibold text-[#D4A94C]">
                          {60 - now.getMinutes()} min
                        </span>
                      </span>
                    ) : (
                      <span className="rounded-full border border-[rgba(200,195,185,0.12)] bg-[#141826]/60 px-3 py-1 text-[0.65rem] text-[rgba(200,195,185,0.85)]">
                        New pick every hour
                      </span>
                    )}
                  </div>

                  {recommendation ? (
                    <>
                      <div className="space-y-1">
                        <h2
                          className="text-xl font-semibold leading-tight text-[#F5F0E8] drop-shadow-sm md:text-2xl"
                          style={{
                            fontFamily: "'Playfair Display', Georgia, serif",
                          }}
                        >
                          {recommendation.title}
                          <span className="ml-2 text-sm font-normal text-[rgba(200,195,185,0.75)] md:text-base">
                            {recommendation.year ? `(${recommendation.year})` : ""}
                          </span>
                        </h2>
                        <p className="text-xs text-[#D4A94C]/90 md:text-sm">
                          {selectedGenres.includes("All") &&
                          selectedGenres.length === 1
                            ? "Trending right now across OTT platforms."
                            : `Perfect if you're in the mood for ${selectedGenres
                                .filter((g) => g !== "All")
                                .join(" • ")}.`}
                        </p>
                      </div>

                      <p className="max-w-md text-xs text-[rgba(200,195,185,0.88)] md:text-[0.9rem]">
                        {recommendation.tagline}
                      </p>
                    </>
                  ) : (
                    <div className="space-y-2">
                      <div className="h-6 w-40 animate-pulse rounded-full bg-white/10" />
                      <div className="h-4 w-64 animate-pulse rounded-full bg-white/10" />
                      <div className="mt-3 flex gap-2">
                        <div className="h-7 w-16 animate-pulse rounded-full bg-white/10" />
                        <div className="h-7 w-20 animate-pulse rounded-full bg-white/10" />
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-4 flex flex-col gap-3 md:mt-6">
                  {error && (
                    <p className="rounded-xl border border-red-400/30 bg-red-500/10 px-3 py-2 text-xs text-red-300 md:text-sm">
                      {error}
                    </p>
                  )}
                  {isLoading && !recommendation && (
                    <p className="text-xs text-[rgba(200,195,185,0.7)] md:text-sm">
                      Fetching a fresh pick for you...
                    </p>
                  )}
                  <a
                    href={recommendation?.ottUrl ?? "#"}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-[#D4A94C] px-4 py-2.5 text-sm font-semibold text-[#141826] shadow-[0_18px_50px_rgba(0,0,0,0.35)] transition-transform duration-150 hover:-translate-y-px hover:bg-[#e4bc69] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A94C]/50 md:px-6 md:py-3 md:text-base"
                  >
                    <span>
                      {recommendation
                        ? "Open movie page & OTT options"
                        : "Loading movie..."}
                    </span>
                    <span className="text-lg leading-none">↗</span>
                  </a>

                  <div className="flex flex-wrap items-center justify-between gap-2 text-[0.7rem] text-[rgba(200,195,185,0.65)] md:text-xs">
                    <p>
                      Don&apos;t like this pick? Change the genres above and
                      we&apos;ll reshuffle your movie of the hour.
                    </p>
                    <span className="rounded-full border border-[rgba(200,195,185,0.12)] bg-[#141826]/50 px-3 py-1 text-[0.65rem] text-[rgba(200,195,185,0.8)]">
                      Works best on latest OTT catalog in your region
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FooterSection />
    </main>
  );
}