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
            ? "flex items-center gap-2 px-4 py-2.5 bg-[#F7F7F7] border border-[#E5E5E5] rounded-[4px] text-[13px] text-[#1A1A1A] font-medium min-w-[160px] justify-between"
            : "flex items-center gap-2 px-4 py-3 bg-[#F7F7F7] border border-[#E5E5E5] rounded-[4px] text-[13px] text-[#1A1A1A] font-medium min-w-[180px] justify-between hover:bg-[#EEEEEE] transition"
        }
      >
        <span className={mobile ? "truncate" : ""}>
          {sortOptions.find((o) => o.value === sortBy)?.label}
        </span>
        <ChevronDown
          size={14}
          className={mobile ? "text-[#666666] flex-shrink-0" : "text-[#666666]"}
        />
      </button>
      {isOpen && (
        <div
          className={
            mobile
              ? "absolute top-full right-0 mt-1 w-full min-w-[200px] bg-white border border-[#EEEEEE] rounded-[4px] shadow-lg z-50"
              : "absolute top-full right-0 mt-1 w-full min-w-[220px] bg-white border border-[#EEEEEE] rounded-[4px] shadow-lg z-50"
          }
          style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
        >
          {sortOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => selectSortOption(option.value, mobile)}
              className={`w-full text-left ${mobile ? "px-4 py-3 text-[13px]" : "px-5 py-3.5 text-[13px]"} hover:bg-[#F7F7F7] transition ${
                sortBy === option.value
                  ? "font-semibold text-[#1A1A1A]"
                  : "text-[#666666]"
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
