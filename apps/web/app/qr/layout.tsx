import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Moonzy Picks – A Fresh Movie Every Hour",
  description:
    "Not sure what to watch tonight? Moonzy's Movie Recommender picks a fresh film for you every hour — curated by genre, ready to stream. Snacks and a movie, sorted.",
};

export default function QRLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
