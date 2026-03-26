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
      <div className="flex items-center gap-3 mb-4 md:mb-6">
        <span className="text-[14px] md:text-[18px] font-semibold text-black">
          Excellent
        </span>
        <span className="text-yellow-500 text-[14px] md:text-[18px]">★★★★★</span>
        <span className="text-[12px] md:text-[14px] text-black">2269 Reviews</span>
      </div>

      <h1 className="text-[16px] md:text-[20px] tracking-[3px] md:tracking-[5px] uppercase font-light leading-[1.6] md:leading-[2] text-black mb-4 md:mb-6">
        {product.title}
      </h1>

      <p className="text-[12px] md:text-[14px] tracking-[2px] md:tracking-[3px] text-black mb-6 md:mb-8">
        SKU: {product.id.slice(-6)}
      </p>

      <p className="text-[28px] md:text-[34px] font-light text-black mb-6 md:mb-2">
        ${totalPrice.toLocaleString("en-US", { minimumFractionDigits: 2 })} USD
      </p>

      <hr className="mb-6 md:mb-8 border-[#dddddd]" />

      <div className="mb-6 md:mb-3">
        <LuxuryDropdown
          label="Diamond Type"
          placeholder="Please select"
          options={diamondTypeOptions}
          value={selectedDiamond}
          onChange={setSelectedDiamond}
        />
      </div>

      <div className="border border-[#dddddd] p-4 md:p-6 mb-6 md:mb-10 bg-white">
        <button
          type="button"
          onClick={openSizeGuide}
          className="underline text-[13px] md:text-[14px] mb-4 md:mb-6 cursor-pointer hover:text-[#666] transition text-black"
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
          <p className="text-[13px] font-semibold tracking-[2px] text-black mt-2 h-[20px] flex items-center">
            Please select finger size
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={handleAddToCart}
        className="w-full h-[52px] md:h-[58px] text-white tracking-[3px] md:tracking-[4px] uppercase text-[12px] md:text-[13px] transition bg-black hover:opacity-90"
      >
        Add To Cart • ${totalPrice.toLocaleString("en-US", { minimumFractionDigits: 2 })} USD
      </button>

    </div>
  );
}

