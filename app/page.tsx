import Hero from "./_components/Home/Hero";
import FeaturedProperties from "./_components/Home/FeaturedProperties";
import AboutSection from "./_components/Home/AboutSection";
import Features from "./_components/Home/Features";
import { Suspense } from "react";
import Loading from "@/animations/Loading/page";

export default function Home() {
  return (
    
    <main className="w-full">
    <Suspense fallback={<Loading/>}>
        <Hero/>
        <FeaturedProperties/>
        <AboutSection/>
        <Features/>
    </Suspense>
    </main>
  );
}
