import Navigation from "./components/Navigation";
import HeroSection from "./components/HeroSection";
import FeaturesSection from "./components/FeaturesSection";
import ProductsSection from "./components/ProductsSection";
import TestimonialSection from "./components/TestimonialSection";
import CreateBoxSection from "./components/CreateBoxSection";
import JournalSection from "./components/JournalSection";
import InstagramGallery from "./components/InstagramGallery";
import FooterSection from "./components/FooterSection";

export default function Home() {
  return (
    <main className="bg-[#141826]">
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <ProductsSection />
      <TestimonialSection />
      <CreateBoxSection />
      <JournalSection />
      <InstagramGallery />
      <FooterSection />
    </main>
  );
}
