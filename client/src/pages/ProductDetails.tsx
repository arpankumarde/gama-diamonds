import { ProductDetailsProvider, useProductDetailsContext } from "@/contexts/storefront/ProductDetailsContext";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
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

  const [descOpen, setDescOpen] = useState(false);

  if (!product) {
    return <ProductNotFound />;
  }

  return (
    <section className="bg-white min-h-screen px-4 md:px-0 py-8 border-t border-brand-gold/10">
      <div className="mb-6 md:px-10">
        <button
          type="button"
          onClick={handleBack}
          className="text-[12px] tracking-[2px] uppercase text-brand-green hover:text-brand-gold transition duration-300"
        >
          ← Back to {backLabel}
        </button>
      </div>

      <div className="grid grid-cols-1 items-start lg:grid-cols-[55%_45%] gap-6 lg:gap-10">
        <ProductMediaGrid />
        <ProductInfoPanel />
      </div>

      {/* Description Accordion */}
      <div className="mx-4 md:mx-10 mt-10 overflow-hidden lg:grid lg:grid-cols-[55%_45%]">
        <div></div>
        <div>
        <button
          type="button"
          onClick={() => setDescOpen(!descOpen)}
          className="w-full flex items-center justify-between px-6 md:px-8 py-5 bg-white hover:bg-brand-green/5 transition duration-300 group"
        >
          <div className="flex items-center gap-3">
            <span className="block w-5 h-[1px] bg-brand-gold"></span>
            <span className="text-[13px] md:text-[14px] tracking-[3px] uppercase font-medium text-brand-green group-hover:text-brand-gold transition duration-300">
              Description
            </span>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-brand-gold transition-transform duration-300 ${
              descOpen ? "rotate-180" : ""
            }`}
            strokeWidth={2}
          />
        </button>

        {descOpen && (
          <div className="px-6 md:px-8 py-6 bg-white">
            <p className="text-[13px] md:text-[15px] leading-7 md:leading-8 text-black/70 font-light">
              {product.description}
            </p>
          </div>
        )}
        </div>
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
