import { ChevronDown } from "lucide-react";
import { sortOptions } from "./productConstants";
import { useProductListingContext } from "@/contexts/storefront/ProductListingContext";

interface SortDropdownProps {
  mobile?: boolean;
}

export default function SortDropdown({
  mobile = false,
}: SortDropdownProps) {
  const {
    sortBy,
    mobileSortOpen,
    desktopSortOpen,
    mobileSortRef,
    desktopSortRef,
    toggleMobileSort,
    toggleDesktopSort,
    selectSortOption,
  } = useProductListingContext();

  const isOpen = mobile ? mobileSortOpen : desktopSortOpen;
  const dropdownRef = mobile ? mobileSortRef : desktopSortRef;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={mobile ? toggleMobileSort : toggleDesktopSort}
        className={
          mobile
            ? "flex items-center gap-1.5 px-2 py-1.5 bg-white border-[1.8px] border-brand-gold rounded-lg text-[10px] tracking-[0.5px] uppercase text-[#111] font-medium min-w-0 w-auto justify-between hover:border-brand-gold transition duration-300 whitespace-nowrap"
            : "flex items-center gap-1.5 px-2 py-1.5 bg-white border-[1.8px] border-brand-gold rounded-lg text-[10px] tracking-[0.5px] uppercase text-[#111] font-medium min-w-0 w-auto justify-between hover:border-brand-gold transition duration-300 whitespace-nowrap"
        }
      >
        <span className={mobile ? "truncate" : ""}>
          {sortOptions.find((o) => o.value === sortBy)?.label}
        </span>
        <ChevronDown size={14} className="text-brand-gold flex-shrink-0" />
      </button>
      {isOpen && (
        <div
          className={
            mobile
              ? "absolute top-full right-0 mt-1 w-full min-w-[200px] bg-white border-2 border-brand-gold/50 rounded-lg shadow-[0_8px_24px_rgba(0,0,0,0.12)] z-50 overflow-hidden"
              : "absolute top-full right-0 mt-1 w-full min-w-[220px] bg-white border-2 border-brand-gold/50 rounded-lg shadow-[0_8px_24px_rgba(0,0,0,0.12)] z-50 overflow-hidden"
          }
        >
          {sortOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => selectSortOption(option.value, mobile)}
              className={`w-full text-left ${mobile ? "px-4 py-3 text-[12px]" : "px-5 py-3.5 text-[12px]"} tracking-[1.5px] uppercase border-b border-brand-gold/10 last:border-0 hover:bg-brand-green/5 transition duration-300 ${
                sortBy === option.value
                  ? "text-brand-gold font-semibold"
                  : "text-[#111]"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
