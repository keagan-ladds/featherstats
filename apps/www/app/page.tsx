import Features from "@/components/sections/Features";
import Hero from "@/components/sections/Hero";
import ComparisonTable from "@/components/sections/Comparison";
import Pricing from "@/components/sections/Pricing";
import Cta from "@/components/sections/Cta";

export default function Home() {
  return (
    <main>
      <Hero />
      <Features />
      <ComparisonTable />
      <Pricing />
      <Cta />
    </main>
  );
}
