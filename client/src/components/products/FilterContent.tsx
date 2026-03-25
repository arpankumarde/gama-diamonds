import { useProductListingContext } from "@/contexts/storefront/ProductListingContext";
import { AccordionItem } from "./productConstants";

export default function FilterContent() {
  const {
    openAccordions,
    inStockOnly,
    selectedDiamond,
    selectedMetal,
    selectedStyle,
    minPrice,
    maxPrice,
    toggleAccordion,
    setInStockOnly,
    toggleDiamond,
    toggleMetal,
    toggleStyle,
    handleMinPriceChange,
    handleMaxPriceChange,
    clearPriceFilter,
  } = useProductListingContext();

  return (
    <div className="space-y-0">
      <AccordionItem
        title="Availability"
        isOpen={openAccordions.includes("availability")}
        onToggle={() => toggleAccordion("availability")}
      >
        <label className="flex items-center gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
            className="w-4 h-4 accent-[#1A1A1A]"
          />
          <span className="text-[13px] text-[#666666]">In Stock</span>
        </label>
      </AccordionItem>

      <AccordionItem
        title="Diamond Type"
        isOpen={openAccordions.includes("diamondType")}
        onToggle={() => toggleAccordion("diamondType")}
      >
        <div className="space-y-3">
          {[
            { label: "Lab Diamond", value: "Lab Diamond" },
            { label: "Natural Diamond", value: "Natural Diamond" },
          ].map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={selectedDiamond.includes(option.value)}
                onChange={() => toggleDiamond(option.value)}
                className="w-4 h-4 accent-[#1A1A1A]"
              />
              <span className="text-[13px] text-[#666666]">{option.label}</span>
            </label>
          ))}
        </div>
      </AccordionItem>

      <AccordionItem
        title="Metal"
        isOpen={openAccordions.includes("metal")}
        onToggle={() => toggleAccordion("metal")}
      >
        <div className="space-y-3">
          {[
            "9K White Gold",
            "9K Yellow Gold",
            "9K Rose Gold",
            "18K Rose Gold",
            "18K White Gold",
            "18K Yellow Gold",
            "Platinum",
          ].map((metal) => (
            <label key={metal} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedMetal.includes(metal)}
                onChange={() => toggleMetal(metal)}
                className="w-4 h-4 accent-[#1A1A1A]"
              />
              <span className="text-[13px] text-[#666666]">{metal}</span>
            </label>
          ))}
        </div>
      </AccordionItem>

      <AccordionItem
        title="Style"
        isOpen={openAccordions.includes("style")}
        onToggle={() => toggleAccordion("style")}
      >
        <div className="space-y-3">
          {[
            "Round", "Princess", "Solitaire", "Cushion", "Three Stone",
            "Halo", "Emerald", "Oval", "Radiant", "Asscher",
            "Marquise", "Heart", "Pear", "Elongated Cushion",
            "Trillion", "Baguette", "Rose Cut",
          ].map((shape) => (
            <label key={shape} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedStyle.includes(shape)}
                onChange={() => toggleStyle(shape)}
                className="w-4 h-4 accent-[#1A1A1A]"
              />
              <span className="text-[13px] text-[#666666]">{shape}</span>
            </label>
          ))}
        </div>
      </AccordionItem>

      <AccordionItem
        title="Price"
        isOpen={openAccordions.includes("price")}
        onToggle={() => toggleAccordion("price")}
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex-1">
              <input
                type="number"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => handleMinPriceChange(e.target.value)}
                className="w-full px-3 py-2.5 text-[13px] text-black border border-[#D1D1D1] rounded-[4px] focus:border-[#1A1A1A] outline-none"
              />
            </div>
            <span className="text-[#999999]">−</span>
            <div className="flex-1">
              <input
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => handleMaxPriceChange(e.target.value)}
                className="w-full px-3 py-2.5 text-[13px] text-black border border-[#D1D1D1] rounded-[4px] focus:border-[#1A1A1A] outline-none"
              />
            </div>
          </div>
          <div className="flex justify-between">
            <button
              onClick={clearPriceFilter}
              className="text-[12px] text-[#1A1A1A] underline hover:text-[#666666]"
            >
              Clear Price
            </button>
          </div>
        </div>
      </AccordionItem>
    </div>
  );
}
