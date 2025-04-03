import Features from "@/components/sections/Features";
import Hero from "@/components/sections/Hero";
import ComparisonTable from "@/components/sections/Comparison";
import Cta from "@/components/sections/Cta";

export default function Home() {
  return (
    <main>
      <Hero />
      <Features />
      <ComparisonTable />
      <Cta />
    </main>
  );
}
