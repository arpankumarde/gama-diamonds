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
            className="w-4 h-4 accent-brand-green"
          />
          <span className="text-[13px] text-brand-gold/80 group-hover:text-brand-gold transition duration-200">In Stock</span>
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
                className="w-4 h-4 accent-brand-green"
              />
              <span className="text-[13px] text-brand-gold/80 group-hover:text-brand-gold transition duration-200">{option.label}</span>
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
                className="w-4 h-4 accent-brand-green"
              />
              <span className="text-[13px] text-brand-gold/80 group-hover:text-brand-gold transition duration-200">{metal}</span>
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
                className="w-4 h-4 accent-brand-green"
              />
              <span className="text-[13px] text-brand-gold/80 group-hover:text-brand-gold transition duration-200">{shape}</span>
            </label>
          ))}
        </div>
      </AccordionItem>

      <AccordionItem
        title="Price"
        isOpen={openAccordions.includes("price")}
        onToggle={() => toggleAccordion("price")}
      >
        <div className="space-y-3">
          <div className="flex flex-col gap-3">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[12px] text-brand-gold/70 font-medium">$</span>
              <input
                type="number"
                placeholder="Min Price"
                value={minPrice}
                onChange={(e) => handleMinPriceChange(e.target.value)}
                className="w-full pl-7 pr-3 py-2.5 text-[13px] text-[#111] border border-brand-gold/20 rounded-lg focus:border-brand-gold outline-none transition duration-300 placeholder:text-black/30"
              />
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-[1px] bg-brand-gold/20"></div>
              <span className="text-[11px] tracking-[1px] text-black/40 uppercase">to</span>
              <div className="flex-1 h-[1px] bg-brand-gold/20"></div>
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[12px] text-brand-gold/70 font-medium">$</span>
              <input
                type="number"
                placeholder="Max Price"
                value={maxPrice}
                onChange={(e) => handleMaxPriceChange(e.target.value)}
                className="w-full pl-7 pr-3 py-2.5 text-[13px] text-[#111] border border-brand-gold/20 rounded-lg focus:border-brand-gold outline-none transition duration-300 placeholder:text-black/30"
              />
            </div>
          </div>
          <button
            onClick={clearPriceFilter}
            className="w-full text-[11px] tracking-[2px] uppercase text-brand-green border border-brand-gold/20 rounded-lg py-2 hover:bg-brand-green hover:text-white hover:border-brand-green transition duration-300"
          >
            Clear Price
          </button>
        </div>
      </AccordionItem>
    </div>
  );
}
