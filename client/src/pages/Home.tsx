import { HomeProvider } from "@/contexts/storefront/HomeContext";
import HeroSection from "../components/home/HeroSection";
import CategorySection from "../components/home/CategorySection";
import StorySection from "../components/home/StorySection";
import CustomerFavoritesSection from "../components/home/CustomerFavoritesSection";
import DiamondTypeSection from "../components/home/DiamondTypeSection";
import ShapeSection from "../components/home/ShapeSection";
import EditorialSection from "../components/home/EditorialSection";
import WeddingRingsSection from "../components/home/WeddingRingsSection";
import BrandCollectionSection from "../components/home/BrandCollectionSection";
import FindUsSection from "../components/home/FindUsSection";
import ConfidenceSection from "../components/home/ConfidenceSection";
import SocialHighlightsSection from "../components/home/SocialHighlightsSection";

export default function Home() {
  return (
    <HomeProvider>
      <HeroSection />
      <CategorySection />
      <StorySection />
      <CustomerFavoritesSection />
      <DiamondTypeSection />
      <ShapeSection />
      <EditorialSection />
      <WeddingRingsSection />
      <BrandCollectionSection />
      <FindUsSection />
      <ConfidenceSection />
      <SocialHighlightsSection />
    </HomeProvider>
  );
}
