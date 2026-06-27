import { Hero } from "@/components/Hero";
import { CategoryShowcase } from "@/components/CategoryShowcase";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { EditorialSection } from "@/components/EditorialSection";
import { TrendsSection } from "@/components/TrendsSection";
import { BrandsSection } from "@/components/BrandsSection";
import { Testimonials } from "@/components/Testimonials";
import { Newsletter } from "@/components/Newsletter";
import { MarqueeHeadline } from "@/components/MarqueeHeadline";
import { LookbookScroll } from "@/components/LookbookScroll";
import { Manifesto } from "@/components/Manifesto";
import { StatsBand } from "@/components/StatsBand";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <MarqueeHeadline text="New Collection" />
      <CategoryShowcase />
      <EditorialSection />
      <LookbookScroll />
      <Manifesto />
      <StatsBand />
      <TrendsSection />
      <MarqueeHeadline text="Vista a sua história" />
      <BrandsSection />
      <Testimonials />
      <Newsletter />
    </>
  );
}
