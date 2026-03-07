import Hero from "../components/Hero";
import AboutUs from "../components/AboutUs";
import ProductRange from "../components/ProductRange";
import MoviePicks from "../components/MoviePicks";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <AboutUs />
      <ProductRange />
      <MoviePicks />
      <Footer />
    </main>
  );
}
