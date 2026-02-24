import { NextRequest, NextResponse } from "next/server";

const TMDB_API_KEY = process.env.TMDB_API_KEY;

export async function GET(req: NextRequest) {
  if (!TMDB_API_KEY) {
    return NextResponse.json(
      { error: "TMDB_API_KEY is not configured on the server." },
      { status: 500 },
    );
  }

  const { searchParams } = new URL(req.url);
  const withGenres = searchParams.get("with_genres") ?? "";

  const url = new URL("https://api.themoviedb.org/3/discover/movie");
  url.searchParams.set("include_adult", "false");
  url.searchParams.set("include_video", "false");
  url.searchParams.set("language", "en-US");
  url.searchParams.set("sort_by", "popularity.desc");
  url.searchParams.set("page", "1");
  if (withGenres) {
    url.searchParams.set("with_genres", withGenres);
  }
  url.searchParams.set("api_key", TMDB_API_KEY);

  try {
    const res = await fetch(url.toString());

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch movies from TMDB." },
        { status: 502 },
      );
    }

    const data = await res.json();

    return NextResponse.json(
      {
        results: Array.isArray(data.results) ? data.results : [],
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error fetching TMDB movies:", error);
    return NextResponse.json(
      { error: "Unexpected error fetching movies." },
      { status: 500 },
    );
  }
}

