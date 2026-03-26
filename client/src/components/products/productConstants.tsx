import type React from "react";
import { ChevronLeft, Minus } from "lucide-react";

export interface AccordionItemProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

export function AccordionItem({
  title,
  isOpen,
  onToggle,
  children,
}: AccordionItemProps) {
  return (
    <div className="border-b border-[#E5E5E5]">
      <button
        onClick={onToggle}
        className="w-full py-4 flex items-center justify-between text-left"
      >
        <span className="text-[12px] tracking-[1.5px] uppercase text-[#1A1A1A] font-normal font-sans">
          {title}
        </span>
        {isOpen ? (
          <Minus size={14} strokeWidth={2} className="text-[#1A1A1A]" />
        ) : (
          <ChevronLeft size={14} strokeWidth={2} className="text-[#1A1A1A]" />
        )}
      </button>
      {isOpen && <div className="pb-5 pt-2">{children}</div>}
    </div>
  );
}

export const sortOptions = [
  { value: "newest", label: "Date, new to old" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
];
