import LuxuryDropdown from "../ui/luxury-dropdown";
import { useProductDetailsContext } from "@/contexts/storefront/ProductDetailsContext";

export default function ProductInfoPanel() {
  const {
    product,
    totalPrice,
    selectedDiamond,
    setSelectedDiamond,
    diamondTypeOptions,
    size,
    setSize,
    fingerSizeOptions,
    openSizeGuide,
    handleAddToCart,
    sizeError,
  } = useProductDetailsContext();

  if (!product) {
    return null;
  }

  return (
    <div className="pt-2 lg:pt-4 bg-white p-4 md:p-6 md:pr-6 lg:pr-12 xl:pr-16">
      {/* Rating */}
      <div className="flex items-center gap-3 mb-4 md:mb-6">
        <span className="text-[13px] md:text-[15px] font-semibold text-brand-green">Excellent</span>
        <span className="text-brand-gold text-[14px] md:text-[16px]">★★★★★</span>
        <span className="text-[12px] md:text-[13px] text-black/60">2269 Reviews</span>
      </div>

      {/* Title */}
      <h1 className="text-[16px] md:text-[20px] tracking-[3px] md:tracking-[5px] uppercase font-light leading-[1.6] md:leading-[2] text-[#111] mb-4 md:mb-6">
        {product.title}
      </h1>

      {/* SKU */}
      <p className="text-[11px] md:text-[12px] tracking-[2px] md:tracking-[3px] text-brand-gold/70 mb-4 md:mb-6 uppercase">
        SKU: {product.id.slice(-6)}
      </p>

      {/* Price */}
      <p className="text-[28px] md:text-[34px] font-light text-brand-green mb-4 md:mb-2">
        ${totalPrice.toLocaleString("en-US", { minimumFractionDigits: 2 })} <span className="text-[16px] md:text-[18px] text-black/50">USD</span>
      </p>

      <hr className="mb-6 md:mb-8 border-brand-gold/20" />

      {/* Diamond Type */}
      <div className="mb-6 md:mb-3">
        <LuxuryDropdown
          label="Diamond Type"
          placeholder="Please select"
          options={diamondTypeOptions}
          value={selectedDiamond}
          onChange={setSelectedDiamond}
        />
      </div>

      {/* Size Selector */}
      <div className="border border-brand-gold/20 rounded-xl p-4 md:p-6 mb-6 md:mb-10 bg-white shadow-[0_0_0_1px_rgba(211,160,42,0.05)]">
        <button
          type="button"
          onClick={openSizeGuide}
          className="text-[13px] md:text-[14px] mb-4 md:mb-6 cursor-pointer text-brand-gold hover:text-brand-green transition duration-300 underline underline-offset-4"
        >
          Size Guide
        </button>

        <LuxuryDropdown
          label="Finger Size"
          placeholder="Please select"
          options={fingerSizeOptions}
          value={size}
          onChange={setSize}
          className="mb-6 md:mb-8"
        />
        {sizeError && (
          <p className="text-[13px] font-semibold tracking-[2px] text-red-500 mt-2 h-[20px] flex items-center">
            Please select finger size
          </p>
        )}
      </div>

      {/* Add to Cart */}
      <button
        type="button"
        onClick={handleAddToCart}
        className="w-full h-[52px] md:h-[58px] bg-brand-gold text-brand-green tracking-[3px] md:tracking-[4px] uppercase text-[12px] md:text-[13px] font-semibold rounded-xl hover:bg-brand-gold-soft hover:shadow-[0_8px_24px_rgba(211,160,42,0.30)] transition duration-300"
      >
        Add To Cart • ${totalPrice.toLocaleString("en-US", { minimumFractionDigits: 2 })} USD
      </button>
    </div>
  );
}

