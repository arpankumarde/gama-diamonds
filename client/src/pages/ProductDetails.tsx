import { ProductDetailsProvider, useProductDetailsContext } from "@/contexts/storefront/ProductDetailsContext";
import ProductNotFound from "../components/product-details/ProductNotFound";
import ProductMediaGrid from "../components/product-details/ProductMediaGrid";
import ProductInfoPanel from "../components/product-details/ProductInfoPanel";
import CoveredSection from "../components/product-details/CoveredSection";
import CustomerReviewsSection from "../components/product-details/CustomerReviewsSection";
import YouMayAlsoLikeSection from "../components/product-details/YouMayAlsoLikeSection";
import SizeGuideModal from "../components/product-details/SizeGuideModal";
import MediaModal from "../components/product-details/MediaModal";

export default function ProductDetails() {
  return (
    <ProductDetailsProvider>
      <ProductDetailsContent />
    </ProductDetailsProvider>
  );
}

function ProductDetailsContent() {
  const {
    product,
    backLabel,
    handleBack,
  } = useProductDetailsContext();

  if (!product) {
    return <ProductNotFound />;
  }

  return (
    <section className="bg-white min-h-screen px-4 md:px-0 py-8 border-t border-[#dddddd]">
      <div className="mb-6 md:px-10">
        <button
          type="button"
          onClick={handleBack}
          className="text-[12px] text-black hover:text-[#666] transition"
        >
          ← Back to {backLabel}
        </button>
      </div>

      <div className="grid grid-cols-1 items-start lg:grid-cols-[55%_45%] gap-6 lg:gap-10">
        <ProductMediaGrid />
        <ProductInfoPanel />
      </div>

      <CoveredSection />
      <CustomerReviewsSection />
      <YouMayAlsoLikeSection />
      <SizeGuideModalWrapper />
      <MediaModal />
    </section>
  );
}

function SizeGuideModalWrapper() {
  const { isSizeGuideOpen, sizeGuideRows, closeSizeGuide } =
    useProductDetailsContext();

  return (
    <SizeGuideModal
      isOpen={isSizeGuideOpen}
      rows={sizeGuideRows}
      onClose={closeSizeGuide}
    />
  );
}
