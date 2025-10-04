import Hero from "./_components/Home/Hero";
import FeaturedProperties from "./_components/Home/FeaturedProperties";
import AboutSection from "./_components/Home/AboutSection";
import Features from "./_components/Home/Features";

export default function Home() {
  return (
    <main className="w-full">
      <Hero/>
      <FeaturedProperties/>
      <AboutSection/>
      <Features/>
    </main>
  );
}
